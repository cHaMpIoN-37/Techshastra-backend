# Clear Vite and build caches
# Run this when you have port/cache issues

Write-Host "🧹 Clearing Vite cache..." -ForegroundColor Yellow

$viteCache = "shastra-hub/node_modules/.vite"
$distFolder = "shastra-hub/dist"
$buildFolder = "shastra-hub/build"

if (Test-Path $viteCache) {
    Remove-Item -Recurse -Force $viteCache
    Write-Host "✅ Cleared Vite cache" -ForegroundColor Green
} else {
    Write-Host "ℹ️  Vite cache not found (already clean)" -ForegroundColor Cyan
}

if (Test-Path $distFolder) {
    Remove-Item -Recurse -Force $distFolder
    Write-Host "✅ Cleared dist folder" -ForegroundColor Green
}

if (Test-Path $buildFolder) {
    Remove-Item -Recurse -Force $buildFolder
    Write-Host "✅ Cleared build folder" -ForegroundColor Green
}

Write-Host ""
Write-Host "✅ Cache cleared! Now:" -ForegroundColor Green
Write-Host "1. Restart your dev server (npm run dev:all)" -ForegroundColor Cyan
Write-Host "2. Clear browser cache (F12 → Application → Clear storage)" -ForegroundColor Cyan
Write-Host "3. Hard reload (Ctrl+Shift+R)" -ForegroundColor Cyan
