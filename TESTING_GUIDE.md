# Testing Guide - Kemet AI

## 🧪 How to Test the Application

### Step 1: Install Dependencies

```bash
npm install
```

### Step 2: Set Up Environment Variables

Create a `.env` file in the root directory:

```env
VITE_GROQ_API_KEY=your_groq_api_key_here
VITE_GITHUB_TOKEN=your_github_token_here
```

### Step 3: Start Development Server

```bash
npm run dev
```

The app will be available at: **http://localhost:5173**

### Step 4: Test Each Feature

#### ✅ Homepage Testing
1. Open http://localhost:5173
2. Verify hero section displays correctly
3. Check that connection counter appears (top-right)
4. Click on each of the three main cards:
   - Solutions → Should navigate to `/solutions`
   - Outils → Should navigate to `/outils`
   - Formations → Should navigate to `/formations`
5. Test language toggle in footer (French ↔ English)
6. Verify gallery images load
7. Check mobile responsiveness (resize browser)

#### ✅ Solutions Page Testing
1. Navigate to `/solutions`
2. Fill out the contact form:
   - Name: "Test User"
   - Company: "Test Company"
   - Email: "test@example.com"
   - Message: "Test message"
3. Submit form → Should show success message
4. Verify testimonial displays

#### ✅ Outils (Chatbot) Page Testing
1. Navigate to `/outils`
2. Enter a legal question (e.g., "Qu'est-ce que le droit de succession?")
3. Click "Poser la question"
4. Wait for response (may take a few seconds)
5. Verify response includes:
   - Answer text
   - Source citations (if available)
6. Click "Utiliser le Chatbot" → Should navigate to `/chatbot`

#### ✅ Chatbot Full-Screen Testing
1. Navigate to `/chatbot`
2. Enter multiple questions
3. Verify chat history displays
4. Check that responses appear correctly
5. Test scrolling in chat area

#### ✅ Formations Page Testing
1. Navigate to `/formations`
2. Verify training events load (from GitHub or fallback)
3. Check that upcoming events show "Inscrivez-vous" button
4. Verify completed events are grayed out

#### ✅ Secondary Pages Testing
1. Navigate to `/immobilier` → Should show "Coming soon"
2. Navigate to `/achat-vente` → Should show "Coming soon"

#### ✅ Bilingual Testing
1. Click language toggle in footer
2. Verify all text changes to English
3. Click again → Should return to French
4. Test on multiple pages

#### ✅ Connection Counter Testing
1. Open homepage
2. Verify counter appears in top-right
3. Check that number updates (every 3 seconds)
4. Open in multiple browser tabs → Each should increment count
5. Verify animations work (pulse, bounce)

## 📄 Where to Put Documents for RAG

### Option 1: GitHub Repository (Recommended)

The RAG system is designed to load documents from a GitHub repository:

**Repository**: `kemet-ai/legal-docs`

**Structure**:
```
legal-docs/
├── embeddings/
│   └── chunks.json          # Generated chunks (auto-created)
├── penal-code.pdf           # Your legal PDFs here
├── ohada-code.pdf
├── civil-code.pdf
└── [other-legal-docs].pdf
```

**Steps**:
1. Create GitHub repository: `kemet-ai/legal-docs`
2. Upload your legal PDFs to the root of the repository
3. The GitHub Actions workflow will automatically:
   - Detect new PDFs
   - Chunk them using Groq
   - Generate `chunks.json` in `embeddings/` folder

**Access URL**: The app loads chunks from:
```
https://raw.githubusercontent.com/kemet-ai/legal-docs/main/embeddings/chunks.json
```

### Option 2: Local Testing (Development)

For local testing, you can create a mock chunks file:

1. Create folder structure:
```bash
mkdir -p public/mock-legal-docs
```

2. Create a test `chunks.json` file:
```json
[
  "Article 82 - Code Pénal: Le mariage entre personnes de même sexe est interdit au Cameroun.",
  "Article 83 - Code Pénal: Les sanctions pour violation des lois sur le mariage sont définies dans les articles suivants.",
  "Article 90 - Code Pénal: Les exceptions aux règles de mariage sont régies par des dispositions spéciales."
]
```

3. Modify `src/lib/api.ts` to load from local file during development:
```typescript
// In loadChunksFromGitHub function, add:
if (import.meta.env.DEV) {
  try {
    const res = await fetch('/mock-legal-docs/chunks.json');
    if (res.ok) return await res.json();
  } catch {}
}
```

### Option 3: Direct PDF Processing (Advanced)

To process PDFs directly in the app:

1. Install PDF parser:
```bash
npm install pdf-parse
```

