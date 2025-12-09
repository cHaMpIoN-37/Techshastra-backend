# ⚡ Quick Fix Guide

## Issue 1: "cd: shastra-hub: No such file or directory"

**Problem:** You're in the wrong directory

**Fix:**
```bash
# Use full path
cd C:\Users\rajea\Documents\techshastra\shastra-hub

# Or check where you are first
pwd
# Then navigate from there
```

---

## Issue 2: "psql: command not found"

**Problem:** PostgreSQL not installed or not in PATH

**Fix Option 1: Install PostgreSQL**
1. Download: https://www.postgresql.org/download/windows/
2. Install it
3. During installation, remember the postgres password
4. After install, try `psql -U postgres` again

**Fix Option 2: Use Full Path**
```bash
# Windows default location
"C:\Program Files\PostgreSQL\14\bin\psql.exe" -U postgres
```

**Fix Option 3: Use Docker (Easiest)**
```bash
# Install Docker Desktop first, then:
docker run --name techshastra-db \
  -e POSTGRES_PASSWORD=mysecretpassword \
  -e POSTGRES_DB=techshastra \
  -p 5432:5432 \
  -d postgres:14

# Update backend/.env:
DATABASE_URL="postgresql://postgres:mysecretpassword@localhost:5432/techshastra?schema=public"
```

---

## Issue 3: "CREATE: command not found"

**Problem:** You're running SQL commands in bash instead of inside psql

**Fix:** SQL commands must be run INSIDE psql:

```bash
# Step 1: Connect (this opens psql)
psql -U postgres

# Step 2: You'll see prompt change to: postgres=#
# NOW run SQL commands:
CREATE DATABASE techshastra;

# Step 3: Exit psql
\q
```

**Wrong way:**
```bash
psql -U postgres
CREATE DATABASE techshastra;  # ❌ This won't work if you're still in bash
```

**Right way:**
```bash
psql -U postgres              # Enter psql
postgres=# CREATE DATABASE techshastra;  # ✅ Now you're in psql
postgres=# \q                 # Exit psql
```

---

## Complete Setup (Copy & Paste)

### 1. Frontend
```bash
cd C:\Users\rajea\Documents\techshastra\shastra-hub
cp .env.example .env
```

### 2. Database (Choose one)

**Option A: If PostgreSQL installed**
```bash
# Start PostgreSQL (PowerShell as Admin)
net start postgresql-x64-14

# Connect and create database
psql -U postgres
# Inside psql:
CREATE DATABASE techshastra;
\q
```

**Option B: Docker (Recommended)**
```bash
docker run --name techshastra-db \
  -e POSTGRES_PASSWORD=mysecretpassword \
  -e POSTGRES_DB=techshastra \
  -p 5432:5432 \
  -d postgres:14
```

### 3. Backend Config
Edit `shastra-hub/backend/.env`:
```env
DATABASE_URL="postgresql://postgres:mysecretpassword@localhost:5432/techshastra?schema=public"
```

### 4. Run Migration
```bash
cd C:\Users\rajea\Documents\techshastra\shastra-hub\backend
npm run prisma:migrate
npm run dev
```

---

## Still Having Issues?

1. Check `SETUP_COMMANDS.md` for detailed commands
2. Check `DATABASE_SETUP.md` for PostgreSQL setup
3. Verify you're in the correct directories using full paths

