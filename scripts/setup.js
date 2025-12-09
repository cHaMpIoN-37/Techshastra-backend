#!/usr/bin/env node

const { spawn, exec } = require('child_process');
const path = require('path');
const fs = require('fs');
const { promisify } = require('util');

const execAsync = promisify(exec);

const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  green: '\x1b[32m',
  blue: '\x1b[34m',
  yellow: '\x1b[33m',
  red: '\x1b[31m',
  cyan: '\x1b[36m',
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

async function checkCommand(command) {
  try {
    await execAsync(`where ${command} 2>nul || which ${command} 2>/dev/null`);
    return true;
  } catch {
    return false;
  }
}

async function checkPostgreSQL() {
  const hasPsql = await checkCommand('psql');
  if (hasPsql) {
    log('✅ PostgreSQL (psql) found', 'green');
    return true;
  }

  // Check Windows service
  try {
    const { stdout } = await execAsync('Get-Service postgresql* 2>$null', { shell: 'powershell.exe' });
    if (stdout.trim()) {
      log('✅ PostgreSQL service found', 'green');
      return true;
    }
  } catch {}

  log('⚠️  PostgreSQL not found. Please install PostgreSQL:', 'yellow');
  log('   Windows: https://www.postgresql.org/download/windows/', 'cyan');
  log('   macOS: brew install postgresql@14', 'cyan');
  log('   Linux: sudo apt-get install postgresql', 'cyan');
  return false;
}

async function setupDatabase() {
  log('\n📊 Setting up database...', 'cyan');
  
  const hasPostgres = await checkPostgreSQL();
  if (!hasPostgres) {
    log('⚠️  Skipping database setup. Install PostgreSQL and run: npm run setup:db', 'yellow');
    return;
  }

  // Check if database exists
  try {
    await execAsync('psql -U postgres -lqt 2>nul | findstr /C:"techshastra" || psql -U postgres -lqt 2>/dev/null | grep -q techshastra');
    log('✅ Database "techshastra" already exists', 'green');
  } catch {
    log('📝 Creating database "techshastra"...', 'cyan');
    log('   Please enter postgres password when prompted', 'yellow');
    
    const createDb = spawn('psql', ['-U', 'postgres', '-c', 'CREATE DATABASE techshastra;'], {
      stdio: 'inherit',
      shell: true,
    });

    createDb.on('close', async (code) => {
      if (code === 0) {
        log('✅ Database created!', 'green');
        await runMigrations();
      } else {
        log('⚠️  Could not create database. Please create manually:', 'yellow');
        log('   psql -U postgres', 'cyan');
        log('   CREATE DATABASE techshastra;', 'cyan');
      }
    });
    return;
  }

  await runMigrations();
}

async function runMigrations() {
  log('\n🔄 Running database migrations...', 'cyan');
  
  const migrate = spawn('npm', ['run', 'prisma:migrate'], {
    cwd: path.join(__dirname, '../shastra-hub/backend'),
    stdio: 'inherit',
    shell: true,
  });

  migrate.on('close', (code) => {
    if (code === 0) {
      log('✅ Migrations completed!', 'green');
    } else {
      log('⚠️  Migration failed. Make sure PostgreSQL is running and DATABASE_URL is correct.', 'yellow');
    }
  });
}

async function setup() {
  log('🚀 TechShastra Hub - Complete Setup\n', 'bright');

  // Check Node.js version
  const nodeVersion = process.version;
  log(`📦 Node.js version: ${nodeVersion}`, 'cyan');

  // Create .env files
  log('\n📝 Setting up environment files...', 'cyan');
  
  const backendEnv = path.join(__dirname, '../shastra-hub/backend/.env');
  const backendEnvExample = path.join(__dirname, '../shastra-hub/backend/.env.example');
  if (!fs.existsSync(backendEnv) && fs.existsSync(backendEnvExample)) {
    fs.copyFileSync(backendEnvExample, backendEnv);
    log('✅ Created backend/.env', 'green');
    log('⚠️  Please update DATABASE_URL in backend/.env!', 'yellow');
  }

  const frontendEnv = path.join(__dirname, '../shastra-hub/.env');
  const frontendEnvExample = path.join(__dirname, '../shastra-hub/.env.example');
  if (!fs.existsSync(frontendEnv)) {
    if (fs.existsSync(frontendEnvExample)) {
      fs.copyFileSync(frontendEnvExample, frontendEnv);
    } else {
      fs.writeFileSync(frontendEnv, 'VITE_API_URL="http://localhost:3000/api"\n');
    }
    log('✅ Created frontend/.env', 'green');
  }

  // Install dependencies
  log('\n📦 Installing dependencies...', 'cyan');
  
  if (!fs.existsSync(path.join(__dirname, '../node_modules'))) {
    log('Installing root dependencies...', 'cyan');
    await new Promise((resolve) => {
      const install = spawn('npm', ['install'], {
        cwd: __dirname + '/..',
        stdio: 'inherit',
        shell: true,
      });
      install.on('close', resolve);
    });
  }

  if (!fs.existsSync(path.join(__dirname, '../shastra-hub/backend/node_modules'))) {
    log('Installing backend dependencies...', 'cyan');
    await new Promise((resolve) => {
      const install = spawn('npm', ['install'], {
        cwd: path.join(__dirname, '../shastra-hub/backend'),
        stdio: 'inherit',
        shell: true,
      });
      install.on('close', resolve);
    });
  }

  if (!fs.existsSync(path.join(__dirname, '../shastra-hub/node_modules'))) {
    log('Installing frontend dependencies...', 'cyan');
    await new Promise((resolve) => {
      const install = spawn('npm', ['install'], {
        cwd: path.join(__dirname, '../shastra-hub'),
        stdio: 'inherit',
        shell: true,
      });
      install.on('close', resolve);
    });
  }

  // Generate Prisma client
  log('\n🔧 Generating Prisma client...', 'cyan');
  await new Promise((resolve) => {
    const generate = spawn('npm', ['run', 'prisma:generate'], {
      cwd: path.join(__dirname, '../shastra-hub/backend'),
      stdio: 'inherit',
      shell: true,
    });
    generate.on('close', resolve);
  });

  // Setup database
  await setupDatabase();

  log('\n✅ Setup complete!', 'green');
  log('\n🎯 Next steps:', 'bright');
  log('   1. Update DATABASE_URL in shastra-hub/backend/.env', 'cyan');
  log('   2. Run: npm run dev:all', 'cyan');
  log('\n');
}

setup().catch((error) => {
  log(`\n❌ Setup failed: ${error.message}`, 'red');
  process.exit(1);
});

