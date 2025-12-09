# 🐘 Starting PostgreSQL 18 on Windows

## ✅ You Have PostgreSQL 18 Installed!

The error "Access is denied" means you need Administrator privileges to start the service.

## 🚀 Quick Start Methods

### Method 1: PowerShell as Administrator (Recommended)

1. **Open PowerShell as Administrator:**
   - Press `Win + X`
   - Select "Windows PowerShell (Admin)" or "Terminal (Admin)"
   - Click "Yes" when prompted

2. **Find your PostgreSQL service:**
   ```powershell
   Get-Service postgresql*
   ```

3. **Start PostgreSQL:**
   ```powershell
   net start postgresql-x64-18
   ```
   
   Or if the service name is different:
   ```powershell
   Start-Service postgresql-x64-18
   ```

### Method 2: Services GUI (Easiest)

1. **Open Services:**
   - Press `Win + R`
   - Type: `services.msc`
   - Press Enter

2. **Find PostgreSQL:**
   - Look for service names like:
     - `postgresql-x64-18`
     - `PostgreSQL 18`
     - `postgresql-x64-18 - PostgreSQL Server 18`

3. **Start the service:**
   - Right-click on the service
   - Click "Start"
   - Wait for status to change to "Running"

### Method 3: Command Prompt as Administrator

1. **Open CMD as Admin:**
   - Press `Win + X`
   - Select "Command Prompt (Admin)" or "Terminal (Admin)"

2. **Start PostgreSQL:**
   ```cmd
   net start postgresql-x64-18
   ```

## 🔍 Finding Your Service Name

If `postgresql-x64-18` doesn't work, find the exact name:

**PowerShell:**
```powershell
Get-Service postgresql* | Format-Table Name, Status, DisplayName
```

**Command Prompt:**
```cmd
sc query | findstr postgres
```

Common service names:
- `postgresql-x64-18`
- `postgresql-x64-18 - PostgreSQL Server 18`
- `PostgreSQL18-x64-18`

## ✅ Verify PostgreSQL is Running

**Test connection:**
```bash
psql -U postgres
```

You'll be prompted for the password you set during installation.

**Or check service status:**
```powershell
Get-Service postgresql* | Select-Object Name, Status
```

## 🔧 Set PostgreSQL to Start Automatically

So you don't have to start it manually every time:

1. Open Services (`Win + R` → `services.msc`)
2. Find your PostgreSQL service
3. Right-click → Properties
4. Set "Startup type" to "Automatic"
5. Click OK

## 🐛 Troubleshooting

### "Access is denied"
**Solution:** Run PowerShell/CMD as Administrator

### "The service name is invalid"
**Solution:** Find the correct service name:
```powershell
Get-Service postgresql*
```

### "Service already running"
**Solution:** It's already started! You're good to go.

### "psql: command not found"
**Solution:** Add PostgreSQL to PATH:
1. Search "Environment Variables" in Windows
2. Edit "Path" under System variables
3. Add: `C:\Program Files\PostgreSQL\18\bin`
4. Restart terminal

Or use full path:
```bash
"C:\Program Files\PostgreSQL\18\bin\psql.exe" -U postgres
```

## 📝 After Starting PostgreSQL

1. **Update `.env` file:**
   Edit `shastra-hub/backend/.env`:
   ```env
   DATABASE_URL="postgresql://postgres:YOUR_PASSWORD@localhost:5432/techshastra?schema=public"
   ```

2. **Run database setup:**
   ```bash
   npm run setup:db
   ```

3. **Start the app:**
   ```bash
   npm run dev:all
   ```

## 🎯 Quick Checklist

- [ ] PostgreSQL 18 installed ✅
- [ ] Service started (using one of the methods above)
- [ ] Can connect with `psql -U postgres`
- [ ] Updated `shastra-hub/backend/.env` with password
- [ ] Ran `npm run setup:db`
- [ ] Started app with `npm run dev:all`

---

**Need help?** The easiest way is to use the Services GUI (Method 2) - no command line needed!

