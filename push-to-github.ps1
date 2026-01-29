# Run this script from PowerShell in the project folder to push to GitHub.
# If you get "dubious ownership", run the first command once from any terminal.

# 1. Add this folder to Git safe directories (run once if you get ownership error)
git config --global --add safe.directory "E:/College/Coding/MERN/Portfolio 2026"

# 2. Go to project folder
Set-Location $PSScriptRoot

# 3. Add remote (use set-url if origin already exists)
$remoteUrl = "https://github.com/deshmukharjun/arjundeshmukh.git"
$hasOrigin = git remote get-url origin 2>$null
if ($LASTEXITCODE -ne 0) {
  git remote add origin $remoteUrl
} else {
  git remote set-url origin $remoteUrl
}

# 4. Stage all changes
git add -A

# 5. Commit if there are changes
$status = git status --porcelain
if ($status) {
  git commit -m "Portfolio 2026: hero, bento, work section, tech stack, contact"
}

# 6. Push (use -u origin main or master depending on your branch)
$branch = git branch --show-current
if (-not $branch) { $branch = "main"; git checkout -b main }
git push -u origin $branch

Write-Host "Done. If push failed, ensure the GitHub repo exists and you have access."