2. Create a processing script in `src/lib/pdf-processor.ts`:
```typescript
import pdf from 'pdf-parse';

export async function processPDF(file: File): Promise<string[]> {
  const arrayBuffer = await file.arrayBuffer();
  const data = await pdf(Buffer.from(arrayBuffer));
  const text = data.text;
  
  // Use RAG chunking
  const { chunkDocument } = await import('./rag');
  return await chunkDocument(text);
}
```

3. Add upload interface in Outils page for local PDFs

## 🔧 Setting Up Legal Documents

### Quick Setup for Testing

1. **Create GitHub Repository**:
   - Go to GitHub
   - Create new repo: `kemet-ai/legal-docs`
   - Make it public (or use GitHub token for private)

2. **Upload Documents**:
   - Upload your legal PDFs (OHADA, Penal Code, etc.)
   - Commit and push

3. **Set Up GitHub Actions**:
   - Go to repository Settings → Secrets
   - Add secret: `GROQ_API_KEY` = `your_groq_api_key_here`
   - Copy `.github/workflows/update-rag.yaml` to the `legal-docs` repository
   - Push a PDF → Workflow will auto-run and create `chunks.json`

4. **Verify Chunks Created**:
   - Check `legal-docs/embeddings/chunks.json` exists
   - Should contain array of text chunks

5. **Test in App**:
   - Run `npm run dev`
   - Go to `/outils`
   - Ask a question related to your documents
   - Should get response with citations

### Manual Chunk Creation (For Testing)

If you want to create chunks manually for testing:

1. Create `legal-docs/embeddings/chunks.json`:
```json
[
  "Article 1 - Code Pénal: Les infractions sont classées en crimes, délits et contraventions.",
  "Article 82 - Code Pénal: Le mariage est l'union légale entre un homme et une femme.",
  "Article 123 - OHADA: Les successions sont régies par les dispositions du présent code."
]
```

2. Commit and push to GitHub

3. The app will automatically load these chunks

## 🧪 Testing the RAG System

### Test Queries

Try these questions to test the chatbot:

1. **General Question**:
   - "Qu'est-ce que le droit de succession au Cameroun?"
   - Should reference OHADA articles if available

2. **Specific Article**:
   - "Quel est l'article 82 du Code Pénal?"
   - Should return exact article text

3. **Question Without Answer**:
   - "Quelle est la loi sur les robots?"
   - Should show fallback message

4. **French Legal Terms**:
   - "Qu'est-ce qu'une infraction?"
   - Should explain using legal documents

### Expected Behavior

✅ **When Answer Found**:
- Response includes article/section numbers
- Suggests complementary/contradictory articles
- Shows source citations

❌ **When No Answer Found**:
- Shows fallback message: "Cet outil a été développé par Pierre Guy A. Njock..."
- Includes link to `/formations`

## 🐛 Troubleshooting

### Chatbot Not Working

1. **Check Browser Console**:
   - Open DevTools (F12)
   - Look for errors in Console tab
   - Check Network tab for failed requests

2. **Verify API Key**:
   - Ensure `VITE_GROQ_API_KEY` is set in `.env`
   - Restart dev server after adding

3. **Check Chunks File**:
   - Verify `chunks.json` exists in GitHub
   - Check URL is accessible: `https://raw.githubusercontent.com/kemet-ai/legal-docs/main/embeddings/chunks.json`

4. **Test Groq Connection**:
   - Check Groq API is accessible
   - Verify API key is valid

### Documents Not Loading

1. **GitHub Repository**:
   - Ensure repository is public OR
   - Use GitHub token in API calls
   - Check repository name matches: `kemet-ai/legal-docs`

2. **File Path**:
   - Verify `embeddings/chunks.json` path is correct
   - Check file is committed to `main` branch

3. **CORS Issues**:
   - GitHub raw content should work
   - If issues, use GitHub API with token

## 📝 Example Test Document

For quick testing, create a simple test document:

**File**: `legal-docs/test-law.txt` (convert to PDF or use as text)

```
Article 1 - Test Law
This is a test article about artificial intelligence in Cameroon.

Article 2 - Test Law
This article complements Article 1 and provides additional information.

Article 3 - Test Law
This article contradicts some provisions in Article 1.
```

Convert to chunks.json:
```json
[
  "Article 1 - Test Law: This is a test article about artificial intelligence in Cameroon.",
  "Article 2 - Test Law: This article complements Article 1 and provides additional information.",
  "Article 3 - Test Law: This article contradicts some provisions in Article 1."
]
```

## ✅ Checklist

Before testing, ensure:
- [ ] Dependencies installed (`npm install`)
- [ ] `.env` file created with API keys
- [ ] Dev server running (`npm run dev`)
- [ ] GitHub repository `kemet-ai/legal-docs` created
- [ ] Legal documents uploaded (or test chunks.json created)
- [ ] Browser console open for debugging

---

**Happy Testing! 🚀**

