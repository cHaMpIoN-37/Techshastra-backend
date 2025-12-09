# 🚀 START HERE - TechShastra Hub

## Quick Setup Guide

### Step 1: Backend Setup

```bash
cd shastra-hub/backend

# Install dependencies
npm install

# Copy environment file
cp .env.example .env

# Edit .env file with your database credentials
# DATABASE_URL="postgresql://user:password@localhost:5432/techshastra"

# Generate Prisma client
npm run prisma:generate

# Run database migrations
npm run prisma:migrate

# Start backend server
npm run dev
```

Backend will run on: `http://localhost:3000`

### Step 2: Frontend Setup

```bash
cd shastra-hub

# Install dependencies
npm install

# Copy environment file
cp .env.example .env

# Edit .env file (usually no changes needed for local dev)
# VITE_API_URL="http://localhost:3000/api"

# Start frontend server
npm run dev
```

Frontend will run on: `http://localhost:5173`

### Step 3: Optional - Redis Setup (for caching & background jobs)

```bash
# Install Redis (if not installed)
# macOS: brew install redis
# Ubuntu: sudo apt-get install redis-server
# Windows: Download from https://redis.io/download

# Start Redis
redis-server

# Redis will run on: localhost:6379
```

### Step 4: Access the Application

- **Frontend:** http://localhost:5173
- **Backend API:** http://localhost:3000
- **API Docs:** http://localhost:3000/api-docs
- **Prisma Studio:** Run `npm run prisma:studio` in backend folder

## 🎯 First Steps

1. **Create an Admin User:**
   - Register a new user via the frontend
   - Update the user role to "admin" in the database:
     ```sql
     UPDATE user_roles SET role = 'admin' WHERE user_id = 'your-user-id';
     ```

2. **Test Features:**
   - Login with your admin account
   - Access admin dashboard
   - Create projects, events, blog posts
   - Test comments and likes
   - Check notifications

## 📝 Important Notes

- **Database:** Make sure PostgreSQL is running
- **Redis:** Optional but recommended for production
- **Email:** Configure SMTP settings in `.env` for email features
- **File Uploads:** Uploads folder will be created automatically

## 🐛 Troubleshooting

### Frontend: `.env.example` Not Found
If you see `cp: cannot stat '.env.example'`:
```bash
cd shastra-hub
echo 'VITE_API_URL="http://localhost:3000/api"' > .env.example
cp .env.example .env
```

### Database Connection Error
**PostgreSQL must be installed and running!**

1. **Check if PostgreSQL is running:**
   - Windows: `Get-Service postgresql*`
   - macOS: `brew services list`
   - Linux: `sudo systemctl status postgresql`

2. **Start PostgreSQL if not running:**
   - Windows: `net start postgresql-x64-14` (adjust version)
   - macOS: `brew services start postgresql@14`
   - Linux: `sudo systemctl start postgresql`

3. **Verify DATABASE_URL in `backend/.env`:**
   ```
   DATABASE_URL="postgresql://postgres:your_password@localhost:5432/techshastra?schema=public"
   ```

4. **Create database if it doesn't exist:**
   ```sql
   CREATE DATABASE techshastra;
   ```

5. **See `DATABASE_SETUP.md` for detailed instructions**

### Redis Connection Error
- Redis is optional - app will work without it
- Caching and background jobs will be disabled
- Check REDIS_HOST and REDIS_PORT in `.env`

### Port Already in Use
- Change PORT in backend `.env`
- Update VITE_API_URL in frontend `.env`

## ✅ Verification Checklist

- [ ] Backend server running on port 3000
- [ ] Frontend server running on port 5173
- [ ] Database migrations completed
- [ ] Can access frontend in browser
- [ ] Can register/login
- [ ] API docs accessible at /api-docs

## 🎉 You're Ready!

The application is now ready to use. Start exploring the features!

