# PDF Processing Guide - Using Your Actual PDFs

## 🚀 Quick Start

### Step 1: Install PDF Processing Library

```bash
npm install
```

This will install `pdf-parse` which is needed to extract text from PDFs.

### Step 2: Place Your PDFs

Create a folder called `legal-docs` in the project root and put your PDFs there:

```
kemet-ai/
├── legal-docs/
│   ├── code-penal.pdf
│   ├── ohada.pdf
│   ├── code-civil.pdf
│   └── [your-other-pdfs].pdf
└── ...
```

### Step 3: Process the PDFs

Run the processing script:

```bash
npm run process-pdfs
```

This will:
1. ✅ Extract text from all PDFs in `legal-docs/`
2. ✅ Use Groq AI to intelligently chunk by articles/sections
3. ✅ Generate `public/mock-legal-docs/chunks.json`
4. ✅ Make chunks available to the chatbot

### Step 4: Test the Chatbot

```bash
npm run dev
```

Go to: **http://localhost:5173/outils**

Ask questions about your documents!

---

## 📋 Detailed Instructions

### Folder Structure

```
kemet-ai/
├── legal-docs/              ← Put your PDFs here
│   ├── document1.pdf
│   ├── document2.pdf
│   └── ...
├── public/
│   └── mock-legal-docs/
│       └── chunks.json      ← Generated automatically
└── scripts/
    └── process-pdfs.js      ← Processing script
```

### Processing Process

1. **Text Extraction**: The script reads each PDF and extracts all text
2. **Intelligent Chunking**: Groq AI analyzes the text and splits it by:
   - Articles (Article 1, Article 2, etc.)
   - Sections (Section I, Section II, etc.)
   - Preserves full context (no splitting within articles)
3. **Chunk Storage**: All chunks are saved as JSON array
4. **Automatic Loading**: The app automatically loads chunks when you use the chatbot

### Example Workflow

```bash
# 1. Place PDFs
mkdir legal-docs
# Copy your PDFs to legal-docs/

# 2. Process them
npm run process-pdfs

# Output:
# 🚀 Starting PDF Processing...
# 📁 Looking for PDFs in: .../legal-docs
# Found 3 PDF file(s):
#    1. code-penal.pdf
#    2. ohada.pdf
#    3. code-civil.pdf
# 
# 📄 Processing: code-penal.pdf
#    ✓ Extracted 125000 characters
#    🤖 Sending to Groq for intelligent chunking...
#    ✓ Generated 245 chunks
# 
# ✅ Success! Chunks saved to: public/mock-legal-docs/chunks.json
# 🎉 Your PDFs are now ready to use in the chatbot!

# 3. Start the app
npm run dev

# 4. Test it
# Go to http://localhost:5173/outils
# Ask: "Qu'est-ce que l'article 82 du Code Pénal?"
```

---

## 🔧 Troubleshooting

### "No PDF files found"

**Problem**: Script can't find your PDFs

**Solution**:
1. Make sure folder is named exactly `legal-docs` (in project root)
2. Check PDFs have `.pdf` extension (case-insensitive)
3. Verify PDFs are not corrupted

### "Error reading PDF"

**Problem**: PDF is corrupted or encrypted

**Solution**:
- Try opening the PDF in a PDF viewer first
- If encrypted, remove password protection
- Try converting to a new PDF

### "Error with Groq"

**Problem**: API key issue or rate limit

**Solution**:
1. Check `.env` file has `VITE_GROQ_API_KEY` set
2. Verify API key is valid
3. Wait a few minutes if rate limited
4. The script will use fallback chunking if Groq fails

### Large PDFs Take Too Long

**Problem**: Very large PDFs (100+ pages) process slowly

**Solution**:
- The script automatically splits large documents
- Be patient, it may take 2-5 minutes per large PDF
- You'll see progress messages

### Chunks Not Appearing in Chatbot

**Problem**: Chatbot shows fallback message

**Solution**:
1. Check `public/mock-legal-docs/chunks.json` exists
2. Verify file is valid JSON (open and check)
3. Check browser console for errors
4. Restart dev server: `npm run dev`

---

## 📊 Understanding the Output

### chunks.json Structure

```json
[
  "Article 1 - Code Pénal: Le présent code régit...",
  "Article 2 - Code Pénal: Les infractions sont...",
  "Article 82 - Code Pénal: Le mariage est...",
  "Section I - OHADA: Dispositions générales...",
  ...
]
```

Each chunk is a complete article or section with:
- Article/Section number
- Full text content
- Context preserved

### Chunk Quality

**Good chunks**:
- ✅ Complete articles (start to finish)
- ✅ Include article numbers
- ✅ Preserve legal context
- ✅ No splitting mid-sentence

**Poor chunks** (if you see these, report issue):
- ❌ Split articles
- ❌ Missing context
- ❌ Too small (< 50 chars)
- ❌ Duplicate content

---

## 🔄 Updating Documents

### Add New PDFs

1. Add new PDF to `legal-docs/` folder
2. Run `npm run process-pdfs` again
3. Script will:
   - Keep existing chunks
   - Add new chunks from new PDFs
   - Remove duplicates

### Replace PDFs

1. Delete old PDF from `legal-docs/`
2. Add new version
3. Delete `public/mock-legal-docs/chunks.json`
4. Run `npm run process-pdfs` to regenerate

### Process Specific PDFs Only

Edit `scripts/process-pdfs.js` to filter specific files, or temporarily move other PDFs out of the folder.

---

## 🎯 Best Practices

### PDF Preparation

1. **Use text-based PDFs** (not scanned images)
   - Scanned PDFs need OCR first
   - Use PDFs with selectable text

2. **Organize by document type**
   - Name files clearly: `code-penal.pdf`, `ohada.pdf`
   - Group related documents

3. **Check PDF quality**
   - Open PDF and verify text is readable
   - Check for encoding issues (special characters)

### Document Size

- **Small PDFs** (< 50 pages): Process quickly
- **Medium PDFs** (50-200 pages): May take 1-2 minutes
- **Large PDFs** (> 200 pages): May take 3-5 minutes, automatically split

### Testing Your Documents

After processing, test with questions like:
- "Qu'est-ce que l'article X?" (replace X with article number)
- "Quelles sont les dispositions sur [topic]?"
- "Expliquez [legal concept]"

---

## 🚀 Production Deployment

### For Production (GitHub)

1. Process PDFs locally: `npm run process-pdfs`
2. Upload `chunks.json` to GitHub repo: `kemet-ai/legal-docs/embeddings/`
3. The app will load from GitHub in production

### For Local Development

The processed chunks are automatically used from `public/mock-legal-docs/chunks.json` when running `npm run dev`.

---

## 📝 Example: Processing OHADA Code

```bash
# 1. Download OHADA PDF (or use your copy)
# 2. Save as: legal-docs/ohada.pdf

# 3. Process
npm run process-pdfs

# 4. Test
npm run dev
# Go to /outils
# Ask: "Qu'est-ce que le droit OHADA?"
# Ask: "Expliquez les successions selon OHADA"
```

---

## ✅ Checklist

Before processing:
- [ ] PDFs are in `legal-docs/` folder
- [ ] PDFs have `.pdf` extension
- [ ] PDFs are text-based (not scanned images)
- [ ] `.env` file has `VITE_GROQ_API_KEY`

After processing:
- [ ] `chunks.json` file created
- [ ] File contains array of text chunks
- [ ] Chunks include article numbers
- [ ] Can test in chatbot at `/outils`

---

**Need Help?** Check the browser console (F12) for error messages!

