# Backend Implementation Plan - Shastra Hub

## Overview

This document outlines the complete implementation plan for a custom Node.js/Express backend to replace the Supabase BaaS solution, providing full control, better admin features, and enhanced capabilities.

## Technology Stack

### Core
- **Runtime**: Node.js 18+ (LTS)
- **Framework**: Express.js 4.x
- **Language**: TypeScript 5.x
- **Database**: PostgreSQL 15+
- **ORM**: Prisma (type-safe, modern)

### Authentication & Security
- **JWT**: jsonwebtoken
- **Password Hashing**: bcrypt
- **Validation**: Zod (shared with frontend)
- **Rate Limiting**: express-rate-limit
- **Security**: Helmet.js, CORS

### File Handling
- **Upload**: Multer
- **Storage**: Local filesystem (can migrate to S3/Cloudinary)
- **Image Processing**: Sharp (optional)

### Email Service
- **Library**: Nodemailer
- **Provider**: Resend / SendGrid / AWS SES

### Background Jobs
- **Queue**: BullMQ with Redis
- **Scheduler**: node-cron

### Development Tools
- **Testing**: Jest + Supertest
- **Linting**: ESLint
- **Formatting**: Prettier
- **API Docs**: Swagger/OpenAPI

## Project Structure

```
backend/
├── src/
│   ├── config/
│   │   ├── database.ts
│   │   ├── redis.ts
│   │   └── env.ts
│   ├── controllers/
│   │   ├── auth.controller.ts
│   │   ├── user.controller.ts
│   │   ├── project.controller.ts
│   │   ├── event.controller.ts
│   │   ├── blog.controller.ts
│   │   ├── admin.controller.ts
│   │   └── upload.controller.ts
│   ├── middleware/
│   │   ├── auth.middleware.ts
│   │   ├── error.middleware.ts
│   │   ├── validation.middleware.ts
│   │   └── rateLimit.middleware.ts
│   ├── models/
│   │   └── (Prisma schema)
│   ├── routes/
│   │   ├── auth.routes.ts
│   │   ├── user.routes.ts
│   │   ├── project.routes.ts
│   │   ├── event.routes.ts
│   │   ├── blog.routes.ts
│   │   ├── admin.routes.ts
│   │   └── upload.routes.ts
│   ├── services/
│   │   ├── auth.service.ts
│   │   ├── email.service.ts
│   │   ├── file.service.ts
│   │   └── search.service.ts
│   ├── utils/
│   │   ├── logger.ts
│   │   ├── errors.ts
│   │   └── helpers.ts
│   ├── jobs/
│   │   ├── email.job.ts
│   │   └── cleanup.job.ts
│   ├── types/
│   │   └── index.ts
│   ├── validators/
│   │   ├── auth.validator.ts
│   │   ├── project.validator.ts
│   │   └── event.validator.ts
│   └── app.ts
├── prisma/
│   ├── schema.prisma
│   └── migrations/
├── uploads/
│   ├── images/
│   └── files/
├── tests/
│   ├── unit/
│   └── integration/
├── .env.example
├── .gitignore
├── package.json
├── tsconfig.json
└── README.md
```

## API Endpoints Specification

### Authentication Routes (`/api/auth`)

```
POST   /api/auth/register          - User registration
POST   /api/auth/login              - User login
POST   /api/auth/logout             - User logout
POST   /api/auth/refresh            - Refresh access token
GET    /api/auth/me                 - Get current user
POST   /api/auth/forgot-password    - Request password reset
POST   /api/auth/reset-password     - Reset password
```

### User Routes (`/api/users`)

```
GET    /api/users                   - List users (admin)
GET    /api/users/:id               - Get user profile
PUT    /api/users/:id               - Update profile (own/admin)
DELETE /api/users/:id               - Delete user (admin)
GET    /api/users/:id/projects      - Get user's projects
GET    /api/users/:id/events         - Get user's events
```

### Project Routes (`/api/projects`)

```
GET    /api/projects                - List projects (with filters)
GET    /api/projects/:id             - Get project details
POST   /api/projects                 - Create project (auth)
PUT    /api/projects/:id             - Update project (owner/admin)
DELETE /api/projects/:id             - Delete project (owner/admin)
POST   /api/projects/:id/members     - Add member (owner/admin)
DELETE /api/projects/:id/members/:userId - Remove member (owner/admin)
GET    /api/projects/:id/members      - Get project members
```

