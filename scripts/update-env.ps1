# Update .env file with correct DATABASE_URL format
# Usage: .\scripts\update-env.ps1

$envPath = Join-Path $PSScriptRoot "..\shastra-hub\backend\.env"

if (-not (Test-Path $envPath)) {
    Write-Host "❌ .env file not found at: $envPath" -ForegroundColor Red
    exit 1
}

Write-Host "📝 Updating .env file..." -ForegroundColor Cyan
Write-Host ""

# Read current content
$content = Get-Content $envPath -Raw

# Prompt for PostgreSQL password
Write-Host "Enter your PostgreSQL password (the one you set during installation):" -ForegroundColor Yellow
$password = Read-Host -AsSecureString
$passwordPlain = [Runtime.InteropServices.Marshal]::PtrToStringAuto(
    [Runtime.InteropServices.Marshal]::SecureStringToBSTR($password)
)

# Create new DATABASE_URL
$newDatabaseUrl = "postgresql://postgres:$passwordPlain@localhost:5432/techshastra?schema=public"

# Replace the DATABASE_URL line
$content = $content -replace 'DATABASE_URL=.*', "DATABASE_URL=`"$newDatabaseUrl`""

# Write back
Set-Content -Path $envPath -Value $content -NoNewline

Write-Host ""
Write-Host "✅ Updated .env file!" -ForegroundColor Green
Write-Host ""
Write-Host "Next steps:" -ForegroundColor Cyan
Write-Host "  1. Run: npm run setup:db" -ForegroundColor White
Write-Host "  2. Run: npm run dev:all" -ForegroundColor White
Write-Host ""

