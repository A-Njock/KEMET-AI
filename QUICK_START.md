# ⚡ Quick Start - Get Running in 2 Minutes

## One-Time Setup

### Option 1: Use the Script (Windows)
```bash
.\create-env.bat
```

### Option 2: Manual Setup
1. Create a file named `.env` in the root directory
2. Add this line (replace with your actual API key):
```
VITE_GROQ_API_KEY=your_groq_api_key_here
```

## Start the App

```bash
npm run dev
```

## Test It

1. Open: http://localhost:5173/outils
2. Ask: "a propos du mariage"
3. Check browser console (F12) for logs

## What You Should See

✅ Console logs:
- `✅ Loaded chunks from local file: 5151`
- `Found X relevant chunks`
- `✅ Groq response received`

✅ Answer with:
- Article numbers (e.g., "Article 82")
- Legal citations
- Related articles

## Troubleshooting

**"GROQ_API_KEY is required"**
→ Create `.env` file and restart server

**"No chunks found"**
→ Check `public/mock-legal-docs/chunks.json` exists (should be ~2MB)

**"403 Forbidden"**
→ Wait a few minutes (rate limit) or check API key

---

**That's it! Everything else is already set up.** 🚀
