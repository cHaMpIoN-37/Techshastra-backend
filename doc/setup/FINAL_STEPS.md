# 🎯 Final Steps - You're Almost There!

## ✅ Current Status

- ✅ PostgreSQL 18 installed
- ✅ PostgreSQL service **RUNNING** (I can see it in Services!)
- ✅ Startup type: **Automatic**
- ⏳ Need to: Update `.env` file with your password

## 📝 Step 1: Update .env File

Your `.env` file currently has:
```
DATABASE_URL=postgresql://user:password@localhost:5432/shastra_hub
```

**You need to change it to:**
```
DATABASE_URL="postgresql://postgres:YOUR_PASSWORD@localhost:5432/techshastra?schema=public"
```

### Option A: Use the Helper Script (Easiest)

```powershell
.\scripts\update-env.ps1
```

This will:
- ✅ Ask for your PostgreSQL password
- ✅ Update the `.env` file automatically
- ✅ Set the correct database name (`techshastra`)

### Option B: Manual Update

1. **Open the file:**
   ```bash
   notepad shastra-hub/backend/.env
   ```

2. **Find this line:**
   ```
   DATABASE_URL=postgresql://user:password@localhost:5432/shastra_hub
   ```

3. **Replace with:**
   ```
   DATABASE_URL="postgresql://postgres:YOUR_PASSWORD@localhost:5432/techshastra?schema=public"
   ```
   (Replace `YOUR_PASSWORD` with your actual PostgreSQL password)

4. **Save** (Ctrl+S)

## 🔑 Don't Remember Your Password?

### Reset via pgAdmin (Recommended):

1. Open **pgAdmin 4** (from Start Menu)
2. Connect to server (may need to enter password or leave blank)
3. Right-click on server → **Properties**
4. Go to **Connection** tab
5. Change password
6. Click **Save**
7. Update `.env` with new password

### Reset via Command Line:

```bash
# Connect (may need password)
psql -U postgres

# Change password
ALTER USER postgres WITH PASSWORD 'newpassword';

# Exit
\q
```

Then update `.env` with the new password.

## 🔧 Step 2: Create Database

After updating `.env`, run:

```bash
npm run setup:db
```

**This will:**
- ✅ Create the `techshastra` database
- ✅ Run all migrations
- ✅ Create all tables

## 🚀 Step 3: Start Everything

```bash
npm run dev:all
```

**This starts:**
- ✅ Backend: http://localhost:3000
- ✅ Frontend: http://localhost:5173
- ✅ Both in one terminal with colored logs

## ✅ Quick Checklist

- [x] PostgreSQL installed ✅
- [x] PostgreSQL running ✅ (I can see it!)
- [ ] Updated `.env` with password
- [ ] Ran `npm run setup:db`
- [ ] Ran `npm run dev:all`
- [ ] App working! 🎉

## 🎯 Copy-Paste Commands

```bash
# 1. Update .env (use script or manual)
.\scripts\update-env.ps1

# 2. Setup database
npm run setup:db

# 3. Start everything
npm run dev:all
```

---

**You're 95% done! Just update the password and you're ready to go!** 🚀

