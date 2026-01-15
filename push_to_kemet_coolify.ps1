
# Script to initialize and push to a new GitHub repository
# Usage: ./push_to_kemet_coolify.ps1 <YOUR_GITHUB_REPO_URL>

param (
    [string]$RepoUrl
)

if (-not $RepoUrl) {
    Write-Host "Please provide your GitHub Repository URL."
    Write-Host "Usage: ./push_to_kemet_coolify.ps1 https://github.com/StartUp237/kemet-ai-coolify.git"
    exit 1
}

Write-Host "Initializing Git..."
git init

Write-Host "Adding all files..."
git add .

Write-Host "Committing..."
git commit -m "Initial commit for Coolify deployment"

Write-Host "Renaming branch to main..."
git branch -M main

Write-Host "Adding remote origin..."
git remote remove origin 2>$null
git remote add origin $RepoUrl

Write-Host "Pushing to GitHub..."
git push -u origin main

Write-Host "Done! Now go to your Coolify dashboard and deploy this repo."
