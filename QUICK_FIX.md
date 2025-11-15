# ⚡ Quick Fix for PowerShell Error

## The Problem
PowerShell is blocking npm scripts for security reasons.

## Solution 1: Use the Batch File (Easiest) ✅

**Just double-click:** `START_SERVER.bat`

This will start the dev server without any PowerShell issues!

## Solution 2: Fix PowerShell (One-Time)

1. **Double-click:** `FIX_POWERSHELL.bat`
2. This will fix PowerShell permanently
3. Then you can use `npm run dev` normally

## Solution 3: Use Command Prompt

1. Press `Windows Key + R`
2. Type: `cmd`
3. Press Enter
4. Navigate to your project:
   ```bash
   cd "E:\YORK.A\ME\KEMET AI\code-github\KEMET-AI"
   ```
5. Run:
   ```bash
   npm run dev
   ```

## Solution 4: Manual PowerShell Fix

In PowerShell, run:
```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

Type `Y` when prompted, then try `npm run dev` again.

---

**Recommended:** Just use `START_SERVER.bat` - it's the easiest! 🚀

