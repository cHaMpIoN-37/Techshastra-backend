# ✅ Next Steps - PostgreSQL is Running!

## 🎉 Great News!

Your PostgreSQL 18 service is **Running** and set to **Automatic** startup!

## 📝 Step 1: Update Database URL

Edit `shastra-hub/backend/.env`:

```env
DATABASE_URL="postgresql://postgres:YOUR_PASSWORD@localhost:5432/techshastra?schema=public"
```

**Replace `YOUR_PASSWORD`** with the password you set during PostgreSQL installation.

**Don't remember the password?**
- Check if you saved it during installation
- Or reset it (see below)

## 🔧 Step 2: Create Database

Run this command:

```bash
npm run setup:db
```

This will:
- ✅ Create the `techshastra` database
- ✅ Run all migrations
- ✅ Set up all tables

## 🚀 Step 3: Start Everything

```bash
npm run dev:all
```

This starts:
- ✅ Backend on http://localhost:3000
- ✅ Frontend on http://localhost:5173 (or next available port)

## 🐛 If Database Setup Fails

### Issue: "password authentication failed"

**Solution:** Reset PostgreSQL password or verify it:

1. **Find pg_hba.conf:**
   ```
   C:\Program Files\PostgreSQL\18\data\pg_hba.conf
   ```

2. **Or use pgAdmin:**
   - Open pgAdmin 4
   - Connect to server
   - Right-click server → Properties → Change password

3. **Or reset via command (if you have access):**
   ```sql
   ALTER USER postgres WITH PASSWORD 'newpassword';
   ```

### Issue: "database does not exist"

**Solution:** Create it manually:

```bash
psql -U postgres
```

Then inside psql:
```sql
CREATE DATABASE techshastra;
\q
```

Then run `npm run setup:db` again.

## ✅ Verification Checklist

- [x] PostgreSQL 18 installed ✅
- [x] PostgreSQL service running ✅
- [x] Startup type: Automatic ✅
- [ ] Database URL updated in `.env`
- [ ] Database created (`npm run setup:db`)
- [ ] App started (`npm run dev:all`)

## 🎯 Quick Commands

```bash
# 1. Update .env with your password
# (Edit shastra-hub/backend/.env manually)

# 2. Setup database
npm run setup:db

# 3. Start everything
npm run dev:all
```

---

**You're almost there! Just update the password in .env and run setup:db!**

