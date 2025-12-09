# 🚀 One Command Setup - TechShastra Hub

## ⚡ Quick Start

**From the root directory (`techshastra/`):**

```bash
# Step 1: Install root dependencies
npm install

# Step 2: Complete setup (one-time)
npm run setup

# Step 3: Start everything
npm run dev:all
```

**That's it!** Everything will be running:
- ✅ Frontend on http://localhost:5173
- ✅ Backend on http://localhost:3000
- ✅ Database connected and migrated

---

## 📋 What `npm run setup` Does

1. ✅ Creates `.env` files from examples
2. ✅ Installs all dependencies (root, backend, frontend)
3. ✅ Generates Prisma client
4. ✅ Checks PostgreSQL status
5. ✅ Creates database if needed
6. ✅ Runs database migrations

---

## 📋 What `npm run dev:all` Does

1. ✅ Checks and creates `.env` files if missing
2. ✅ Installs dependencies if missing
3. ✅ Starts backend server (port 3000)
4. ✅ Starts frontend server (port 5173)
5. ✅ Shows both logs in one terminal

---

## 🔧 First Time Setup

### 1. Install Root Dependencies
```bash
npm install
```

### 2. Run Complete Setup
```bash
npm run setup
```

**Note:** You'll need to:
- Update `DATABASE_URL` in `shastra-hub/backend/.env` with your PostgreSQL password
- Make sure PostgreSQL is installed and running

### 3. Start Everything
```bash
npm run dev:all
```

---

## 🐛 Troubleshooting

### PostgreSQL Not Installed

**Windows:**
1. Download: https://www.postgresql.org/download/windows/
2. Install and remember the postgres password
3. Run `npm run setup` again

**macOS:**
```bash
brew install postgresql@14
brew services start postgresql@14
npm run setup
```

**Linux:**
```bash
sudo apt-get install postgresql postgresql-contrib
sudo systemctl start postgresql
npm run setup
```

### PostgreSQL Not Running

**Windows:**
```bash
net start postgresql-x64-14
```

**macOS:**
```bash
brew services start postgresql@14
```

**Linux:**
```bash
sudo systemctl start postgresql
```

Then run:
```bash
npm run setup:db
```

### Database Connection Error

1. **Check PostgreSQL is running** (see above)
2. **Update `shastra-hub/backend/.env`:**
   ```env
   DATABASE_URL="postgresql://postgres:YOUR_PASSWORD@localhost:5432/techshastra?schema=public"
   ```
3. **Create database manually if needed:**
   ```bash
   psql -U postgres
   CREATE DATABASE techshastra;
   \q
   ```
4. **Run migrations:**
   ```bash
   npm run setup:db
   ```

### Port Already in Use

- Frontend automatically tries next port (5174, 5175, etc.)
- Backend: Change `PORT` in `shastra-hub/backend/.env`

---

## 📁 Available Commands

### Development
- `npm run dev:all` - Start frontend + backend together ⭐
- `npm run dev:frontend` - Start only frontend
- `npm run dev:backend` - Start only backend

### Setup
- `npm run setup` - Complete setup (one-time) ⭐
- `npm run setup:db` - Setup database only
- `npm run install:all` - Install all dependencies

### Production
- `npm run build` - Build both frontend and backend
- `npm start` - Start in production mode

---

## 🎯 After Setup

1. **Create Admin User:**
   - Open http://localhost:5173
   - Register a new account
   - Update role in database:
     ```sql
     psql -U postgres -d techshastra
     UPDATE user_roles SET role = 'admin' WHERE user_id = 'your-user-id';
     \q
     ```

2. **Access Admin Dashboard:**
   - Login with admin account
   - Visit: http://localhost:5173/admin

---

## ✅ Verification

**Check if everything is running:**

1. **Frontend:** http://localhost:5173 (or next available port)
2. **Backend:** http://localhost:3000/health
3. **API Docs:** http://localhost:3000/api-docs

**All working?** 🎉 You're ready to go!

---

## 📚 More Help

- `README.md` - Main documentation
- `shastra-hub/README.md` - Detailed project docs
- `shastra-hub/DATABASE_SETUP.md` - Database setup details
- `shastra-hub/QUICK_START.md` - Quick start guide

---

**Need help?** Check the troubleshooting section above or see the detailed documentation.

