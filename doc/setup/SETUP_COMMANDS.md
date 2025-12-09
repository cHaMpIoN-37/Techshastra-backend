# 🚀 Setup Commands - Copy & Paste Ready

## Current Directory
You should be in: `C:\Users\rajea\Documents\techshastra`

---

## Step 1: Frontend Setup

```bash
# Make sure you're in the root directory
cd C:\Users\rajea\Documents\techshastra

# Navigate to frontend
cd shastra-hub

# Copy environment file
cp .env.example .env

# (Frontend is already running, but this ensures .env exists)
```

**Note:** If `cd shastra-hub` fails, you're already in the wrong directory. Use:
```bash
cd C:\Users\rajea\Documents\techshastra\shastra-hub
```

---

## Step 2: Backend Database Setup

### Option A: PostgreSQL Already Installed

**Check if PostgreSQL is installed:**
```bash
# Windows PowerShell
Get-Service postgresql*

# Or check if psql exists
where.exe psql
```

**If PostgreSQL is installed but not running:**
```bash
# Windows (PowerShell as Administrator)
net start postgresql-x64-14
# (Replace 14 with your version number)
```

**Create database:**
```bash
# Connect to PostgreSQL
psql -U postgres

# Then inside psql, run:
CREATE DATABASE techshastra;
\q
```

**Update backend/.env:**
```env
DATABASE_URL="postgresql://postgres:your_password@localhost:5432/techshastra?schema=public"
```

**Run migration:**
```bash
cd C:\Users\rajea\Documents\techshastra\shastra-hub\backend
npm run prisma:migrate
```

### Option B: Install PostgreSQL

**Windows:**
1. Download from: https://www.postgresql.org/download/windows/
2. Run installer
3. Remember the postgres user password you set
4. After installation, use Option A above

**macOS:**
```bash
brew install postgresql@14
brew services start postgresql@14
```

**Linux:**
```bash
sudo apt-get update
sudo apt-get install postgresql postgresql-contrib
sudo systemctl start postgresql
```

### Option C: Use Docker (Easiest)

```bash
# Run PostgreSQL in Docker
docker run --name techshastra-db \
  -e POSTGRES_PASSWORD=mysecretpassword \
  -e POSTGRES_DB=techshastra \
  -p 5432:5432 \
  -d postgres:14

# Update backend/.env
DATABASE_URL="postgresql://postgres:mysecretpassword@localhost:5432/techshastra?schema=public"

# Run migration
cd C:\Users\rajea\Documents\techshastra\shastra-hub\backend
npm run prisma:migrate
```

---

## Step 3: Start Backend

```bash
# Make sure you're in the right directory
cd C:\Users\rajea\Documents\techshastra\shastra-hub\backend

# Start backend (if not already running)
npm run dev
```

---

## Common Errors & Solutions

### Error: "cd: shastra-hub: No such file or directory"
**Solution:** Use full path:
```bash
cd C:\Users\rajea\Documents\techshastra\shastra-hub
```

### Error: "psql: command not found"
**Solutions:**
1. PostgreSQL not installed - Install it (see Option B above)
2. PostgreSQL not in PATH - Add it to PATH or use full path:
   ```bash
   # Windows default location
   "C:\Program Files\PostgreSQL\14\bin\psql.exe" -U postgres
   ```

### Error: "CREATE: command not found"
**Problem:** You're running SQL commands in bash instead of inside psql

**Solution:** SQL commands must be run inside psql:
```bash
# Step 1: Connect to PostgreSQL
psql -U postgres

# Step 2: Now you're inside psql, run SQL:
CREATE DATABASE techshastra;

# Step 3: Exit psql
\q
```

### Error: "Can't reach database server at localhost:5432"
**Solutions:**
1. PostgreSQL not running - Start it:
   ```bash
   # Windows
   net start postgresql-x64-14
   
   # macOS
   brew services start postgresql@14
   
   # Linux
   sudo systemctl start postgresql
   ```

2. Wrong port - Check PostgreSQL port (default is 5432)
3. Firewall blocking - Allow port 5432 in firewall

---

## Quick Verification

**Check if everything is working:**

1. **Frontend running?**
   - Open: http://localhost:8081 (or port shown in terminal)

2. **Backend running?**
   - Check terminal for: "Server running on port 3000"
   - Or visit: http://localhost:3000/health

3. **Database connected?**
   - Backend should show no database errors
   - Run: `cd shastra-hub/backend && npm run prisma:studio`
   - Opens database GUI at http://localhost:5555

---

## Full Path Reference

**Root directory:**
```
C:\Users\rajea\Documents\techshastra
```

**Frontend:**
```
C:\Users\rajea\Documents\techshastra\shastra-hub
```

**Backend:**
```
C:\Users\rajea\Documents\techshastra\shastra-hub\backend
```

---

## Need Help?

- See `DATABASE_SETUP.md` for detailed PostgreSQL setup
- See `FIXES_APPLIED.md` for what was fixed
- Check `START_HERE.md` for complete setup guide

