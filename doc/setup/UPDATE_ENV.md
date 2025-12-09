# 📝 Update .env File - Quick Guide

## ✅ Current Status

Your `.env` file has:
```
DATABASE_URL=postgresql://user:password@localhost:5432/shastra_hub
```

## 🔧 What to Change

You need to update it to:
```
DATABASE_URL="postgresql://postgres:YOUR_PASSWORD@localhost:5432/techshastra?schema=public"
```

**Changes needed:**
1. ✅ Username: `user` → `postgres`
2. ✅ Password: `password` → **YOUR_POSTGRESQL_PASSWORD**
3. ✅ Database: `shastra_hub` → `techshastra`
4. ✅ Add: `?schema=public` at the end
5. ✅ Add quotes around the URL

## 📝 How to Update

### Method 1: Using Notepad

1. **Open the file:**
   ```bash
   notepad shastra-hub/backend/.env
   ```

2. **Find the line:**
   ```
   DATABASE_URL=postgresql://user:password@localhost:5432/shastra_hub
   ```

3. **Replace with:**
   ```
   DATABASE_URL="postgresql://postgres:YOUR_PASSWORD@localhost:5432/techshastra?schema=public"
   ```
   (Replace `YOUR_PASSWORD` with your actual PostgreSQL password)

4. **Save** (Ctrl+S) and close

### Method 2: Using VS Code

1. Open `shastra-hub/backend/.env` in VS Code
2. Find `DATABASE_URL` line
3. Update as shown above
4. Save (Ctrl+S)

## 🔑 Finding Your PostgreSQL Password

**If you remember it:**
- Use that password

**If you forgot it:**
- Check your installation notes
- Or reset it (see below)

## 🔄 Reset PostgreSQL Password (If Needed)

### Using pgAdmin (Easiest):

1. Open **pgAdmin 4** (from Start Menu)
2. Connect to server (may need to enter password or leave blank)
3. Right-click on server → **Properties**
4. Go to **Connection** tab
5. Change password
6. Click **Save**

### Using Command Line:

```bash
# Connect (may need password)
psql -U postgres

# Change password
ALTER USER postgres WITH PASSWORD 'newpassword';

# Exit
\q
```

## ✅ After Updating .env

1. **Save the file**
2. **Run database setup:**
   ```bash
   npm run setup:db
   ```
3. **Start the app:**
   ```bash
   npm run dev:all
   ```

## 📋 Example .env File

Your `shastra-hub/backend/.env` should look like:

```env
# Database
DATABASE_URL="postgresql://postgres:MyPassword123!@localhost:5432/techshastra?schema=public"

# JWT Secrets
JWT_SECRET="your-super-secret-jwt-key-change-in-production"
JWT_REFRESH_SECRET="your-super-secret-refresh-key-change-in-production"
JWT_EXPIRES_IN="15m"
JWT_REFRESH_EXPIRES_IN="7d"

# Server
PORT=3000
NODE_ENV="development"
API_URL="http://localhost:3000"
FRONTEND_URL="http://localhost:5173"

# ... (other settings)
```

---

**Update the DATABASE_URL line with your actual password, then run `npm run setup:db`!**

