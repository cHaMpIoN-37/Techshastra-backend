# 🐘 Start PostgreSQL 18 - Quick Guide

## ✅ You Have PostgreSQL 18!

The "Access is denied" error means you need Administrator privileges.

## 🎯 Easiest Method: Services GUI

1. **Press `Win + R`**
2. **Type:** `services.msc`
3. **Press Enter**
4. **Find:** `postgresql-x64-18` or `PostgreSQL 18`
5. **Right-click** → **Start**
6. **Done!** ✅

## 🔧 Command Line Method (Requires Admin)

### Step 1: Open PowerShell as Administrator

- Press `Win + X`
- Select "Windows PowerShell (Admin)" or "Terminal (Admin)"
- Click "Yes" when prompted

### Step 2: Find Service Name

```powershell
Get-Service postgresql*
```

You'll see something like:
```
Name                Status
----                ------
postgresql-x64-18   Stopped
```

### Step 3: Start PostgreSQL

```powershell
net start postgresql-x64-18
```

Or:
```powershell
Start-Service postgresql-x64-18
```

## ✅ Verify It's Running

```bash
psql -U postgres
```

Enter your password when prompted.

## 🚀 After Starting PostgreSQL

1. **Update `.env`:**
   ```bash
   # Edit shastra-hub/backend/.env
   DATABASE_URL="postgresql://postgres:YOUR_PASSWORD@localhost:5432/techshastra?schema=public"
   ```

2. **Setup database:**
   ```bash
   npm run setup:db
   ```

3. **Start app:**
   ```bash
   npm run dev:all
   ```

## 🔄 Set to Start Automatically

So you don't have to start it manually:

1. Open Services (`Win + R` → `services.msc`)
2. Find `postgresql-x64-18`
3. Right-click → Properties
4. Set "Startup type" to **Automatic**
5. Click OK

Now PostgreSQL will start automatically when Windows boots!

---

**The Services GUI method is the easiest - no command line needed!**

