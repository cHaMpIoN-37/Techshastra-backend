# 🎯 Complete Setup - You're Almost Done!

## ✅ Current Status

- ✅ PostgreSQL 18 installed
- ✅ PostgreSQL service **RUNNING**
- ✅ Startup type: **Automatic** (will auto-start on boot)
- ⏳ Need to: Update password and create database

## 📝 Step 1: Update Database Password

**Open:** `shastra-hub/backend/.env`

**Find this line:**
```env
DATABASE_URL="postgresql://postgres:YOUR_PASSWORD@localhost:5432/techshastra?schema=public"
```

**Replace `YOUR_PASSWORD`** with the password you set when installing PostgreSQL.

**Example:**
```env
DATABASE_URL="postgresql://postgres:MySecurePass123!@localhost:5432/techshastra?schema=public"
```

**Don't remember the password?**
- Check your notes from installation
- Or reset it using pgAdmin (see below)

## 🔧 Step 2: Create Database

From the root directory (`techshastra/`):

```bash
npm run setup:db
```

**What this does:**
- ✅ Checks PostgreSQL is running (it is!)
- ✅ Creates `techshastra` database
- ✅ Runs all migrations
- ✅ Creates all tables

## 🚀 Step 3: Start Everything

```bash
npm run dev:all
```

**This will start:**
- ✅ Backend: http://localhost:3000
- ✅ Frontend: http://localhost:5173 (or next available port)
- ✅ Both in one terminal with colored logs

## 🐛 Troubleshooting

### "password authentication failed"

**Option 1: Reset Password via pgAdmin**
1. Open pgAdmin 4 (from Start Menu)
2. Connect to server (enter current password or leave blank)
3. Right-click server → Properties → Change password
4. Update `.env` with new password

**Option 2: Reset via Command Line**
```bash
# Connect to PostgreSQL
psql -U postgres

# Change password
ALTER USER postgres WITH PASSWORD 'newpassword';

# Exit
\q
```

Then update `.env` with the new password.

### "database does not exist"

The setup script should create it, but if it fails:

```bash
# Connect to PostgreSQL
psql -U postgres

# Create database
CREATE DATABASE techshastra;

# Exit
\q
```

Then run `npm run setup:db` again.

## ✅ Final Checklist

- [x] PostgreSQL installed ✅
- [x] PostgreSQL running ✅
- [ ] Updated `.env` with password
- [ ] Ran `npm run setup:db`
- [ ] Ran `npm run dev:all`
- [ ] App working! 🎉

## 🎯 Quick Copy-Paste Commands

```bash
# 1. Update .env file manually (open in editor)

# 2. Setup database
npm run setup:db

# 3. Start everything
npm run dev:all
```

---

**You're 90% done! Just update the password and run setup:db!** 🚀

