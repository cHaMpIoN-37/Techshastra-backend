# Database Setup Guide

## PostgreSQL Setup

### 1. Install PostgreSQL

**Windows:**
- Download from https://www.postgresql.org/download/windows/
- Run the installer and follow the setup wizard
- Remember your postgres user password

**macOS:**
```bash
brew install postgresql@14
brew services start postgresql@14
```

**Linux (Ubuntu/Debian):**
```bash
sudo apt-get update
sudo apt-get install postgresql postgresql-contrib
sudo systemctl start postgresql
```

### 2. Create Database

**Option A: Using psql (Command Line)**

**Important:** SQL commands must be run INSIDE psql, not in bash!

```bash
# Step 1: Connect to PostgreSQL
psql -U postgres
# (You'll be prompted for password)

# Step 2: Now you're inside psql (prompt changes to: postgres=#)
# Run SQL commands here:
CREATE DATABASE techshastra;

# Optional: Create a user
CREATE USER techshastra_user WITH PASSWORD 'your_password';
GRANT ALL PRIVILEGES ON DATABASE techshastra TO techshastra_user;

# Step 3: Exit psql
\q
```

**If psql command not found:**
- PostgreSQL not installed - Install it first
- Or use full path: `"C:\Program Files\PostgreSQL\14\bin\psql.exe" -U postgres`
- Or add PostgreSQL bin directory to your PATH

**Option B: Using pgAdmin (GUI)**
1. Open pgAdmin
2. Right-click on "Databases" → "Create" → "Database"
3. Name: `techshastra`
4. Click "Save"

### 3. Update .env File

Edit `shastra-hub/backend/.env`:

```env
DATABASE_URL="postgresql://postgres:your_password@localhost:5432/techshastra?schema=public"
```

**Format:**
```
postgresql://[username]:[password]@[host]:[port]/[database]?schema=public
```

### 4. Test Connection

```bash
cd shastra-hub/backend
npm run prisma:migrate
```

If successful, you'll see:
```
✔ Applied migration
```

### 5. Common Issues

**Issue: "Can't reach database server at localhost:5432"**

**Solutions:**
1. **Check if PostgreSQL is running:**
   ```bash
   # Windows (PowerShell)
   Get-Service postgresql*
   
   # macOS/Linux
   sudo systemctl status postgresql
   # or
   brew services list
   ```

2. **Start PostgreSQL:**
   ```bash
   # Windows
   net start postgresql-x64-14  # Replace with your version
   
   # macOS
   brew services start postgresql@14
   
   # Linux
   sudo systemctl start postgresql
   ```

3. **Check port:**
   - Default PostgreSQL port is 5432
   - If using a different port, update DATABASE_URL

4. **Check firewall:**
   - Ensure port 5432 is not blocked

5. **Verify credentials:**
   - Double-check username and password in DATABASE_URL
   - Test connection with: `psql -U postgres -h localhost`

**Issue: "Database does not exist"**

Create the database:
```sql
CREATE DATABASE techshastra;
```

**Issue: "Authentication failed"**

- Verify username and password
- Check `pg_hba.conf` for authentication settings
- Try using `postgres` user initially

### 6. Alternative: Use Docker

If you prefer Docker:

```bash
# Run PostgreSQL in Docker
docker run --name techshastra-db \
  -e POSTGRES_PASSWORD=your_password \
  -e POSTGRES_DB=techshastra \
  -p 5432:5432 \
  -d postgres:14

# Update .env
DATABASE_URL="postgresql://postgres:your_password@localhost:5432/techshastra?schema=public"
```

### 7. Verify Setup

After successful migration:

```bash
# Open Prisma Studio to view database
cd shastra-hub/backend
npm run prisma:studio
```

This opens a GUI at http://localhost:5555 to browse your database.

---

**Need Help?**
- Check PostgreSQL logs for detailed error messages
- Verify your DATABASE_URL format
- Ensure PostgreSQL service is running
- Check network/firewall settings

