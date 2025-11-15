@echo off
echo ========================================
echo Push Kemet AI to GitHub
echo ========================================
echo.

echo Step 1: Create a GitHub repository first!
echo.
echo Go to: https://github.com/new
echo Create a new repository named: kemet-ai
echo (Don't initialize with README - we already have files)
echo.
pause

echo.
echo Step 2: Enter your GitHub username:
set /p GITHUB_USER="GitHub Username: "

echo.
echo Step 3: Adding remote and pushing...
echo.

git remote add origin https://github.com/%GITHUB_USER%/kemet-ai.git
git branch -M main
git push -u origin main

echo.
echo ========================================
echo Done! Check your repository at:
echo https://github.com/%GITHUB_USER%/kemet-ai
echo ========================================
pause

