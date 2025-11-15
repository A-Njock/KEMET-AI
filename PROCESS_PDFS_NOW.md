# 🚀 Process Your PDFs Now - Quick Guide

## Why Process Your PDFs?

The current `chunks.json` only has 6 test chunks. Processing your actual PDFs will:
- ✅ Create real chunks from your legal documents
- ✅ Enable the chatbot to answer questions about YOUR documents
- ✅ Test if the RAG system works properly
- ✅ See actual article citations from your PDFs

## Quick Process

### Step 1: Verify Your PDFs Location

Your PDFs should be in:
```
E:\YORK.A\ME\KEMET AI\code-github\LOIS CAMEROUN
```

### Step 2: Process the PDFs

Run this command:

```bash
node scripts/process-pdfs.js "E:\YORK.A\ME\KEMET AI\code-github\LOIS CAMEROUN"
```

Or use the batch file:
```bash
.\process-your-pdfs.bat
```

### Step 3: What Happens

The script will:
1. Find all PDFs in your folder
2. Extract text from each PDF
3. Use Groq AI to intelligently chunk by articles
4. Save to `public/mock-legal-docs/chunks.json`
5. Show you how many chunks were created

### Step 4: Test the Chatbot

After processing:
1. Start dev server: `npm run dev`
2. Go to `/outils` or `/chatbot`
3. Ask a question like: "Qu'est-ce que le mariage au Cameroun?"
4. Check browser console (F12) to see:
   - How many chunks loaded
   - Which chunks were found
   - The answer generated

### Step 5: Commit and Push

Once it works:
```bash
git add public/mock-legal-docs/chunks.json
git commit -m "Add processed legal document chunks"
git push origin main
```

This makes the chunks available to the deployed app!

---

## Expected Output

When you run the script, you should see:

```
🚀 Starting PDF Processing...

📁 Looking for PDFs in: E:\YORK.A\ME\KEMET AI\code-github\LOIS CAMEROUN

Found 3 PDF file(s):
  1. code-penal.pdf
  2. ohada.pdf
  3. code-civil.pdf

📄 Processing: code-penal.pdf
   ✓ Extracted 125000 characters
   🤖 Sending to Groq for intelligent chunking...
   ✓ Generated 245 chunks

📄 Processing: ohada.pdf
   ✓ Extracted 98000 characters
   🤖 Sending to Groq for intelligent chunking...
   ✓ Generated 189 chunks

✅ Success! Chunks saved to: public/mock-legal-docs/chunks.json
🎉 Your PDFs are now ready to use in the chatbot!
```

---

## Troubleshooting

**"No PDF files found"**
- Check the folder path is correct
- Verify PDFs have `.pdf` extension
- Make sure PDFs are text-based (not scanned images)

**"Error reading PDF"**
- PDF might be corrupted or encrypted
- Try opening PDF in a viewer first
- Remove password if encrypted

**"Error with Groq"**
- Check your API key in `.env` file
- Verify internet connection
- Wait a few minutes if rate limited

---

**Ready?** Run the command and let's see your documents come to life! 🎉

