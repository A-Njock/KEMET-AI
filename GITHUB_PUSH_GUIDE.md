# How to Push to GitHub - Step by Step

## Step 1: Create a GitHub Repository

1. Go to [github.com](https://github.com) and sign in
2. Click the **"+"** icon in the top right → **"New repository"**
3. Fill in:
   - **Repository name**: `kemet-ai` (or any name you want)
   - **Description**: "AI platform for Cameroon - Corporate solutions, tools, and training"
   - **Visibility**: Choose Public or Private
   - **DO NOT** check "Initialize with README" (we already have files)
4. Click **"Create repository"**

## Step 2: Connect Your Local Repository to GitHub

After creating the repo, GitHub will show you commands. Use these:

### Option A: If you haven't pushed anything yet (recommended)

```bash
git remote add origin https://github.com/YOUR_USERNAME/kemet-ai.git
git branch -M main
git push -u origin main
```

Replace `YOUR_USERNAME` with your GitHub username.

### Option B: If you need to authenticate

If GitHub asks for authentication, you can:

1. **Use Personal Access Token** (recommended):
   - Go to GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)
   - Generate new token with `repo` permissions
   - Use the token as password when pushing

2. **Or use GitHub CLI**:
   ```bash
   gh auth login
   ```

## Step 3: Push Your Code

```bash
git push -u origin main
```

## Complete Command Sequence

Here's everything in order:

```bash
# 1. Make sure you're in the project directory
cd "E:\YORK.A\ME\KEMET AI\code-github\KEMET-AI"

# 2. Check git status
git status

# 3. Add remote (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/kemet-ai.git

# 4. Rename branch to main (if needed)
git branch -M main

# 5. Push to GitHub
git push -u origin main
```

## Troubleshooting

### "remote origin already exists"
```bash
git remote remove origin
git remote add origin https://github.com/YOUR_USERNAME/kemet-ai.git
```

### "Authentication failed"
- Use Personal Access Token instead of password
- Or set up SSH keys

### "Permission denied"
- Make sure you're logged into GitHub
- Check repository name matches
- Verify you have write access to the repo

## After Pushing

Your code will be live at:
```
https://github.com/YOUR_USERNAME/kemet-ai
```

You can then:
- View your code online
- Share the repository
- Set up GitHub Pages (if you want)
- Connect to Vercel for deployment

---

**Need help?** Let me know your GitHub username and I can give you the exact commands!


