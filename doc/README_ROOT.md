# 🚀 TechShastra Hub - One Command Setup

## ⚡ Quick Start (Recommended)

**From the root directory:**

```bash
# 1. Install root dependencies
npm install

# 2. Complete setup (creates .env files, installs all dependencies, sets up database)
npm run setup

# 3. Start everything (frontend + backend)
npm run dev:all
```

**That's it!** 🎉

- **Frontend**: http://localhost:5173 (or next available port)
- **Backend**: http://localhost:3000
- **API Docs**: http://localhost:3000/api-docs

---

## 📋 Available Commands

### Development
- `npm run dev:all` - Start frontend + backend together
- `npm run dev:frontend` - Start only frontend
- `npm run dev:backend` - Start only backend

### Setup
- `npm run setup` - Complete setup (env files, dependencies, database)
- `npm run setup:db` - Setup database only
- `npm run install:all` - Install all dependencies

### Production
- `npm run build` - Build both frontend and backend
- `npm start` - Start in production mode

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

This will:
- ✅ Create `.env` files from examples
- ✅ Install all dependencies (root, backend, frontend)
- ✅ Generate Prisma client
- ✅ Check PostgreSQL and create database
- ✅ Run database migrations

### 3. Update Database URL

Edit `shastra-hub/backend/.env`:
```env
DATABASE_URL="postgresql://postgres:your_password@localhost:5432/techshastra?schema=public"
```

### 4. Start Everything
```bash
npm run dev:all
```

---

## 🐛 Troubleshooting

### PostgreSQL Not Running
```bash
# Windows
net start postgresql-x64-14

# macOS
brew services start postgresql@14

# Linux
sudo systemctl start postgresql
```

Then run:
```bash
npm run setup:db
```

### Database Connection Error
1. Make sure PostgreSQL is running
2. Update `DATABASE_URL` in `shastra-hub/backend/.env`
3. Create database manually if needed:
   ```sql
   psql -U postgres
   CREATE DATABASE techshastra;
   \q
   ```
4. Run: `npm run setup:db`

### Port Already in Use
- Frontend will automatically try next port (5174, 5175, etc.)
- Backend: Change `PORT` in `shastra-hub/backend/.env`

---

## 📁 Project Structure

```
techshastra/
├── package.json          # Root package.json with dev:all script
├── scripts/              # Setup and start scripts
│   ├── dev-all.js       # Start frontend + backend
│   ├── setup.js         # Complete setup
│   └── setup-database.js # Database setup
├── shastra-hub/
│   ├── backend/         # Node.js/Express backend
│   └── [frontend]      # React frontend
```

---

## 📚 More Documentation

- `shastra-hub/README.md` - Full project documentation
- `shastra-hub/QUICK_START.md` - Quick start guide
- `shastra-hub/DATABASE_SETUP.md` - Database setup details
- `shastra-hub/START_HERE.md` - Detailed setup guide

---

## 🎯 Next Steps

1. **Create Admin User:**
   - Register via frontend
   - Update role in database:
     ```sql
     UPDATE user_roles SET role = 'admin' WHERE user_id = 'your-user-id';
     ```

2. **Access Admin Dashboard:**
   - Login with admin account
   - Visit: http://localhost:5173/admin

3. **Explore Features:**
   - Create projects, events, blog posts
   - Test comments and likes
   - Check notifications

---

**Built with ❤️ for TechShastra Club**

