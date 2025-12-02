import os
import pickle
import faiss
import numpy as np
import cohere
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from openai import OpenAI
from langchain_openai import OpenAIEmbeddings
import json

# --- Configuration ---
INDEX_FOLDER = "law_index"

# Keys from Environment
DEEPSEEK_API_KEY = os.getenv("DEEPSEEK_API_KEY")
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")
COHERE_API_KEY = os.getenv("COHERE_API_KEY")

app = FastAPI()

# Add CORS middleware to allow requests from Vercel frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "*",  # Allow all origins
        "https://kemet-ai-237.vercel.app",
        "https://kemet.ai",
        "https://kemetai.cm",
        "http://localhost:5173",  # For local development
        "http://localhost:3000",
    ],
    allow_credentials=True,
    allow_methods=["GET", "POST", "OPTIONS"],
    allow_headers=["*"],
    expose_headers=["*"],
)


class QueryRequest(BaseModel):
    query: str
    history: list = []  # Expects [{"role": "user", "content": "..."}, ...]


class CameroonianLawRAG:
    def __init__(self):
        print("Loading Light Indexes...")

        # 1. OpenAI Embeddings (Lightweight, Cloud-based)
        # MUST match the model used in indexer.py
        self.embed_model = OpenAIEmbeddings(model="text-embedding-3-small", api_key=OPENAI_API_KEY)

        # 2. Cohere Client (State-of-the-art Reranking, Cloud-based)
        self.cohere_client = cohere.Client(COHERE_API_KEY)

        # 3. Load Static Data (Fast)
        self.faiss_index = faiss.read_index(os.path.join(INDEX_FOLDER, "vector_index.faiss"))
        with open(os.path.join(INDEX_FOLDER, "docs.pkl"), "rb") as f:
            self.docs = pickle.load(f)
        with open(os.path.join(INDEX_FOLDER, "bm25_index.pkl"), "rb") as f:
            self.bm25 = pickle.load(f)

        # 4. DeepSeek Client (The Lawyer Brain)
        self.client = OpenAI(
            api_key=DEEPSEEK_API_KEY,
            base_url="https://api.deepseek.com"
        )
        print("✅ Cameroonian Law RAG Loaded Successfully!")

    def augment_query(self, user_input, chat_history):
        """
        RESTORED: Your logic to rewrite queries based on history.
        """
        if not DEEPSEEK_API_KEY:
            print("WARNING: DEEPSEEK_API_KEY not set, skipping query augmentation")
            return user_input
            
        history_text = ""
        if chat_history:
            # Take last 4 messages from the history passed by Frontend
            relevant_history = chat_history[-4:]
            history_text = "\n".join([f"{msg['role']}: {msg['content']}" for msg in relevant_history])

        prompt = f"""
        You are a Legal Search Query Optimizer for Cameroonian Law.
        Your task is to rewrite the user's raw query into a precise search string for a Vector Database.

        Rules:
        1. If the query is short (e.g., "le vol", "murder"), expand it to target definitions AND relevant legal provisions.
        2. Do NOT restrict the search to a specific code unless the user explicitly asks. 
        3. If the query refers to previous messages (e.g., "et pour le viol?"), use the history to make it standalone.
        4. OUTPUT ONLY THE REWRITTEN QUERY. NO EXPLANATION.

        Chat History:
        {history_text}

        User Query: {user_input}

        Optimized Search Query:
        """

        try:
            response = self.client.chat.completions.create(
                model="deepseek-chat",
                messages=[{"role": "user", "content": prompt}],
                temperature=0.0
            )
            refined = response.choices[0].message.content.strip()
            print(f"DEBUG: Query augmentation successful: '{refined}'")
            return refined
        except Exception as e:
            print(f"ERROR: Query augmentation failed: {e}")
            print(f"Falling back to original query: '{user_input}'")
            return user_input

    def retrieve_hybrid(self, query, top_k=20):
        try:
            # BM25
            tokenized_query = query.lower().split()
            bm25_scores = self.bm25.get_scores(tokenized_query)
            bm25_top_n = np.argsort(bm25_scores)[::-1][:top_k]
            print(f"DEBUG: BM25 found {len(bm25_top_n)} candidates")

            # FAISS (OpenAI)
            if not OPENAI_API_KEY:
                print("WARNING: OPENAI_API_KEY not set, skipping FAISS search")
                candidates = [self.docs[idx] for idx in bm25_top_n if idx < len(self.docs)]
                return candidates
                
            query_vector = self.embed_model.embed_query(query)
            # Faiss expects float32
            D, I = self.faiss_index.search(np.array([query_vector]).astype('float32'), top_k)
            print(f"DEBUG: FAISS found {len(I[0])} candidates")

            combined_indices = list(set(bm25_top_n) | set(I[0]))
            candidates = [self.docs[idx] for idx in combined_indices if idx < len(self.docs)]
            print(f"DEBUG: Combined {len(candidates)} unique candidates")
            return candidates
        except Exception as e:
            print(f"ERROR in retrieve_hybrid: {e}")
            return []

    def rerank_results(self, query, candidates, top_n=5):
        """
        Uses Cohere API. This is statistically superior to BGE-base locally.
        """
        if not candidates:
            return []

        documents_text = [doc.page_content for doc in candidates]

        try:
            results = self.cohere_client.rerank(
                query=query,
                documents=documents_text,
                top_n=top_n,
                model="rerank-multilingual-v3.0"
            )

            final_results = []
            for hit in results.results:
                doc = candidates[hit.index]
                if hit.relevance_score > 0.01:  # Threshold
                    final_results.append(doc)
            return final_results

        except Exception as e:
            print(f"Cohere Rerank Error: {e}")
            return candidates[:top_n]

    def generate_response(self, user_query, history=[]):
        """Main method - FIXED CLI compatibility"""
        # 1. Augment Query (Using DeepSeek)
        refined_query = self.augment_query(user_query, history)
        print(f"DEBUG: Original: '{user_query}' -> Refined: '{refined_query}'")

        # 2. Retrieval
        candidates = self.retrieve_hybrid(refined_query, top_k=30)
        print(f"DEBUG: Found {len(candidates)} candidates")

        # 3. Reranking
        relevant_docs = self.rerank_results(refined_query, candidates, top_n=5)
        print(f"DEBUG: After reranking, {len(relevant_docs)} relevant docs")

        # 4. Fallback Logic
        if not relevant_docs:
            print("DEBUG: No relevant docs found, returning fallback")
            return "Cette question dépasse peut-être les capacités actuelles de l'outil. Nos équipes l'améliorent en continu. En attendant, essayez une reformulation de la question."

        # 5. Build Context (Full metadata support)
        context_str = ""
        for i, doc in enumerate(relevant_docs):
            source = doc.metadata.get('source', 'Unknown')
            section = doc.metadata.get('section', 'Unknown')
            content = doc.metadata.get('original_text', doc.page_content)
            context_str += f"--- Document {i + 1} ---\nSource: {source}\nSection: {section}\nContent: {content}\n\n"

        # 6. Detailed System Prompt
        system_prompt = """
        You are an expert Cameroonian Lawyer Assistant. Your job is to answer questions STRICTLY based on the provided legal context.

        Rules:
        1. Answer based strictly on the provided context.
        2. If the context contains relevant legal provisions (even if they are not a complete definition, e.g., only penal sanctions or specific conditions), explain them clearly. Do not say "I don't know" if partial information is present.
        3. ONLY if the context is completely unrelated to the user's question, output exactly: "Cette question dépasse peut-être les capacités actuelles de l'outil. Nos équipes l'améliorent en continu. En attendant, essayez une reformulation de la question."
        4. Do not make up laws.
        5. Answer in the language of the user (French/English).
        6. Structure your answer exactly as requested below.

        Output Structure:
        - Direct Answer: A clear, professional explanation.
        - **Exact Article Number:** Article X of [Law Name].
        - **Similar Articles:**
          - **Complementary:** List article numbers and content that support or expand.
          - **Contradictory:** List article numbers that seem to oppose or provide exceptions.

        Format for citing laws:
        "Article [Num]: [Content snippet] (Law | Loi: [Filename])"
        """

        user_prompt = f"""
        Context:
        {context_str}

        Question: {user_query}
        """

        print(f"DEBUG: Context length: {len(context_str)} characters")
        print(f"DEBUG: Context preview: {context_str[:500]}...")
        print(f"DEBUG: Calling DeepSeek API...")
        
        try:
            response = self.client.chat.completions.create(
                model="deepseek-chat",
                messages=[
                    {"role": "system", "content": system_prompt},
                    {"role": "user", "content": user_prompt}
                ],
                temperature=0.1
            )
            answer = response.choices[0].message.content
            print(f"DEBUG: DeepSeek response received, length: {len(answer)} characters")
            print(f"DEBUG: Response preview: {answer[:200]}...")
            return answer
        except Exception as e:
            print(f"ERROR: DeepSeek API call failed: {e}")
            import traceback
            print(traceback.format_exc())
            return "Erreur temporaire du service. Réessayez dans quelques instants."


