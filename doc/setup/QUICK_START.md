# 🚀 Quick Start Guide

Get TechShastra Hub running in 5 minutes!

## Prerequisites Check

- ✅ Node.js 18+ installed
- ✅ PostgreSQL 14+ installed and running
- ✅ (Optional) Redis installed (for caching & background jobs)

## Step 1: Backend Setup (2 minutes)

```bash
cd shastra-hub/backend

# Install dependencies
npm install

# Copy and configure environment
cp .env.example .env
# Edit .env with your DATABASE_URL

# Setup database
npm run prisma:generate
npm run prisma:migrate

# Start backend
npm run dev
```

✅ Backend running on `http://localhost:3000`

## Step 2: Frontend Setup (2 minutes)

```bash
# Open a new terminal, then:
cd shastra-hub

# Install dependencies
npm install

# Copy environment (usually no changes needed)
cp .env.example .env

# Start frontend
npm run dev
```

✅ Frontend running on `http://localhost:5173`

## Step 3: Create Admin User

1. Open `http://localhost:5173`
2. Register a new account
3. In your database, update the user role:
   ```sql
   UPDATE user_roles SET role = 'admin' WHERE user_id = 'your-user-id';
   ```
4. Logout and login again
5. Access Admin Dashboard at `/admin`

## 🎉 You're Done!

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:3000
- **API Docs**: http://localhost:3000/api-docs
- **Prisma Studio**: Run `npm run prisma:studio` in backend folder

## Troubleshooting

**Frontend: `.env.example` not found?**
- The file should be in `shastra-hub/` directory
- If missing, create it with: `echo 'VITE_API_URL="http://localhost:3000/api"' > .env.example`

**Database connection error?**
- **PostgreSQL must be installed and running**
- Check if running: `Get-Service postgresql*` (Windows) or `brew services list` (macOS)
- Start PostgreSQL if not running
- Verify DATABASE_URL in `backend/.env` matches your PostgreSQL setup
- See `DATABASE_SETUP.md` for detailed instructions

**Port already in use?**
- Change PORT in backend `.env`
- Update VITE_API_URL in frontend `.env`

**Redis connection error?**
- Redis is optional - app works without it
- Caching and background jobs will be disabled

## Next Steps

- Read `README.md` for full documentation
- Check `START_HERE.md` for detailed setup
- Explore the admin dashboard
- Create projects, events, and blog posts!

