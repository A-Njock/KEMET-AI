# Using Your Documents from "LOIS CAMEROUN" Folder

## 🎯 Quick Start

Your documents are located at:
```
E:\YORK.A\ME\KEMET AI\code-github\LOIS CAMEROUN
```

### Option 1: Use the Convenience Script (Windows)

Just double-click or run:
```bash
process-your-pdfs.bat
```

### Option 2: Use Command Line

```bash
npm run process-pdfs "E:\YORK.A\ME\KEMET AI\code-github\LOIS CAMEROUN"
```

### Option 3: Direct Node Command

```bash
node scripts/process-pdfs.js "E:\YORK.A\ME\KEMET AI\code-github\LOIS CAMEROUN"
```

---

## 📋 What Happens

1. ✅ Script reads all PDFs from your "LOIS CAMEROUN" folder
2. ✅ Extracts text from each PDF
3. ✅ Uses AI to intelligently chunk by articles/sections
4. ✅ Saves chunks to `public/mock-legal-docs/chunks.json`
5. ✅ Makes them available to the chatbot

---

## 🚀 After Processing

Start the app:
```bash
npm run dev
```

Then test at: **http://localhost:5173/outils**

---

## 📁 Folder Structure

```
LOIS CAMEROUN/
├── document1.pdf
├── document2.pdf
├── ohada.pdf
├── code-penal.pdf
└── ... (all your PDFs)
```

The script will process ALL PDFs in this folder.

---

## ✅ Checklist

Before running:
- [ ] Documents are in: `E:\YORK.A\ME\KEMET AI\code-github\LOIS CAMEROUN`
- [ ] PDFs have `.pdf` extension
- [ ] PDFs are text-based (not scanned images)
- [ ] `.env` file has Groq API key

After running:
- [ ] See success message
- [ ] `public/mock-legal-docs/chunks.json` created
- [ ] Can test in chatbot

---

## 🐛 Troubleshooting

**"No PDF files found"**
- Check the path is correct
- Verify PDFs have `.pdf` extension
- Make sure folder exists

**"Error reading PDF"**
- PDF might be corrupted or encrypted
- Try opening PDF in a viewer first
- Remove password if encrypted

---

**Ready to process your documents!** 🎉