### Event Routes (`/api/events`)

```
GET    /api/events                  - List events (with filters)
GET    /api/events/:id               - Get event details
POST   /api/events                   - Create event (auth)
PUT    /api/events/:id               - Update event (owner/admin)
DELETE /api/events/:id               - Delete event (owner/admin)
POST   /api/events/:id/register       - Register for event (auth)
DELETE /api/events/:id/register      - Unregister from event (auth)
GET    /api/events/:id/registrations  - Get event registrations (owner/admin)
```

### Blog Routes (`/api/blog`)

```
GET    /api/blog                    - List published posts
GET    /api/blog/:slug               - Get post by slug
POST   /api/blog                     - Create post (auth)
PUT    /api/blog/:id                 - Update post (author/admin)
DELETE /api/blog/:id                 - Delete post (author/admin)
GET    /api/blog/drafts              - Get draft posts (author/admin)
POST   /api/blog/:id/publish         - Publish post (author/admin)
```

### Resource Routes (`/api/resources`)

```
GET    /api/resources               - List resources
GET    /api/resources/:id            - Get resource
POST   /api/resources                - Create resource (auth)
PUT    /api/resources/:id           - Update resource (creator/admin)
DELETE /api/resources/:id            - Delete resource (creator/admin)
```

### Gallery Routes (`/api/gallery`)

```
GET    /api/gallery                  - List images
GET    /api/gallery/:id              - Get image
POST   /api/gallery                  - Upload image (auth)
DELETE /api/gallery/:id              - Delete image (uploader/admin)
```

### FAQ Routes (`/api/faq`)

```
GET    /api/faq                     - List FAQs
GET    /api/faq/:id                  - Get FAQ
POST   /api/faq                      - Create FAQ (admin)
PUT    /api/faq/:id                  - Update FAQ (admin)
DELETE /api/faq/:id                  - Delete FAQ (admin)
```

### Achievement Routes (`/api/achievements`)

```
GET    /api/achievements             - List achievements
GET    /api/achievements/:id         - Get achievement
POST   /api/achievements              - Create achievement (admin)
PUT    /api/achievements/:id          - Update achievement (admin)
DELETE /api/achievements/:id         - Delete achievement (admin)
```

### Newsletter Routes (`/api/newsletter`)

```
POST   /api/newsletter/subscribe     - Subscribe to newsletter
DELETE /api/newsletter/unsubscribe    - Unsubscribe
GET    /api/newsletter/subscribers    - List subscribers (admin)
```

### Contact Routes (`/api/contact`)

```
POST   /api/contact                  - Send contact message
GET    /api/contact                  - List messages (admin)
GET    /api/contact/:id              - Get message (admin)
PUT    /api/contact/:id/read         - Mark as read (admin)
DELETE /api/contact/:id              - Delete message (admin)
```

### Membership Routes (`/api/membership`)

```
POST   /api/membership/apply         - Submit membership application
GET    /api/membership/applications   - List applications (admin)
GET    /api/membership/applications/:id - Get application (admin)
PUT    /api/membership/applications/:id/status - Update status (admin)
```

### Admin Routes (`/api/admin`)

```
GET    /api/admin/stats              - Dashboard statistics
GET    /api/admin/users              - List all users
PUT    /api/admin/users/:id/role     - Update user role
GET    /api/admin/analytics          - Analytics data
POST   /api/admin/bulk-action        - Bulk operations
```

### Upload Routes (`/api/upload`)

```
POST   /api/upload/image             - Upload image
POST   /api/upload/file              - Upload file
DELETE /api/upload/:id               - Delete uploaded file
```

## Database Schema (Prisma)

The schema will match the existing Supabase schema for compatibility:

