# How to Use Your PDFs with Kemet AI

## 🎯 Simple 3-Step Process

### Step 1: Place Your PDFs

Create a folder called `legal-docs` in your project root and copy your PDFs there:

```
kemet-ai/
└── legal-docs/          ← Create this folder
    ├── code-penal.pdf
    ├── ohada.pdf
    └── your-other-docs.pdf
```

### Step 2: Process Them

Run this command:

```bash
npm install
npm run process-pdfs
```

The script will:
- ✅ Read all PDFs from `legal-docs/`
- ✅ Extract text from each PDF
- ✅ Use AI to intelligently split by articles/sections
- ✅ Create `chunks.json` file ready for the chatbot

### Step 3: Test It

```bash
npm run dev
```

Then go to: **http://localhost:5173/outils**

Ask questions about your documents!

---

## 📝 Example

```bash
# 1. Create folder and add PDFs
mkdir legal-docs
# Copy your PDFs here (e.g., code-penal.pdf, ohada.pdf)

# 2. Install dependencies (if not done)
npm install

# 3. Process the PDFs
npm run process-pdfs

# You'll see output like:
# 🚀 Starting PDF Processing...
# Found 2 PDF file(s):
#    1. code-penal.pdf
#    2. ohada.pdf
# 
# 📄 Processing: code-penal.pdf
#    ✓ Extracted 125000 characters
#    🤖 Sending to Groq for intelligent chunking...
#    ✓ Generated 245 chunks
# 
# ✅ Success! Chunks saved to: public/mock-legal-docs/chunks.json

# 4. Start the app
npm run dev

# 5. Test in browser
# Go to http://localhost:5173/outils
# Ask: "Qu'est-ce que l'article 82 du Code Pénal?"
```

---

## 🔍 What Happens Behind the Scenes

1. **PDF Text Extraction**: Reads your PDF and extracts all text
2. **AI Chunking**: Uses Groq AI to intelligently split by articles/sections
3. **Storage**: Saves chunks to `public/mock-legal-docs/chunks.json`
4. **Chatbot Integration**: The chatbot automatically loads and uses these chunks

---

## ⚠️ Important Notes

- **Text-based PDFs only**: Scanned PDFs (images) won't work. You need PDFs with selectable text.
- **Processing time**: Large PDFs (100+ pages) may take 2-5 minutes
- **API Key**: Make sure your `.env` file has the Groq API key
- **File location**: PDFs must be in `legal-docs/` folder in project root

---

## 🐛 Troubleshooting

**"No PDF files found"**
- Make sure folder is named exactly `legal-docs` (in project root)
- Check PDFs have `.pdf` extension

**"Error reading PDF"**
- PDF might be corrupted or encrypted
- Try opening it in a PDF viewer first
- Remove password if encrypted

**Chatbot shows fallback message**
- Check `public/mock-legal-docs/chunks.json` exists
- Restart dev server: `npm run dev`
- Check browser console (F12) for errors

---

## 📚 More Details

See `PDF_PROCESSING_GUIDE.md` for complete documentation.

---

**Ready to test!** 🚀


