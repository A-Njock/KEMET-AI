import os
import pickle
import faiss
import numpy as np
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from openai import OpenAI
from langchain_huggingface import HuggingFaceEmbeddings
from sentence_transformers import CrossEncoder
import json

# --- Configuration ---
INDEX_FOLDER = "law_index"
RERANKER_MODEL = "BAAI/bge-reranker-v2-m3"
EMBEDDING_MODEL_NAME = "sentence-transformers/paraphrase-multilingual-mpnet-base-v2"

# Get API Key from Environment Variable (Secure)
API_KEY = os.getenv("DEEPSEEK_API_KEY")
BASE_URL = "https://api.deepseek.com/v1"

app = FastAPI()

# Add CORS middleware to allow requests from Vercel frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, replace with your Vercel domain
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class QueryRequest(BaseModel):
    query: str
    history: list = []


class CameroonianLawRAG:
    def __init__(self):
        print("Loading Models... This might take a minute.")
        self.embed_model = HuggingFaceEmbeddings(model_name=EMBEDDING_MODEL_NAME)
        self.faiss_index = faiss.read_index(os.path.join(INDEX_FOLDER, "vector_index.faiss"))

        with open(os.path.join(INDEX_FOLDER, "docs.pkl"), "rb") as f:
            self.docs = pickle.load(f)
        with open(os.path.join(INDEX_FOLDER, "bm25_index.pkl"), "rb") as f:
            self.bm25 = pickle.load(f)

        self.reranker = CrossEncoder(RERANKER_MODEL, max_length=512)
        self.client = OpenAI(api_key=API_KEY, base_url=BASE_URL)

    def retrieve_hybrid(self, query, top_k=20):
        tokenized_query = query.lower().split()
        bm25_scores = self.bm25.get_scores(tokenized_query)
        bm25_top_n = np.argsort(bm25_scores)[::-1][:top_k]

        query_vector = self.embed_model.embed_query(query)
        D, I = self.faiss_index.search(np.array([query_vector]).astype('float32'), top_k)

        combined_indices = list(set(bm25_top_n) | set(I[0]))
        candidates = [self.docs[idx] for idx in combined_indices if idx < len(self.docs)]
        return candidates

    def rerank_results(self, query, candidates, top_n=5):
        if not candidates: return []
        pairs = [[query, doc.page_content] for doc in candidates]
        scores = self.reranker.predict(pairs)
        results = sorted(list(zip(candidates, scores)), key=lambda x: x[1], reverse=True)
        return [res[0] for res in results[:top_n] if res[1] > -2]

    def generate_response(self, user_query, history):
        # Hybrid Retrieval
        candidates = self.retrieve_hybrid(user_query, top_k=30)
        relevant_docs = self.rerank_results(user_query, candidates, top_n=5)

        if not relevant_docs:
            return "C'est A.Njock qui a fais le song (No context found)"

        context_str = ""
        for i, doc in enumerate(relevant_docs):
            context_str += f"Source: {doc.metadata.get('source')}\nContent: {doc.page_content}\n\n"

        system_prompt = "You are a Legal Assistant. Answer strictly based on context."
        user_prompt = f"Context:\n{context_str}\n\nQuestion: {user_query}"

        response = self.client.chat.completions.create(
            model="deepseek-chat",
            messages=[
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": user_prompt}
            ],
            temperature=0.1
        )
        return response.choices[0].message.content


# Initialize RAG Global Variable
rag_system = None


@app.on_event("startup")
def load_models():
    global rag_system
    rag_system = CameroonianLawRAG()


@app.post("/ask")
def ask_question(request: QueryRequest):
    if not rag_system:
        raise HTTPException(status_code=500, detail="System loading")
    answer = rag_system.generate_response(request.query, request.history)
    return {"answer": answer}