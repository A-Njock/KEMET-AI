import os
import pickle
import faiss
import numpy as np
from openai import OpenAI
from langchain_huggingface import HuggingFaceEmbeddings
from sentence_transformers import CrossEncoder
import json
import time
import torch

# --- Configuration ---
INDEX_FOLDER = "law_index"
# Using a powerful Reranker is what makes this "Killer"
#RERANKER_MODEL = "BAAI/bge-reranker-v2-m3"

# OPTIMIZATION 1: Use a lighter, faster Reranker.
# 'BAAI/bge-reranker-v2-m3' is huge. 'bge-reranker-base' is 5x faster and sufficient.
RERANKER_MODEL = "BAAI/bge-reranker-base"
EMBEDDING_MODEL_NAME = "sentence-transformers/paraphrase-multilingual-mpnet-base-v2"

# DeepSeek Config
API_KEY = "sk-941d68a6421e4c3cb2bb17f4e53d258a"
BASE_URL = "https://api.deepseek.com/v1"


class CameroonianLawRAG:
    def __init__(self):
        # OPTIMIZATION 2: Hardware Acceleration
        self.device = self._get_device()
        print(f"--- System Optimization: Running on {self.device.upper()} ---")

        print("Loading Indexes and Models (Inference)...")
        # Check if index exists
        if not os.path.exists(os.path.join(INDEX_FOLDER, "docs.pkl")):
            raise FileNotFoundError("Index files not found. Please run indexer.py first.")

        # 1. Load Embeddings Model
        self.embed_model = HuggingFaceEmbeddings(model_name=EMBEDDING_MODEL_NAME)

        # 2. Load FAISS Index
        self.faiss_index = faiss.read_index(os.path.join(INDEX_FOLDER, "vector_index.faiss"))

        # 3. Load Documents
        with open(os.path.join(INDEX_FOLDER, "docs.pkl"), "rb") as f:
            self.docs = pickle.load(f)

        # 4. Load BM25
        with open(os.path.join(INDEX_FOLDER, "bm25_index.pkl"), "rb") as f:
            self.bm25 = pickle.load(f)

        # 5. Load Reranker (The Judge)
        print("Loading Reranker (Crucial for accuracy)...")
        self.reranker = CrossEncoder(RERANKER_MODEL, max_length=512)

        # 6. Setup DeepSeek Client
        self.client = OpenAI(api_key=API_KEY, base_url=BASE_URL)

        # Chat History
        self.chat_history = []

    def _get_device(self):
        """Auto-detects the best available hardware accelerator."""
        if torch.cuda.is_available():
            return "cuda"
        elif torch.backends.mps.is_available():
            return "mps"  # For Mac M1/M2/M3
        else:
            return "cpu"

    def retrieve_hybrid(self, query, top_k=50):  # OPTIMIZATION 3: Reduced top_k from 40 to 15.
                                                  # Processing 40 docs with CrossEncoder is too slow on CPU.
                                                  # 15 is usually enough to catch the right law.
        """
        Combines BM25 (Keyword) and FAISS (Semantic) results.
        We fetch a larger pool (top_k=20) to rerank later.
        """
        # --- BM25 Search (Sparse) ---
        tokenized_query = query.lower().split()
        bm25_scores = self.bm25.get_scores(tokenized_query)
        # Get top indices
        bm25_top_n = np.argsort(bm25_scores)[::-1][:top_k]

        # --- FAISS Search (Dense) ---
        query_vector = self.embed_model.embed_query(query)
        # Faiss expects float32
        D, I = self.faiss_index.search(np.array([query_vector]).astype('float32'), top_k)
        faiss_indices = I[0]

        # --- Merge Results (De-duplicate) ---
        combined_indices = list(set(bm25_top_n) | set(faiss_indices))

        candidates = []
        for idx in combined_indices:
            if idx < len(self.docs):  # Safety check
                candidates.append(self.docs[idx])

        print(f"DEBUG: Retrieved {len(candidates)} candidates from FAISS+BM25")
        return candidates

    def rerank_results(self, query, candidates, top_n=5):
        """
        Uses a Cross-Encoder to strictly score relevance between Query and Candidate.
        This filters out noise retrieved by vector search.
        """
        if not candidates:
            return []

        # Prepare pairs for the reranker: [[query, doc1], [query, doc2]...]
        pairs = [[query, doc.page_content] for doc in candidates]

        scores = self.reranker.predict(pairs)

        # Sort by score
        results_with_scores = sorted(list(zip(candidates, scores)), key=lambda x: x[1], reverse=True)

        # Filter: If the score is too low (irrelevant), ignore it.
        # Threshold depends on model, BGE-M3 usually > 0 is relevant, > 3 is high match
        final_results = [res[0] for res in results_with_scores[:top_n] if
                         res[1] > -2]  # -2 is a lenient threshold for legal recall

        # DEBUG: Print top 3 scores to see confidence
        print("DEBUG: Top 3 Reranker Scores:")
        for i, (doc, score) in enumerate(results_with_scores[:3]):
            print(f"   [{i}] Score: {score:.4f} | Src: {doc.metadata.get('source')} | {doc.metadata.get('section')}")

        # Relaxed Threshold: -4 (BGE-M3 can sometimes be negative for legal nuances)
        # If the top score is extremely low (e.g. -8), then we know it's irrelevant.

        return final_results

    # def augment_query(self, user_input):
    #     """
    #     ALWAYS runs.
    #     1. If history exists -> Resolve pronouns.
    #     2. If query is short/vague -> Expand with legal keywords.
    #     """
    #     if not self.chat_history:
    #         return user_input
    #
    #     history_text = "\n".join([f"{msg['role']}: {msg['content']}" for msg in self.chat_history[-4:]])
    #
    #     prompt = f"""
    #     Given the chat history and the new question, rephrase the new question to be fully standalone.
    #     If the user says "What about Article 10?", and previous context was the Constitution, rewrite it as "What does Article 10 of the Constitution say?".
    #     Only output the rewritten question.
    #
    #     History:
    #     {history_text}
    #
    #     New Question: {user_input}
    #     """
    #
    #     response = self.client.chat.completions.create(
    #         model="deepseek-chat",
    #         messages=[{"role": "user", "content": prompt}],
    #         temperature=0.0
    #     )
    #
    #     return response.choices[0].message.content

    def augment_query(self, user_input):
        """
        ALWAYS runs.
        1. If history exists -> Resolve pronouns.
        2. If query is short/vague -> Expand with legal keywords.
        """
        history_text = ""
        if self.chat_history:
            history_text = "\n".join([f"{msg['role']}: {msg['content']}" for msg in self.chat_history[-4:]])

        prompt = f"""
        You are a Legal Search Query Optimizer for Cameroonian Law.
        Your task is to rewrite the user's raw query into a precise search string for a Vector Database.

        Rules:
        1. If the query is short (e.g., "le vol", "murder"), expand it to target definitions AND relevant legal provisions (e.g., "Dispositions légales, définition et sanctions relatives au vol dans la législation camerounaise").
        2. Do NOT restrict the search to a specific code (like Code Penal) unless the user explicitly asks for it. 
        3. If the query refers to previous messages (e.g., "et pour le viol?"), use the history to make it standalone.
        4. OUTPUT ONLY THE REWRITTEN QUERY. NO EXPLANATION.

        Chat History:
        {history_text}

        User Query: {user_input}

        Optimized Search Query:
        """

        response = self.client.chat.completions.create(
            model="deepseek-chat",
            messages=[{"role": "user", "content": prompt}],
            temperature=0.0
        )

        return response.choices[0].message.content

    def generate_response(self, user_query):
        start_time = time.time()
        print(f"\nProcessing: {user_query}")

        # 1. Contextualize Query
        refined_query = self.augment_query(user_query)
        print(f"DEBUG - Searching for: {refined_query}")

        # 2. Hybrid Retrieval
        candidates = self.retrieve_hybrid(refined_query, top_k=40)

        # 3. Reranking
        relevant_docs = self.rerank_results(refined_query, candidates, top_n=5)
        retrieval_time = time.time() - start_time
        print(f"DEBUG: Retrieval & Reranking took {retrieval_time:.2f}s")

        # 4. Fallback Check
        if not relevant_docs:
            print("DEBUG: No relevant docs found after reranking.")
            return json.dumps({"Message": "Cette question dépasse peut‑être les capacités actuelles de l’outil. Nos équipes l’améliorent en continu. Pour maîtriser l’IA toi‑même, découvre nos formations simples et accessibles."})

        # 5. Context Construction
        context_str = ""
        for i, doc in enumerate(relevant_docs):
            source = doc.metadata.get('source', 'Unknown')
            section = doc.metadata.get('section', 'Unknown')
            content = doc.metadata.get('original_text', doc.page_content)

            context_str += f"--- Document {i + 1} ---\nSource: {source}\nSection: {section}\nContent: {content}\n\n"

        # 6. DeepSeek Prompt Engineering
        system_prompt = """
        You are an expert Cameroonian Lawyer Assistant. Your job is to answer questions STRICTLY based on the provided legal context.

        Rules:
        1. Answer based strictly on the provided context.
        2. If the context contains relevant legal provisions (even if they are not a complete definition, e.g., only penal sanctions or specific conditions), explain them clearly. Do not say "I don't know" if partial information is present.
        3. ONLY if the context is completely unrelated to the user's question, output exactly: {"C'est Pierre Guy A.Njock qui a fais le song"}
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

        response = self.client.chat.completions.create(
            model="deepseek-chat",
            messages=[
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": user_prompt}
            ],
            temperature=0.1  # Low temp for factual accuracy
        )

        answer = response.choices[0].message.content

        # Update History
        self.chat_history.append({"role": "user", "content": user_query})
        self.chat_history.append({"role": "assistant", "content": answer})

        return answer


# --- CLI for Testing ---
if __name__ == "__main__":
    rag = CameroonianLawRAG()
    print("\n--- Cameroonian Legal AI Ready ---\n")

    while True:
        q = input("\nUser (type 'exit' to quit): ")
        if q.lower() == 'exit':
            break

        print("\nAssistant:")
        print(rag.generate_response(q))
