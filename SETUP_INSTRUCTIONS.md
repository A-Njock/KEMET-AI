# 🚀 Setup Instructions - Get Everything Working

## Quick Setup (5 minutes)

### Step 1: Create `.env` file

Create a file named `.env` in the root directory with:

```bash
VITE_GROQ_API_KEY=your_groq_api_key_here
```
(Replace `your_groq_api_key_here` with your actual Groq API key)

**Important:** This file is already in `.gitignore` so it won't be committed to GitHub.

### Step 2: Install Dependencies (if not already done)

```bash
npm install
```

### Step 3: Start Development Server

```bash
npm run dev
```

### Step 4: Test the Chatbot

1. Open: http://localhost:5173/outils
2. Ask: "a propos du mariage"
3. Open browser console (F12) to see logs
4. You should see:
   - `✅ Loaded chunks from local file: 5151`
   - `Found X relevant chunks`
   - `✅ Groq response received`

## What's Already Set Up ✅

- ✅ **5,151 chunks** from your legal documents (Code Pénal, Code Civil, OHADA, etc.)
- ✅ **Error handling** - Detailed logs in console
- ✅ **Chunk loading** - Automatically loads from `public/mock-legal-docs/chunks.json`
- ✅ **RAG system** - Finds relevant chunks and generates answers
- ✅ **ChatGPT-like UI** - Modern chat interface
- ✅ **Memory** - Chatbot remembers conversation context

## Troubleshooting

### "GROQ_API_KEY is required" Error

**Solution:** Create the `.env` file (Step 1) and restart the dev server.

### "No chunks found" Error

**Check:**
- File exists: `public/mock-legal-docs/chunks.json` (should be ~2MB)
- Check browser console for loading errors
- Check network tab to see if file is being fetched

### "403 Forbidden" or "429 Too Many Requests"

**Solution:**
- Wait a few minutes (rate limit)
- Check your Groq API key is valid
- Check Groq dashboard for usage limits

### Chunks Not Loading

**Solution:**
- Make sure `public/mock-legal-docs/chunks.json` exists
- File should be ~2MB with 5,151 chunks
- If missing, run: `npm run process-pdfs "E:\YORK.A\ME\KEMET AI\code-github\LOIS CAMEROUN"`

## Production Deployment (Vercel)

1. Go to Vercel Dashboard → Your Project → Settings → Environment Variables
2. Add: `VITE_GROQ_API_KEY` = `your_groq_api_key_here`
3. Redeploy

## File Structure

```
KEMET-AI/
├── .env                    # ← CREATE THIS FILE (not in git)
├── public/
│   └── mock-legal-docs/
│       └── chunks.json     # ✅ Already exists (5,151 chunks)
├── src/
│   ├── lib/
│   │   ├── api.ts          # Chatbot API
│   │   └── rag.ts          # RAG system
│   └── pages/
│       ├── Outils.tsx      # Demo page
│       └── Chatbot.tsx    # Full chat interface
└── package.json
```

## Next Steps

1. ✅ Create `.env` file
2. ✅ Run `npm run dev`
3. ✅ Test at http://localhost:5173/outils
4. ✅ Check browser console for logs
5. ✅ Ask questions about Cameroon law!

---

**Everything is ready! Just create the `.env` file and start the server.** 🎉

