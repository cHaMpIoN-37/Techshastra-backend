# TechShastra Hub - Backend API

Express.js backend API with TypeScript, Prisma, PostgreSQL, and Redis.

## 🚀 Quick Start

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Set up environment:**
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

3. **Set up database:**
   ```bash
   npm run prisma:generate
   npm run prisma:migrate
   ```

4. **Start development server:**
   ```bash
   npm run dev
   ```

## 📚 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login
- `POST /api/auth/refresh` - Refresh token
- `POST /api/auth/forgot-password` - Request password reset
- `POST /api/auth/reset-password` - Reset password

### Comments
- `POST /api/comments` - Create comment
- `GET /api/comments/:resource/:resourceId` - Get comments
- `PUT /api/comments/:id` - Update comment
- `DELETE /api/comments/:id` - Delete comment
- `POST /api/comments/:id/approve` - Approve comment

### Likes
- `POST /api/likes/toggle` - Toggle like
- `GET /api/likes/:resource/:resourceId` - Get likes
- `GET /api/likes/:resource/:resourceId/check` - Check if liked
- `GET /api/likes/user/my-likes` - Get user's likes

### Notifications
- `GET /api/notifications` - Get notifications
- `PUT /api/notifications/:id/read` - Mark as read
- `PUT /api/notifications/read-all` - Mark all as read
- `DELETE /api/notifications/:id` - Delete notification

### Preferences
- `GET /api/preferences` - Get preferences
- `PUT /api/preferences` - Update preferences

### Health Checks
- `GET /health` - Full health check
- `GET /ready` - Readiness probe
- `GET /live` - Liveness probe

### API Documentation
- `GET /api-docs` - Swagger UI

## 🔧 Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm test` - Run tests
- `npm run prisma:generate` - Generate Prisma client
- `npm run prisma:migrate` - Run migrations
- `npm run prisma:studio` - Open Prisma Studio

## 📦 Dependencies

- Express.js - Web framework
- Prisma - ORM
- PostgreSQL - Database
- Redis - Caching & job queue
- JWT - Authentication
- Nodemailer - Email service
- Sharp - Image processing
- Winston - Logging
- Swagger - API documentation

## 🔐 Security

- JWT authentication
- Rate limiting
- Input validation (Zod)
- Helmet security headers
- CORS configuration
- Password hashing (bcrypt)

## 📝 Logging

Logs are stored in:
- `logs/error.log` - Error logs
- `logs/combined.log` - All logs
- `logs/exceptions.log` - Uncaught exceptions
- `logs/rejections.log` - Unhandled rejections

## 🎯 Features

- ✅ RESTful API
- ✅ JWT Authentication
- ✅ Role-based access control
- ✅ File uploads
- ✅ Image optimization
- ✅ Email service
- ✅ Background jobs
- ✅ Redis caching
- ✅ API documentation
- ✅ Health checks
- ✅ Performance monitoring
- ✅ Error tracking
- ✅ Request logging
