# Environment Setup Guide

Since `.env` files are gitignored, you need to create them manually. Follow these steps:

## Backend Environment Setup

1. **Navigate to backend directory**
   ```bash
   cd shastra-hub/backend
   ```

2. **Copy the example file**
   ```bash
   cp env.example .env
   ```

3. **Edit `.env` and set the following REQUIRED variables:**

   ```env
   # Database (REQUIRED)
   # Update with your PostgreSQL credentials
   DATABASE_URL=postgresql://postgres:your_password@localhost:5432/shastra_hub

   # JWT Secrets (REQUIRED)
   # Generate strong secrets (minimum 32 characters each)
   # Use: openssl rand -base64 32
   JWT_SECRET=wfpiUso5GHObAJ/+0ltbMKRlBXGxy5EVQxffWi3TBdo=
   JWT_REFRESH_SECRET=+WJAiiN5agTEZ/EXt2sr8wNkAS2d0wWUvaDib66dZ74=

   # Frontend URL for CORS
   FRONTEND_URL=http://localhost:5173
   ```

   **Generate JWT Secrets:**
   ```bash
   # On Linux/Mac
   openssl rand -base64 32
   
   # On Windows (PowerShell)
   [Convert]::ToBase64String((1..32 | ForEach-Object { Get-Random -Minimum 0 -Maximum 256 }))
   ```

## Frontend Environment Setup

1. **Navigate to frontend directory**
   ```bash
   cd shastra-hub
   ```

2. **Create `.env` file**
   ```bash
   # Windows (PowerShell)
   New-Item .env
   
   # Linux/Mac
   touch .env
   ```

3. **Add the following content:**
   ```env
   VITE_API_URL=http://localhost:3000/api
   ```

## Verification

After creating both `.env` files:

1. **Backend should start without errors**
   ```bash
   cd shastra-hub/backend
   npm run dev
   ```

2. **Frontend should connect to backend**
   ```bash
   cd shastra-hub
   npm run dev
   ```

3. **Check backend health**
   - Visit: http://localhost:3000/health
   - Should return: `{ "status": "ok" }`

## Troubleshooting

### Backend throws "Missing required environment variable" error
- Ensure `.env` file exists in `shastra-hub/backend/`
- Check that all required variables are set
- Verify JWT secrets are at least 32 characters

### Frontend shows "Cannot connect to backend"
- Verify `VITE_API_URL` is set correctly in `shastra-hub/.env`
- Ensure backend is running on port 3000
- Check browser console for detailed error messages

### Database connection fails
- Verify PostgreSQL is running
- Check `DATABASE_URL` format: `postgresql://user:password@host:port/database`
- Test connection: `psql $DATABASE_URL`

