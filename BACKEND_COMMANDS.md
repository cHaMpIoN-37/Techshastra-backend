# 🚀 Backend Commands Reference

## Quick Start

### From Root Directory (`techshastra/`)

```bash
# Start backend in development mode (with auto-reload)
npm run dev:backend

# Start backend in production mode
npm run start:backend

# Start both frontend + backend together
npm run dev:all
```

### From Backend Directory (`shastra-hub/backend/`)

```bash
# Development mode (with watch/auto-reload)
npm run dev

# Build TypeScript to JavaScript
npm run build

# Start production server (requires build first)
npm start

# Generate Prisma client
npm run prisma:generate

# Run database migrations
npm run prisma:migrate

# Open Prisma Studio (database GUI)
npm run prisma:studio

# Run tests
npm test

# Run tests in watch mode
npm run test:watch

# Lint code
npm run lint

# Format code
npm run format
```

## Common Workflows

### First Time Setup
```bash
cd shastra-hub/backend
npm install
npm run prisma:generate
npm run prisma:migrate
npm run dev
```

### Daily Development
```bash
# From root directory
npm run dev:backend
```

### Database Management
```bash
cd shastra-hub/backend

# Generate Prisma client after schema changes
npm run prisma:generate

# Create and apply migrations
npm run prisma:migrate

# View/edit database in browser
npm run prisma:studio
```

### Production Build
```bash
cd shastra-hub/backend
npm run build
npm start
```

## Server URLs

- **Backend API**: http://localhost:3000
- **API Documentation**: http://localhost:3000/api-docs
- **Health Check**: http://localhost:3000/api/v1/health

## Environment Variables

Make sure `shastra-hub/backend/.env` is configured with:
- `DATABASE_URL` - PostgreSQL connection string
- `JWT_SECRET` - Secret for JWT tokens (min 32 chars)
- `JWT_REFRESH_SECRET` - Secret for refresh tokens (min 32 chars)
- `PORT` - Server port (default: 3000)
- `FRONTEND_URL` - Frontend URL for CORS (default: http://localhost:5173)

## Troubleshooting

### Backend won't start
1. Check if PostgreSQL is running
2. Verify `.env` file exists and has required variables
3. Run `npm run prisma:generate` to ensure Prisma client is generated
4. Check logs for specific errors

### Database connection errors
1. Verify PostgreSQL is running: `psql -U postgres`
2. Check `DATABASE_URL` in `.env` file
3. Ensure database exists: `CREATE DATABASE techshastra;`
4. Run migrations: `npm run prisma:migrate`

### Port already in use
- Change `PORT` in `.env` file
- Or stop the process using port 3000

