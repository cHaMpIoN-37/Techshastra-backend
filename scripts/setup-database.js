#!/usr/bin/env node

const { spawn, exec } = require('child_process');
const { promisify } = require('util');
const path = require('path');
const fs = require('fs');

const execAsync = promisify(exec);

const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  red: '\x1b[31m',
  cyan: '\x1b[36m',
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

async function checkPostgreSQLRunning() {
  try {
    // Windows
    const { stdout } = await execAsync('Get-Service postgresql* | Where-Object {$_.Status -eq "Running"}', {
      shell: 'powershell.exe',
    });
    if (stdout.trim()) {
      return true;
    }
  } catch {}

  try {
    // Unix-like
    await execAsync('pg_isready -h localhost -p 5432');
    return true;
  } catch {}

  return false;
}

async function startPostgreSQL() {
  log('🔄 Starting PostgreSQL...', 'cyan');
  
  try {
    // Windows
    await execAsync('net start postgresql-x64-14', { shell: 'powershell.exe' });
    log('✅ PostgreSQL started', 'green');
    return true;
  } catch {
    try {
      // Try other common versions
      for (const version of ['15', '16', '13', '12']) {
        try {
          await execAsync(`net start postgresql-x64-${version}`, { shell: 'powershell.exe' });
          log('✅ PostgreSQL started', 'green');
          return true;
        } catch {}
      }
    } catch {}
  }

  log('⚠️  Could not start PostgreSQL automatically', 'yellow');
  log('   Please start it manually:', 'cyan');
  log('   Windows: net start postgresql-x64-14', 'cyan');
  log('   macOS: brew services start postgresql@14', 'cyan');
  log('   Linux: sudo systemctl start postgresql', 'cyan');
  return false;
}

async function createDatabase() {
  log('📝 Creating database...', 'cyan');
  
  return new Promise((resolve) => {
    const psql = spawn('psql', ['-U', 'postgres', '-c', 'CREATE DATABASE techshastra;'], {
      stdio: 'inherit',
      shell: true,
    });

    psql.on('close', (code) => {
      if (code === 0) {
        log('✅ Database created!', 'green');
        resolve(true);
      } else {
        log('⚠️  Could not create database. It may already exist.', 'yellow');
        resolve(false);
      }
    });
  });
}

async function runMigrations() {
  log('🔄 Running migrations...', 'cyan');
  
  return new Promise((resolve) => {
    const migrate = spawn('npm', ['run', 'prisma:migrate'], {
      cwd: path.join(__dirname, '../shastra-hub/backend'),
      stdio: 'inherit',
      shell: true,
    });

    migrate.on('close', (code) => {
      if (code === 0) {
        log('✅ Migrations completed!', 'green');
        resolve(true);
      } else {
        log('❌ Migration failed', 'red');
        resolve(false);
      }
    });
  });
}

async function setup() {
  log('📊 Database Setup\n', 'cyan');

  const isRunning = await checkPostgreSQLRunning();
  if (!isRunning) {
    const started = await startPostgreSQL();
    if (!started) {
      log('\n⚠️  Please start PostgreSQL and run this script again', 'yellow');
      process.exit(1);
    }
    
    // Wait a bit for PostgreSQL to be ready
    await new Promise(resolve => setTimeout(resolve, 2000));
  } else {
    log('✅ PostgreSQL is running', 'green');
  }

  await createDatabase();
  await runMigrations();

  log('\n✅ Database setup complete!', 'green');
}

setup().catch((error) => {
  log(`\n❌ Setup failed: ${error.message}`, 'red');
  process.exit(1);
});

