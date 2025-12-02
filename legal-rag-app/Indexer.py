#python indexer.py

import os
import re
import fitz  # PyMuPDF
import pickle
import faiss
import numpy as np
from tqdm import tqdm
from langchain_openai import OpenAIEmbeddings # CHANGED
from rank_bm25 import BM25Okapi
from langchain_core.documents import Document

# --- Configuration ---
# Make sure you set your OPENAI_API_KEY in your terminal before running
# export OPENAI_API_KEY="sk-..." (Mac/Linux) or set OPENAI_API_KEY="sk-..." (Win)

LAW_FOLDER = "LOIS CAMEROUN"
INDEX_FOLDER = "law_index"
# OpenAI's cheap, fast, high-quality model
EMBEDDING_MODEL_NAME = "text-embedding-3-small"

# Ensure output directory exists
os.makedirs(INDEX_FOLDER, exist_ok=True)


class LegalDocProcessor:
    def __init__(self):
        print(f"Loading Embedding Model: {EMBEDDING_MODEL_NAME}...")
        self.embeddings = OpenAIEmbeddings(model=EMBEDDING_MODEL_NAME)

    def extract_text_from_pdf(self, pdf_path):
        """Extracts text from PDF with basic cleaning."""
        try:
            doc = fitz.open(pdf_path)
            text = ""
            for page in doc:
                text += page.get_text() + "\n"
            return text
        except Exception as e:
            print(f"Error reading {pdf_path}: {e}")
            return ""

    def smart_legal_chunking(self, text, filename):
        """
        Splits text based on Legal Article structure.
        CRITICAL CHANGE: Prepends filename to content for context retention.
        """
        # Improved Regex:
        # - (?i) Case insensitive
        # - (?:Article|Art\.?) Matches "Article" or "Art."
        # - \s* Matches spaces
        # - (\d+(?:er)?|premier|un) Matches "1", "1er", "premier", "un"
        pattern = r"(?i)\n\s*(?:Article|Art\.?)\s*(\d+(?:er)?|premier|un|[IVX]+)\b"

        # We use re.split to keep the delimiters (the article numbers)
        splits = re.split(pattern, text)

        chunks = []

        # Handle the Preamble (Text before the first Article)
        if len(splits) > 0 and splits[0].strip():
            preamble_text = splits[0].strip()
            # Context Injection
            enriched_content = f"Source Document: {filename}\nSection: Preamble/Context\nContent: {preamble_text}"

            chunks.append(Document(
                page_content=enriched_content,
                metadata={"source": filename, "section": "Preamble", "original_text": preamble_text}
            ))

        # Iterate through pairs: (Article Number, Article Content)
        # re.split with groups returns: [Pre-text, Group1(Num), Post-text, Group2(Num), Post-text...]
        for i in range(1, len(splits), 2):
            if i + 1 < len(splits):
                article_num = splits[i].strip()
                content = splits[i + 1].strip()

                article_ref = f"Article {article_num}"

                # --- CRITICAL FIX: CONTEXT INJECTION ---
                # We bake the filename into the text so embeddings "see" it.
                enriched_content = f"Source Document: {filename}\nSection: {article_ref}\nContent: {content}"

                chunks.append(Document(
                    page_content=enriched_content,
                    metadata={
                        "source": filename,
                        "section": article_ref,
                        "original_text": content  # Keep pure text for display
                    }
                ))

        return chunks

    def create_index(self):
        all_docs = []

        if not os.path.exists(LAW_FOLDER):
            print(f"Error: Folder '{LAW_FOLDER}' not found. Please create it and add PDFs.")
            return

        print(f"Scanning '{LAW_FOLDER}' for PDFs...")
        files = [f for f in os.listdir(LAW_FOLDER) if f.lower().endswith('.pdf')]

        if not files:
            print("No PDF files found in 'Law' folder.")
            return

        print(f"Processing {len(files)} files...")

        for file in tqdm(files):
            path = os.path.join(LAW_FOLDER, file)
            raw_text = self.extract_text_from_pdf(path)
            # Strip extension in-place
            file, _ = os.path.splitext(file)

            if not raw_text:
                continue

            # Apply Smart Chunking
            chunks = self.smart_legal_chunking(raw_text, file)
            all_docs.extend(chunks)

        if not all_docs:
            print("No text extracted. Check your PDFs.")
            return

        print(f"Total chunks created: {len(all_docs)}")

        # 1. Create Dense Index (FAISS)
        print("Generating Embeddings (this may take time)...")
        texts = [d.page_content for d in all_docs]

        # Batching to avoid API timeouts
        embeddings_vectors = []
        batch_size = 100
        for i in range(0, len(texts), batch_size):
            batch = texts[i:i + batch_size]
            batch_embeddings = self.embeddings.embed_documents(batch)
            embeddings_vectors.extend(batch_embeddings)

        embedding_dim = len(embeddings_vectors[0])  # 1536 for text-embedding-3-small
        index = faiss.IndexFlatL2(embedding_dim)
        index.add(np.array(embeddings_vectors).astype('float32'))

        # 2. Create Sparse Index (BM25)
        # Tokenize the *enriched* content
        tokenized_corpus = [doc.page_content.lower().split() for doc in all_docs]
        bm25 = BM25Okapi(tokenized_corpus)

        # Save everything
        print("Saving indexes...")
        faiss.write_index(index, os.path.join(INDEX_FOLDER, "vector_index.faiss"))

        with open(os.path.join(INDEX_FOLDER, "docs.pkl"), "wb") as f:
            pickle.dump(all_docs, f)

        with open(os.path.join(INDEX_FOLDER, "bm25_index.pkl"), "wb") as f:
            pickle.dump(bm25, f)

        print("Indexing Complete!Run inference.py now.")

    #-------------------------------------------------------------------

    def demo_search(self, query, top_k=5):
        """Quick sanity check: search the fresh index and print top chunks."""
        # Load what we just saved
        faiss_path = os.path.join(INDEX_FOLDER, "vector_index.faiss")
        docs_path = os.path.join(INDEX_FOLDER, "docs.pkl")

        index = faiss.read_index(faiss_path)
        with open(docs_path, "rb") as f:
            all_docs = pickle.load(f)

        # 1) Dense search
        q_emb = self.embeddings.embed_query(query)
        q_emb = np.array([q_emb]).astype("float32")
        D, I = index.search(q_emb, top_k)  # distances, indices

        print("\n=== DENSE (FAISS) TOP RESULTS ===")
        for rank, (idx, dist) in enumerate(zip(I[0], D[0]), start=1):
            doc = all_docs[idx]
            print(f"\n#{rank} | dist={dist:.4f} | source={doc.metadata.get('source')}"
                  f" | section={doc.metadata.get('section')}")
            print(doc.page_content[:400].replace("\n", " ") + "...")

    def demo_search_bm25(self, query, top_k=5):
        """Quick BM25 check on the same docs."""
        docs_path = os.path.join(INDEX_FOLDER, "docs.pkl")
        bm25_path = os.path.join(INDEX_FOLDER, "bm25_index.pkl")

        with open(docs_path, "rb") as f:
            all_docs = pickle.load(f)
        with open(bm25_path, "rb") as f:
            bm25 = pickle.load(f)

        tokenized_query = query.lower().split()
        scores = bm25.get_scores(tokenized_query)
        top_indices = np.argsort(scores)[::-1][:top_k]

        print("\n=== SPARSE (BM25) TOP RESULTS ===")
        for rank, idx in enumerate(top_indices, start=1):
            doc = all_docs[idx]
            print(f"\n#{rank} | score={scores[idx]:.4f} | source={doc.metadata.get('source')}"
                  f" | section={doc.metadata.get('section')}")
            print(doc.page_content[:400].replace("\n", " ") + "...")


if __name__ == "__main__":
    indexer = LegalDocProcessor()
    indexer.create_index()

    # Simple quality check
    test_query = "procédure de divorce au Cameroun"
    indexer.demo_search(test_query, top_k=5)
    indexer.demo_search_bm25(test_query, top_k=5)