```prisma
// Enums
enum AppRole {
  admin
  moderator
  member
}

enum ProjectStatus {
  active
  completed
  archived
}

enum EventStatus {
  upcoming
  ongoing
  completed
  cancelled
}

// Models
model Profile {
  id          String   @id
  fullName    String?  @map("full_name")
  avatarUrl   String?  @map("avatar_url")
  bio         String?
  githubUrl   String?  @map("github_url")
  linkedinUrl String?  @map("linkedin_url")
  twitterUrl  String?  @map("twitter_url")
  createdAt   DateTime @default(now()) @map("created_at")
  updatedAt   DateTime @updatedAt @map("updated_at")
  
  user        User     @relation(fields: [id], references: [id], onDelete: Cascade)
  
  @@map("profiles")
}

model User {
  id        String   @id @default(uuid())
  email     String   @unique
  password  String
  createdAt DateTime @default(now()) @map("created_at")
  updatedAt DateTime @updatedAt @map("updated_at")
  
  profile   Profile?
  roles      UserRole[]
  projects   Project[]
  events     Event[]
  blogPosts  BlogPost[]
  
  @@map("users")
}

model UserRole {
  id     String   @id @default(uuid())
  userId String   @map("user_id")
  role   AppRole  @default(member)
  
  user   User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  
  @@unique([userId, role])
  @@map("user_roles")
}

// ... (all other models)
```

## Implementation Phases

### Phase 1: Project Setup (Days 1-2)
- Initialize Node.js project
- Set up TypeScript
- Configure Prisma
- Set up database connection
- Create project structure
- Set up environment variables

### Phase 2: Authentication (Days 3-4)
- Implement JWT authentication
- Create auth controllers
- Set up middleware
- Password hashing
- Token refresh mechanism
- Error handling

### Phase 3: Core CRUD (Days 5-8)
- User management
- Project CRUD
- Event CRUD
- Blog CRUD
- Resource CRUD
- Gallery CRUD
- FAQ CRUD
- Achievement CRUD

### Phase 4: Advanced Features (Days 9-12)
- File upload system
- Email service integration
- Search functionality
- Pagination
- Filtering and sorting
- Admin dashboard API
- Membership applications

### Phase 5: Background Jobs (Days 13-14)
- Set up Redis
- Implement job queues
- Email sending jobs
- Scheduled tasks
- Cleanup jobs

### Phase 6: Testing & Documentation (Days 15-16)
- Unit tests
- Integration tests
- API documentation
- Deployment guide
- README

### Phase 7: Frontend Integration (Days 17-20)
- Create API client
- Update frontend to use new API
- Test all features
- Fix integration issues

## Security Considerations

1. **Authentication**
   - Secure JWT implementation
   - Token expiration
   - Refresh token rotation
   - Password strength requirements

2. **Authorization**
   - Role-based access control
   - Resource ownership checks
   - Admin-only endpoints

3. **Input Validation**
   - All inputs validated
   - SQL injection prevention (Prisma handles this)
   - XSS protection
   - File upload validation

4. **Rate Limiting**
   - Per-route limits
   - IP-based limiting
   - User-based limiting

5. **Security Headers**
   - Helmet.js configuration
   - CORS setup
   - HTTPS enforcement

## Environment Variables

```env
# Server
NODE_ENV=development
PORT=3000
API_URL=http://localhost:3000

# Database
DATABASE_URL=postgresql://user:password@localhost:5432/shastra_hub

# JWT
JWT_SECRET=your-secret-key
JWT_EXPIRES_IN=15m
JWT_REFRESH_SECRET=your-refresh-secret
JWT_REFRESH_EXPIRES_IN=7d

# Redis
REDIS_URL=redis://localhost:6379

# Email
EMAIL_PROVIDER=resend
EMAIL_API_KEY=your-api-key
EMAIL_FROM=noreply@techshastra.com

# File Upload
UPLOAD_DIR=./uploads
MAX_FILE_SIZE=10485760
ALLOWED_IMAGE_TYPES=image/jpeg,image/png,image/webp

# CORS
FRONTEND_URL=http://localhost:5173
```

## Testing Strategy

1. **Unit Tests**
   - Service functions
   - Utility functions
   - Validators

2. **Integration Tests**
   - API endpoints
   - Database operations
   - Authentication flow

3. **E2E Tests**
   - Complete user flows
   - Admin operations
   - File uploads

## Deployment

### Development
- Local PostgreSQL
- Local Redis
- File storage on filesystem

### Production
- PostgreSQL (managed service)
- Redis (managed service)
- File storage (S3/Cloudinary)
- Environment variables
- SSL/TLS
- Monitoring
- Logging

## Monitoring & Logging

1. **Logging**
   - Winston or Pino
   - Request logging
   - Error logging
   - Audit logging

2. **Monitoring**
   - Health checks
   - Performance metrics
   - Error tracking (Sentry)

3. **Analytics**
   - API usage
   - User activity
   - Performance metrics

---

**Next Step**: Begin implementation following this plan.

