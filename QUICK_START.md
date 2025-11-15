# Quick Start Guide - Kemet AI

## 🚀 Quick Testing (5 Minutes)

### 1. Install & Run

```bash
# Install dependencies
npm install

# Create .env file (copy this exactly)
echo "VITE_GROQ_API_KEY=your_groq_api_key_here" > .env
echo "VITE_GITHUB_TOKEN=your_github_token_here" >> .env

# Start dev server
npm run dev
```

### 2. Open Browser

Go to: **http://localhost:5173**

### 3. Test Features

- ✅ Homepage loads with connection counter
- ✅ Click cards to navigate
- ✅ Test language toggle (footer)
- ✅ Go to `/outils` and try the chatbot

---

## 📄 Where to Put RAG Documents

### Option A: GitHub Repository (Production)

1. **Create GitHub repo**: `kemet-ai/legal-docs`
2. **Upload PDFs** to the repo root
3. **Create folder**: `embeddings/`
4. **The app loads from**:
   ```
   https://raw.githubusercontent.com/kemet-ai/legal-docs/main/embeddings/chunks.json
   ```

### Option B: Local Testing (Quick)

Create this file structure for local testing:

```
public/
└── mock-legal-docs/
    └── chunks.json
```

**Create `public/mock-legal-docs/chunks.json`**:
```json
[
  "Article 82 - Code Pénal: Le mariage entre personnes de même sexe est interdit au Cameroun. Les sanctions sont définies dans les articles suivants.",
  "Article 83 - Code Pénal: Les infractions liées au mariage sont passibles d'emprisonnement et d'amendes selon les dispositions du présent code.",
  "Article 123 - OHADA: Les successions sont régies par les dispositions du présent code uniforme. Les héritiers ont droit à leur part selon la loi.",
  "Article 90 - Code Pénal: Les exceptions aux règles générales sont prévues dans des dispositions spéciales qui complètent ou modifient les articles précédents."
]
```

Then update the API to use local file during development (see next section).

---

## 🔧 Enable Local Document Testing

I'll update the code to support local testing. Here's what you need:

