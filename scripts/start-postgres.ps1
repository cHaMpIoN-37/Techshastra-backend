# PowerShell script to start PostgreSQL
# Run as Administrator: Right-click → "Run with PowerShell"

Write-Host "🔍 Finding PostgreSQL services..." -ForegroundColor Cyan

$services = Get-Service postgresql* -ErrorAction SilentlyContinue

if ($services.Count -eq 0) {
    Write-Host "❌ No PostgreSQL services found!" -ForegroundColor Red
    Write-Host ""
    Write-Host "Please install PostgreSQL first:" -ForegroundColor Yellow
    Write-Host "  Download: https://www.postgresql.org/download/windows/" -ForegroundColor Cyan
    exit 1
}

Write-Host ""
Write-Host "Found PostgreSQL services:" -ForegroundColor Green
$services | Format-Table Name, Status, DisplayName -AutoSize

Write-Host ""
$stoppedServices = $services | Where-Object { $_.Status -ne 'Running' }

if ($stoppedServices.Count -eq 0) {
    Write-Host "✅ All PostgreSQL services are already running!" -ForegroundColor Green
    exit 0
}

Write-Host "Starting stopped services..." -ForegroundColor Cyan
foreach ($service in $stoppedServices) {
    try {
        Start-Service -Name $service.Name
        Write-Host "✅ Started: $($service.Name)" -ForegroundColor Green
    } catch {
        Write-Host "❌ Failed to start: $($service.Name)" -ForegroundColor Red
        Write-Host "   Error: $_" -ForegroundColor Yellow
        Write-Host "   Try running this script as Administrator!" -ForegroundColor Yellow
    }
}

Write-Host ""
Write-Host "✅ Done! PostgreSQL should be running now." -ForegroundColor Green
Write-Host ""
Write-Host "Test connection:" -ForegroundColor Cyan
Write-Host "  psql -U postgres" -ForegroundColor White

