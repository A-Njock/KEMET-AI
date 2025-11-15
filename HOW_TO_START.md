# 🚀 How to Start the Dev Server - Step by Step

## Step 1: Open PowerShell or Command Prompt

**Option A: From File Explorer**
1. Navigate to your project folder: `E:\YORK.A\ME\KEMET AI\code-github\KEMET-AI`
2. Right-click in the folder
3. Select "Open in Terminal" or "Open PowerShell window here"

**Option B: From Start Menu**
1. Press `Windows Key`
2. Type "PowerShell" or "Command Prompt"
3. Click on it to open

## Step 2: Navigate to Your Project

In the terminal, type:
```bash
cd "E:\YORK.A\ME\KEMET AI\code-github\KEMET-AI"
```

Press Enter.

## Step 3: Verify .env File Exists

Type:
```bash
Get-Content .env
```

You should see:
```
VITE_GROQ_API_KEY=your_groq_api_key_here
```
(With your actual API key)

If you see an error, the .env file is missing. Let me know and I'll help create it.

## Step 4: Start the Dev Server

Type:
```bash
npm run dev
```

Press Enter.

## Step 5: Wait for Server to Start

You should see something like:
```
  VITE v5.0.8  ready in 500 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
```

**Keep this terminal window open!** Don't close it.

## Step 6: Open Your Browser

1. Open your web browser (Chrome, Firefox, Edge, etc.)
2. Go to: **http://localhost:5173/outils**
3. You should see the chatbot page

## Step 7: Test the Chatbot

1. Type a question like: "droit de succession" or "a propos du mariage"
2. Click "Poser la question"
3. **Open Browser Console (F12)** to see logs
4. You should see:
   - `✅ Loaded chunks from local file: 5151`
   - `Found X relevant chunks`
   - `✅ Groq response received`

## Troubleshooting

### "npm: command not found"
→ You need to install Node.js first. Download from: https://nodejs.org/

### "Port 5173 already in use"
→ Another server is running. Close it or use a different port.

### Server won't start
→ Make sure you're in the correct folder and have run `npm install` first.

### Still seeing fallback message?
→ Check browser console (F12) for errors. Share the error message with me.

---

**Need help?** Share what you see in the terminal or browser console!

