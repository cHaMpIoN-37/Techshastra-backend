# TechShastra Hub - Complete Platform

A full-stack club management platform built with React, TypeScript, Node.js, Express, and PostgreSQL.

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- PostgreSQL 14+
- Redis (optional, for caching and background jobs)
- npm or yarn

### ⚡ One-Command Setup (Recommended)

From the root directory (`techshastra/`):

```bash
# Complete setup (installs dependencies, creates .env files, sets up database)
npm install
npm run setup

# Start everything (frontend + backend)
npm run dev:all
```

That's it! The application will be running at:
- **Frontend**: http://localhost:5173 (or next available port)
- **Backend**: http://localhost:3000
- **API Docs**: http://localhost:3000/api-docs

### Manual Setup

If you prefer to set up manually:

### Backend Setup

1. **Navigate to backend directory:**
   ```bash
   cd shastra-hub/backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

4. **Set up database:**
   ```bash
   # Generate Prisma client
   npm run prisma:generate

   # Run migrations
   npm run prisma:migrate

   # (Optional) Open Prisma Studio to view database
   npm run prisma:studio
   ```

5. **Start the backend server:**
   ```bash
   # Development mode
   npm run dev

   # Production mode
   npm run build
   npm start
   ```

The backend will run on `http://localhost:3000`

### Frontend Setup

1. **Navigate to frontend directory (in a new terminal):**
   ```bash
   cd shastra-hub
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   ```bash
   cp .env.example .env
   # Edit .env with your API URL
   ```

4. **Start the development server:**
   ```bash
   npm run dev
   ```

The frontend will run on `http://localhost:5173`

## 📁 Project Structure

```
techshastra/
├── backend/                 # Node.js/Express backend
│   ├── src/
│   │   ├── config/         # Configuration files
│   │   ├── controllers/    # Route controllers
│   │   ├── middleware/     # Express middleware
│   │   ├── routes/         # API routes
│   │   ├── services/       # Business logic
│   │   ├── utils/          # Utility functions
│   │   └── app.ts          # Express app
│   ├── prisma/
│   │   └── schema.prisma   # Database schema
│   └── package.json
│
└── shastra-hub/            # React frontend
    ├── src/
    │   ├── components/     # React components
    │   ├── pages/          # Page components
    │   ├── contexts/       # React contexts
    │   ├── lib/            # Utilities & API client
    │   └── App.tsx         # Root component
    └── package.json
```

## 🎯 Features

### Core Features
- ✅ User authentication (JWT)
- ✅ Role-based access control (Admin, Moderator, Member)
- ✅ Projects management
- ✅ Events management
- ✅ Blog system
- ✅ Resources library
- ✅ Gallery
- ✅ FAQ system
- ✅ Achievements showcase
- ✅ Newsletter subscription
- ✅ Contact form
- ✅ Membership applications

### Advanced Features
- ✅ Comments system (with nested replies)
- ✅ Likes/Favorites system
- ✅ User notifications
- ✅ User preferences
- ✅ Image upload & optimization
- ✅ Email service (Nodemailer)
- ✅ Background jobs (BullMQ)
- ✅ Redis caching
- ✅ API documentation (Swagger)
- ✅ Export functionality (CSV/JSON)
- ✅ Bulk operations
- ✅ Performance monitoring
- ✅ Enhanced logging (Winston)
- ✅ Error tracking (Sentry-ready)
- ✅ Rate limiting
- ✅ Request validation (Zod)
- ✅ Code splitting & lazy loading
- ✅ PWA support

## 🔧 Configuration

### Environment Variables

**Backend (.env):**
- `DATABASE_URL` - PostgreSQL connection string
- `JWT_SECRET` - JWT signing secret
- `JWT_REFRESH_SECRET` - JWT refresh secret
- `PORT` - Server port (default: 3000)
- `FRONTEND_URL` - Frontend URL for CORS
- `REDIS_HOST` - Redis host (optional)
- `REDIS_PORT` - Redis port (optional)
- Email configuration (SMTP/Gmail)

**Frontend (.env):**
- `VITE_API_URL` - Backend API URL

## 📚 API Documentation

Once the backend is running, visit:
- Swagger UI: `http://localhost:3000/api-docs`

## 🧪 Testing

```bash
# Backend tests
cd backend
npm test

# Frontend tests (when added)
cd shastra-hub
npm test
```

## 🚀 Deployment

### Backend
1. Build: `npm run build`
2. Set production environment variables
3. Run migrations: `npm run prisma:migrate deploy`
4. Start: `npm start`

### Frontend
1. Build: `npm run build`
2. Serve the `dist` folder with a static server

## 📝 Database Migrations

```bash
# Create a new migration
npm run prisma:migrate dev --name migration_name

# Apply migrations in production
npm run prisma:migrate deploy

# Reset database (development only)
npm run prisma:migrate reset
```

## 🔐 Default Roles

- **Admin**: Full access to all features
- **Moderator**: Can moderate content (comments, etc.)
- **Member**: Standard user access

## 📞 Support

For issues or questions, please check the documentation or contact the development team.

---

**Built with ❤️ for TechShastra Club**
