# 🚀 Quick Process Your Documents

Your documents are at: **E:\YORK.A\ME\KEMET AI\code-github\LOIS CAMEROUN**

## ✅ Ready to Process!

### Method 1: Use the Batch File (Easiest)

Just double-click:
```
process-your-pdfs.bat
```

### Method 2: Command Line

```bash
node scripts/process-pdfs.js "E:\YORK.A\ME\KEMET AI\code-github\LOIS CAMEROUN"
```

### Method 3: With npm

```bash
npm run process-pdfs "E:\YORK.A\ME\KEMET AI\code-github\LOIS CAMEROUN"
```

---

## 📋 What It Does

1. Finds all PDFs in your "LOIS CAMEROUN" folder (including subfolders)
2. Extracts text from each PDF
3. Uses AI to chunk by articles/sections
4. Creates `public/mock-legal-docs/chunks.json`
5. Ready for chatbot!

---

## 🎯 After Processing

```bash
npm run dev
```

Then test at: **http://localhost:5173/outils**

---

**That's it!** The script will process all PDFs it finds. 🎉

