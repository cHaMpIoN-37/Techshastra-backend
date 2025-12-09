#!/usr/bin/env node

const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');

console.log('🚀 Starting TechShastra Hub - Full Stack...\n');

// Colors for console output
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

// Check if .env files exist
const backendEnv = path.join(__dirname, '../shastra-hub/backend/.env');
const frontendEnv = path.join(__dirname, '../shastra-hub/.env');

if (!fs.existsSync(backendEnv)) {
  log('⚠️  Backend .env not found. Creating from .env.example...', 'yellow');
  const backendEnvExample = path.join(__dirname, '../shastra-hub/backend/.env.example');
  if (fs.existsSync(backendEnvExample)) {
    fs.copyFileSync(backendEnvExample, backendEnv);
    log('✅ Backend .env created. Please update DATABASE_URL!', 'green');
  } else {
    log('❌ Backend .env.example not found!', 'red');
    process.exit(1);
  }
}

if (!fs.existsSync(frontendEnv)) {
  log('⚠️  Frontend .env not found. Creating from .env.example...', 'yellow');
  const frontendEnvExample = path.join(__dirname, '../shastra-hub/.env.example');
  if (fs.existsSync(frontendEnvExample)) {
    fs.copyFileSync(frontendEnvExample, frontendEnv);
    log('✅ Frontend .env created.', 'green');
  } else {
    log('⚠️  Frontend .env.example not found. Creating default...', 'yellow');
    fs.writeFileSync(frontendEnv, 'VITE_API_URL="http://localhost:3000/api"\n');
    log('✅ Frontend .env created with defaults.', 'green');
  }
}

// Check if node_modules exist
const backendNodeModules = path.join(__dirname, '../shastra-hub/backend/node_modules');
const frontendNodeModules = path.join(__dirname, '../shastra-hub/node_modules');

if (!fs.existsSync(backendNodeModules)) {
  log('📦 Installing backend dependencies...', 'cyan');
  const install = spawn('npm', ['install'], {
    cwd: path.join(__dirname, '../shastra-hub/backend'),
    stdio: 'inherit',
    shell: true,
  });
  install.on('close', (code) => {
    if (code !== 0) {
      log('❌ Backend install failed!', 'red');
      process.exit(1);
    }
    startServers();
  });
  return;
}

if (!fs.existsSync(frontendNodeModules)) {
  log('📦 Installing frontend dependencies...', 'cyan');
  const install = spawn('npm', ['install'], {
    cwd: path.join(__dirname, '../shastra-hub'),
    stdio: 'inherit',
    shell: true,
  });
  install.on('close', (code) => {
    if (code !== 0) {
      log('❌ Frontend install failed!', 'red');
      process.exit(1);
    }
    startServers();
  });
  return;
}

startServers();

function startServers() {
  log('\n🎯 Starting all services...\n', 'bright');

  // Check if concurrently is available
  let concurrently;
  try {
    concurrently = require('concurrently');
  } catch (e) {
    // concurrently not installed, install it first
    log('📦 Installing concurrently...', 'cyan');
    const install = spawn('npm', ['install', 'concurrently', '--save-dev'], {
      cwd: path.join(__dirname, '..'),
      stdio: 'inherit',
      shell: true,
    });
    
    install.on('close', (code) => {
      if (code === 0) {
        log('✅ Installed. Restarting...\n', 'green');
        // Reload the script
        delete require.cache[require.resolve('concurrently')];
        startServers();
      } else {
        log('❌ Failed to install concurrently. Starting manually...\n', 'yellow');
        startManual();
      }
    });
    return;
  }

  // Use concurrently to run both servers
  try {
    concurrently([
      {
        name: 'backend',
        command: 'npm run dev',
        cwd: path.join(__dirname, '../shastra-hub/backend'),
        prefixColor: 'blue',
      },
      {
        name: 'frontend',
        command: 'npm run dev',
        cwd: path.join(__dirname, '../shastra-hub'),
        prefixColor: 'green',
      },
    ], {
      prefix: '{name}',
      killOthers: ['failure', 'success'],
      restartTries: 1,
    });
  } catch (error) {
    log('⚠️  Error starting with concurrently. Starting manually...\n', 'yellow');
    startManual();
  }
}

function startManual() {
  log('Starting backend...', 'blue');
  const backend = spawn('npm', ['run', 'dev'], {
    cwd: path.join(__dirname, '../shastra-hub/backend'),
    stdio: 'inherit',
    shell: true,
  });

  // Wait a bit before starting frontend
  setTimeout(() => {
    log('Starting frontend...', 'green');
    const frontend = spawn('npm', ['run', 'dev'], {
      cwd: path.join(__dirname, '../shastra-hub'),
      stdio: 'inherit',
      shell: true,
    });

    process.on('SIGINT', () => {
      log('\n\n🛑 Shutting down...', 'yellow');
      backend.kill();
      frontend.kill();
      process.exit(0);
    });
  }, 1000);
}

