# Rebuilds the static preview and republishes it to GitHub Pages.
#
#   powershell -ExecutionPolicy Bypass -File .\deploy-preview.ps1
#
# Live at https://ahmadazeez999.github.io/worldreach-preview/
#
# The basePath must match the repository name. If the repo is renamed, or the
# site moves to a custom domain, change BASE below (use "" for a root domain).

$ErrorActionPreference = "Stop"
# Native tools write progress to stderr; do not treat that as a failure.
$PSNativeCommandUseErrorActionPreference = $false
$BASE = "/worldreach-preview"
$REPO = "https://github.com/AhmadAzeez999/worldreach-preview.git"

Write-Host "Building static preview..." -ForegroundColor Cyan
if (Test-Path out) { Remove-Item -Recurse -Force out }
$env:NEXT_PUBLIC_STATIC_DEMO = "1"
$env:DEMO_BASE_PATH = $BASE
$env:NEXT_PUBLIC_BASE_PATH = $BASE
npm run build
if ($LASTEXITCODE -ne 0) { throw "build failed" }

Write-Host "Publishing to gh-pages..." -ForegroundColor Cyan
Push-Location out
New-Item -ItemType File -Name ".nojekyll" -Force | Out-Null
if (-not (Test-Path .git)) { git init -q }
git checkout -q -B gh-pages
git add -A
git -c user.name="Ahmad Azeez" -c user.email="azeeztriplea10@gmail.com" commit -q -m "Publish static preview build"
if ($LASTEXITCODE -ne 0) { Write-Host "nothing new to commit" -ForegroundColor Yellow }
if ((git remote) -contains "origin") { git remote set-url origin $REPO } else { git remote add origin $REPO }
git push -f origin gh-pages
Pop-Location

Write-Host "Done. Live in about a minute at https://ahmadazeez999.github.io/worldreach-preview/" -ForegroundColor Green
