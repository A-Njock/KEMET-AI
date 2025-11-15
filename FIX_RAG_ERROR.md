# 🔧 Fix RAG Error - Complete Guide

## The Problem

You're getting: "Erreur lors du traitement de votre question"

## Root Causes & Solutions

### 1. **Groq API Key Not Set** ⚠️ MOST LIKELY

**Problem:** The Groq API key is not available in the browser environment.

**Solution:**
1. Create a `.env` file in the root directory:
```bash
VITE_GROQ_API_KEY=your_groq_api_key_here
```
(Replace with your actual Groq API key)

2. **Restart your dev server** after creating `.env`:
```bash
npm run dev
```

3. For production (Vercel), add the environment variable:
   - Go to Vercel Dashboard → Your Project → Settings → Environment Variables
   - Add: `VITE_GROQ_API_KEY` = `your_key_here`

### 2. **Chunks Not Loading**

**Check in Browser Console (F12):**
- Look for: `✅ Loaded chunks from local file: 5151`
- If you see `❌ No chunks found`, the chunks.json file isn't accessible

**Solution:**
- Make sure `public/mock-legal-docs/chunks.json` exists
- The file is 2MB, so loading might take a few seconds
- Check network tab to see if the file is being fetched

### 3. **Groq API Errors**

**Common errors:**
- **401 Unauthorized:** API key is invalid or expired
- **403 Forbidden:** Rate limit or permission issue
- **429 Too Many Requests:** Rate limit exceeded

**Solution:**
- Check your Groq API key is valid
- Wait a few minutes if rate limited
- Check Groq dashboard for usage limits

### 4. **Prompt Too Long**

**Problem:** With 5,151 chunks, the prompt might be too large for Groq.

**Solution:** The code now automatically truncates if needed, but you can:
- Reduce `maxResults` in `findRelevantChunks()` from 5 to 3
- This is already handled in the code

## Debugging Steps

### Step 1: Check Browser Console

Open browser console (F12) and look for:

```
📦 Loading chunks...
✅ Loaded chunks from local file: 5151
📄 Sample chunk: Article 82 - Code Pénal...
Found 5 relevant chunks
🤖 Calling Groq API with prompt length: 12345
🤖 Using API key: gsk_xxx...
✅ Groq response received, length: 456
```

### Step 2: Check for Errors

Look for red error messages:
- `❌ GROQ_API_KEY is not set!` → Create `.env` file
- `❌ Error loading local chunks` → Check file path
- `❌ Error generating response from Groq` → Check API key and rate limits

### Step 3: Test Locally

1. **Start dev server:**
```bash
npm run dev
```

2. **Create `.env` file** with your API key

3. **Open:** http://localhost:5173/outils

4. **Ask:** "a propos du mariage"

5. **Check console** for detailed logs

## Quick Fix Checklist

- [ ] Create `.env` file with `VITE_GROQ_API_KEY`
- [ ] Restart dev server (`npm run dev`)
- [ ] Check browser console for errors
- [ ] Verify `public/mock-legal-docs/chunks.json` exists (2MB file)
- [ ] Check Groq API key is valid
- [ ] Wait if rate limited (429 error)

## Expected Behavior

When working correctly, you should see:

1. **Console logs:**
   - `✅ Loaded chunks from local file: 5151`
   - `Found X relevant chunks`
   - `✅ Groq response received`

2. **Answer contains:**
   - Article numbers (e.g., "Article 82")
   - Legal citations
   - Related articles mentioned

3. **No error messages** in console

## Still Not Working?

1. **Share the browser console output** - This will show exactly what's failing
2. **Check network tab** - See if chunks.json is loading (200 status)
3. **Verify API key** - Test it works with a simple Groq API call
4. **Check file size** - chunks.json should be ~2MB

---

**Most Common Fix:** Create `.env` file and restart dev server! 🚀

