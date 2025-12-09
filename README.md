# TechShastra Hub - Full Stack Club Management Platform

A comprehensive full-stack application for managing a tech club, including projects, events, blog posts, resources, gallery, and member management.

## 🚀 Quick Start

### Prerequisites

- **Node.js** >= 18.0.0
- **npm** >= 9.0.0
- **PostgreSQL** >= 14 (required for backend)
- **Redis** (optional, for caching and job queues)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd <repo-root>
   ```

2. **Install dependencies**
   ```bash
   # Install root dependencies
   npm install

   # Install backend dependencies
   cd backend
   npm install

   # Install frontend dependencies
   cd ../..
   cd shastra-hub
   npm install
   ```

3. **Set up environment variables**

   **Backend** (`shastra-hub/backend/.env`):
   ```env
   NODE_ENV=development
   PORT=5000
   API_URL=http://localhost:5000

   # Database (REQUIRED)
   DATABASE_URL=DATABASE_URL="postgresql://techuser:password@localhost:5432/techshastra?schema=public"

   # JWT Secrets (REQUIRED - Generate with: openssl rand -base64 32)
   JWT_SECRET=your-32-character-secret-here
   JWT_REFRESH_SECRET=your-32-character-refresh-secret-here

   # Redis (Optional)
   REDIS_URL=redis://localhost:6379

   # CORS
   FRONTEND_URL=http://localhost:5173
   ```

   **Frontend** (`shastra-hub/.env`):
   ```env
   VITE_API_URL=http://localhost:5000/api
   ```

4. **Set up the database**
   ```bash
   cd shastra-hub/backend
   
   # Generate Prisma client
   npm run prisma:generate
   
   # Run migrations
   npm run prisma:migrate
   ```

5. **Start the development servers**

   **Option 1: Start both together (recommended)**
   ```bash
   # From root directory
   npm run dev:all
   ```

   **Option 2: Start separately**
   ```bash
   # Terminal 1 - Backend
   cd shastra-hub/backend
   npm run dev

   # Terminal 2 - Frontend
   cd shastra-hub
   npm run dev
   ```

6. **Access the application**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:5000
   - API Docs: http://localhost:5000/api-docs
   - Health Check: http://localhost:5000/health

## 📁 Project Structure

```
techshastra/
├── shastra-hub/
│   ├── backend/          # Express.js + TypeScript backend
│   │   ├── src/
│   │   │   ├── config/   # Configuration files
│   │   │   ├── controllers/
│   │   │   ├── middleware/
│   │   │   ├── routes/
│   │   │   ├── services/
│   │   │   └── utils/
│   │   ├── prisma/       # Database schema and migrations
│   │   └── .env          # Backend environment variables
│   │
│   ├── src/              # React + TypeScript frontend
│   │   ├── components/   # React components
│   │   ├── pages/        # Page components
│   │   ├── lib/          # API client and utilities
│   │   ├── types/        # TypeScript type definitions
│   │   └── hooks/        # Custom React hooks
│   └── .env              # Frontend environment variables
│
└── README.md
```

## 🔧 Configuration

### Backend Configuration

The backend requires the following environment variables:

| Variable | Required | Description |
|----------|----------|-------------|
| `DATABASE_URL` | ✅ Yes | PostgreSQL connection string |
| `JWT_SECRET` | ✅ Yes | Secret for JWT tokens (min 32 chars) |
| `JWT_REFRESH_SECRET` | ✅ Yes | Secret for refresh tokens (min 32 chars) |
| `PORT` | No | Server port (default: 5000) |
| `REDIS_URL` | No | Redis connection URL (optional) |
| `FRONTEND_URL` | No | Frontend URL for CORS (default: http://localhost:5173) |

### Frontend Configuration

| Variable | Required | Description |
|----------|----------|-------------|
| `VITE_API_URL` | No | Backend API URL (default: http://localhost:5000/api) |

## 🗄️ Database Setup

### PostgreSQL Setup

1. **Install PostgreSQL** (if not already installed)
   - Windows: Download from [postgresql.org](https://www.postgresql.org/download/windows/)
   - macOS: `brew install postgresql`
   - Linux: `sudo apt-get install postgresql`

2. **Create database**
   ```sql
   CREATE DATABASE techshastra;
   ```

3. **Update DATABASE_URL** in `shastra-hub/backend/.env`
   ```env
   DATABASE_URL=DATABASE_URL="postgresql://techuser:password@localhost:5432/techshastra?schema=public"
   ```

4. **Run migrations**
   ```bash
   cd shastra-hub/backend
   npm run prisma:migrate
   ```

### Redis Setup (Optional)

Redis is optional but recommended for:
- Caching
- Rate limiting
- Job queues (image optimization)

**Install Redis:**
- Windows: Use WSL or Docker
- macOS: `brew install redis`
- Linux: `sudo apt-get install redis-server`

**Start Redis:**
```bash
redis-server
```

## 🛠️ Development

### Backend Development

```bash
cd shastra-hub/backend

