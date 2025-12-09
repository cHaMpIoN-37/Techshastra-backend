#!/bin/bash
# Bash script to help start PostgreSQL on Windows
# Note: This script provides instructions. Actual start requires PowerShell Admin.

echo "🔍 Checking PostgreSQL services..."
echo ""

# Try to query services (may not work in Git Bash)
if command -v sc &> /dev/null; then
    echo "PostgreSQL services found:"
    sc query | grep -i postgres || echo "No PostgreSQL services found in sc query"
    echo ""
fi

echo "📝 To start PostgreSQL, you need to:"
echo ""
echo "1. Open PowerShell as Administrator:"
echo "   - Right-click Start Menu"
echo "   - Select 'Windows PowerShell (Admin)' or 'Terminal (Admin)'"
echo ""
echo "2. Find your PostgreSQL service:"
echo "   Get-Service postgresql*"
echo ""
echo "3. Start the service:"
echo "   net start postgresql-x64-16"
echo "   (Replace 16 with your version: 14, 15, 16, etc.)"
echo ""
echo "Or use the GUI:"
echo "   - Press Win + R"
echo "   - Type: services.msc"
echo "   - Find 'postgresql-x64-XX'"
echo "   - Right-click → Start"
echo ""
echo "📄 See POSTGRESQL_START.md for detailed instructions"

