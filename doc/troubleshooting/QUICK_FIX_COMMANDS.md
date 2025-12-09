# 🚀 Quick Fix - Run Commands from Root Directory!

## ❌ Problem

You're in `shastra-hub/` directory, but the scripts are in the **root** `package.json`.

## ✅ Solution

**Go to the root directory first:**

```bash
cd ..
```

Then run:

```bash
# 1. Setup database
npm run setup:db

# 2. Start everything
npm run dev:all
```

## 📝 Complete Steps

```bash
# 1. Go to root directory
cd C:\Users\rajea\Documents\techshastra

# 2. Setup database (creates database and runs migrations)
npm run setup:db

# 3. Start everything (frontend + backend)
npm run dev:all
```

## ✅ Your .env is Already Updated!

I've updated your `.env` file with:
- ✅ Username: `postgres`
- ✅ Password: `Akhilesh@098765`
- ✅ Database: `techshastra`

## 🎯 One-Liner

```bash
cd .. && npm run setup:db && npm run dev:all
```

---

**Just go to the root directory and run the commands!** 🚀