# Start development server with hot reload
npm run dev

# Run tests
npm test

# Generate Prisma client
npm run prisma:generate

# Open Prisma Studio (database GUI)
npm run prisma:studio

# Build for production
npm run build

# Start production server
npm start
```

### Frontend Development

```bash
cd shastra-hub

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint
```

## 🐛 Troubleshooting

### Backend won't start

1. **Check environment variables**
   - Ensure `.env` file exists in `shastra-hub/backend/`
   - Verify `DATABASE_URL`, `JWT_SECRET`, and `JWT_REFRESH_SECRET` are set
   - JWT secrets must be at least 32 characters

2. **Check database connection**
   - Ensure PostgreSQL is running
   - Verify `DATABASE_URL` is correct
   - Test connection: `psql $DATABASE_URL`

3. **Check port availability**
   - Ensure port 5000 is not in use
   - Change `PORT` in `.env` if needed

### Frontend can't connect to backend

1. **Check backend is running**
   - Visit http://localhost:5000/health
   - Should return `{ "status": "ok" }`

2. **Check API URL**
   - Verify `VITE_API_URL` in `shastra-hub/.env`
   - Should be `http://localhost:5000/api`

3. **Check CORS**
   - Verify `FRONTEND_URL` in backend `.env` matches frontend URL
   - Default: `http://localhost:5173`

### Database migration errors

1. **Reset database** (⚠️ WARNING: Deletes all data)
   ```bash
   cd shastra-hub/backend
   npx prisma migrate reset
   ```

2. **Check Prisma schema**
   - Ensure `prisma/schema.prisma` is valid
   - Run `npx prisma validate`

### Redis connection errors

- Redis is optional - the app will work without it
- Caching and rate limiting will be disabled
- CSRF protection will gracefully degrade

## 📚 API Documentation

Once the backend is running, visit:
- **Swagger UI**: http://localhost:5000/api-docs

## 🧪 Testing

```bash
# Backend tests
cd shastra-hub/backend
npm test

# Frontend tests (if configured)
cd shastra-hub
npm test
```

## 🚢 Production Deployment

### Backend

1. **Build the application**
   ```bash
   cd shastra-hub/backend
   npm run build
   ```

2. **Set production environment variables**
   - Use strong JWT secrets
   - Set `NODE_ENV=production`
   - Configure production database URL
   - Set proper CORS origins

3. **Start the server**
   ```bash
   npm start
   ```

### Frontend

1. **Build the application**
   ```bash
   cd shastra-hub
   npm run build
   ```

2. **Set production environment variables**
   - Set `VITE_API_URL` to production backend URL

3. **Serve the build**
   - Use a static file server (nginx, Apache, etc.)
   - Or use `npm run preview` for testing

## 📝 Key Features

- ✅ User authentication and authorization
- ✅ Project management
- ✅ Event management and registration
- ✅ Blog system
- ✅ Resource library
- ✅ Photo gallery
- ✅ FAQ system
- ✅ Achievement tracking
- ✅ Newsletter subscriptions
- ✅ Contact form
- ✅ Membership applications
- ✅ Admin dashboard
- ✅ Comments and likes
- ✅ Notifications
- ✅ User preferences

## 🔒 Security Features

- JWT-based authentication
- Password hashing with bcrypt
- CSRF protection (with graceful degradation)
- Rate limiting
- Input sanitization
- Helmet.js security headers
- CORS configuration

## 📦 Tech Stack

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Language**: TypeScript
- **Database**: PostgreSQL + Prisma ORM
- **Cache**: Redis (optional)
- **Authentication**: JWT
- **File Upload**: Multer
- **Image Processing**: Sharp

### Frontend
- **Framework**: React 18
- **Language**: TypeScript
- **Build Tool**: Vite
- **UI Library**: Radix UI + shadcn/ui
- **Styling**: Tailwind CSS
- **State Management**: React Query
- **Routing**: React Router

## 🤝 Contributing

1. Create a feature branch
2. Make your changes
3. Test thoroughly
4. Submit a pull request

## 📄 License

MIT License

## 🆘 Support

For issues and questions:
1. Check the troubleshooting section
2. Review the API documentation
3. Check backend logs in `shastra-hub/backend/logs/`
4. Open an issue on GitHub

---

**Note**: This project has been comprehensively refactored to fix all integration issues. All critical bugs have been resolved, and the codebase now follows best practices with proper error handling, type safety, and documentation.
