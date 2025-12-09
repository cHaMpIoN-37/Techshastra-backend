# 🎯 Get Started in 3 Steps

## Step 1: Install Root Dependencies
```bash
npm install
```

## Step 2: Complete Setup (One-Time)
```bash
npm run setup
```

**This will:**
- Create all `.env` files
- Install all dependencies
- Set up database
- Run migrations

**⚠️ Important:** Update `shastra-hub/backend/.env` with your PostgreSQL password:
```env
DATABASE_URL="postgresql://postgres:YOUR_PASSWORD@localhost:5432/techshastra?schema=public"
```

## Step 3: Start Everything
```bash
npm run dev:all
```

**That's it!** 🎉

- Frontend: http://localhost:5173
- Backend: http://localhost:3000
- API Docs: http://localhost:3000/api-docs

---

## 🐛 Quick Troubleshooting

**PostgreSQL not running?**

**Easiest Method (GUI):**
1. Press `Win + R`
2. Type: `services.msc`
3. Find `postgresql-x64-18` (or your version)
4. Right-click → Start

**Command Line (Requires Admin PowerShell):**
```powershell
# Open PowerShell as Administrator first!
net start postgresql-x64-18
```

**Or use our script:**
```bash
npm run start:postgres
```
(Still requires Admin PowerShell)

**Then run:**
```bash
npm run setup:db
```

**See `START_POSTGRES.md` or `POSTGRESQL_START.md` for detailed instructions!**

**Database connection error?**
1. Make sure PostgreSQL is running
2. Update `DATABASE_URL` in `shastra-hub/backend/.env`
3. Run `npm run setup:db`

**See `ONE_COMMAND_SETUP.md` for detailed help!**

