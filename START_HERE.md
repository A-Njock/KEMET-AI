# 🚀 Start Here - Testing with Your PDFs

## Quick Start (5 minutes)

### 1. Install Dependencies
```bash
npm install
```

### 2. Place Your PDFs
Create a folder and add your PDFs:
```bash
mkdir legal-docs
# Copy your PDF files (code-penal.pdf, ohada.pdf, etc.) into legal-docs/
```

### 3. Process the PDFs
```bash
npm run process-pdfs
```

This will extract text from your PDFs and create intelligent chunks using AI.

### 4. Start the App
```bash
npm run dev
```

### 5. Test the Chatbot
Open: **http://localhost:5173/outils**

Ask questions about your documents!

---

## 📁 Folder Structure

```
kemet-ai/
├── legal-docs/              ← PUT YOUR PDFs HERE
│   ├── code-penal.pdf
│   ├── ohada.pdf
│   └── your-other-pdfs.pdf
├── public/
│   └── mock-legal-docs/
│       └── chunks.json      ← Generated automatically
└── ...
```

---

## ✅ What You Need

- ✅ PDF files (text-based, not scanned images)
- ✅ `.env` file with Groq API key (already set up)
- ✅ Node.js installed

---

## 📖 More Help

- **Quick guide**: See `HOW_TO_USE_YOUR_PDFS.md`
- **Detailed guide**: See `PDF_PROCESSING_GUIDE.md`
- **Testing**: See `TESTING_GUIDE.md`

---

## 🎯 Example Questions to Test

After processing your PDFs, try asking:
- "Qu'est-ce que l'article 82 du Code Pénal?"
- "Expliquez les successions selon OHADA"
- "Quelles sont les dispositions sur le mariage?"

---

**That's it!** Your PDFs will be processed and ready to use in the chatbot. 🎉


