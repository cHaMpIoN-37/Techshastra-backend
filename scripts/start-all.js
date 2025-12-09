#!/usr/bin/env node

const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');

console.log('🚀 Starting TechShastra Hub - Production Mode...\n');

const concurrentlyPath = path.join(__dirname, '../node_modules/.bin/concurrently');

if (fs.existsSync(concurrentlyPath) || require.resolve('concurrently')) {
  const concurrently = require('concurrently');
  
  concurrently([
    {
      name: 'backend',
      command: 'npm start',
      cwd: path.join(__dirname, '../shastra-hub/backend'),
      prefixColor: 'blue',
    },
    {
      name: 'frontend',
      command: 'npm run preview',
      cwd: path.join(__dirname, '../shastra-hub'),
      prefixColor: 'green',
    },
  ], {
    prefix: '{name}',
    killOthers: ['failure', 'success'],
  });
} else {
  console.log('Installing concurrently...');
  const install = spawn('npm', ['install', 'concurrently', '--save-dev'], {
    cwd: __dirname + '/..',
    stdio: 'inherit',
    shell: true,
  });
  
  install.on('close', () => {
    console.log('Restarting...\n');
    require('./start-all.js');
  });
}