# --- API Startup ---
rag_system = None


@app.on_event("startup")
def load_models():
    global rag_system
    rag_system = CameroonianLawRAG()


@app.get("/")
def root():
    return {"status": "ok", "message": "Kemet AI RAG Backend is running"}


@app.get("/health")
def health():
    return {
        "status": "healthy", 
        "rag_loaded": rag_system is not None,
        "api_keys_set": {
            "DEEPSEEK": bool(DEEPSEEK_API_KEY),
            "OPENAI": bool(OPENAI_API_KEY),
            "COHERE": bool(COHERE_API_KEY)
        },
        "indexes_loaded": {
            "faiss": rag_system.faiss_index is not None if rag_system else False,
            "docs": len(rag_system.docs) if rag_system else 0,
            "bm25": rag_system.bm25 is not None if rag_system else False
        } if rag_system else {}
    }


@app.post("/ask")
def ask_question(request: QueryRequest):
    if not rag_system:
        raise HTTPException(status_code=500, detail="System loading")

    try:
        # Pass both query AND history to the logic
        print(f"=== NEW REQUEST ===")
        print(f"Query: {request.query}")
        print(f"History length: {len(request.history)}")
        answer = rag_system.generate_response(request.query, request.history)
        print(f"=== RESPONSE GENERATED ===")
        return {"answer": answer}
    except Exception as e:
        print(f"ERROR in /ask endpoint: {e}")
        import traceback
        print(traceback.format_exc())
        raise HTTPException(status_code=500, detail=f"Error processing request: {str(e)}")
