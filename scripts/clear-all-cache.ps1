# Clear all caches - Vite, dist, and browser cache instructions
# Usage: .\scripts\clear-all-cache.ps1

Write-Host "🧹 Clearing all caches..." -ForegroundColor Cyan
Write-Host ""

$viteCache = Join-Path $PSScriptRoot "..\shastra-hub\node_modules\.vite"
$distFolder = Join-Path $PSScriptRoot "..\shastra-hub\dist"
$viteRoot = Join-Path $PSScriptRoot "..\shastra-hub\.vite"

# Clear Vite cache
if (Test-Path $viteCache) {
    Remove-Item -Recurse -Force $viteCache
    Write-Host "✅ Cleared Vite cache (node_modules/.vite)" -ForegroundColor Green
} else {
    Write-Host "ℹ️  Vite cache not found" -ForegroundColor Yellow
}

# Clear dist folder
if (Test-Path $distFolder) {
    Remove-Item -Recurse -Force $distFolder
    Write-Host "✅ Cleared dist folder" -ForegroundColor Green
}

# Clear .vite folder
if (Test-Path $viteRoot) {
    Remove-Item -Recurse -Force $viteRoot
    Write-Host "✅ Cleared .vite folder" -ForegroundColor Green
}

Write-Host ""
Write-Host "✅ All caches cleared!" -ForegroundColor Green
Write-Host ""
Write-Host "Next steps:" -ForegroundColor Cyan
Write-Host "  1. Restart server: npm run dev:all" -ForegroundColor White
Write-Host "  2. In browser: F12 → Application → Clear storage → Clear site data" -ForegroundColor White
Write-Host "  3. Or use Incognito/Private window" -ForegroundColor White
Write-Host "  4. Check console for: 🔍 API URL: http://localhost:3000/api" -ForegroundColor White
Write-Host ""

