// PM2 Ecosystem Configuration
// Alternative to Docker - run with: pm2 start ecosystem.config.js

module.exports = {
  apps: [
    {
      name: 'bmad-workspace',
      script: 'node_modules/next/dist/bin/next',
      args: 'start',
      cwd: '/var/www/bmad-workspace',
      instances: 'max', // Use all available CPU cores
      exec_mode: 'cluster',
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      env: {
        NODE_ENV: 'production',
        PORT: 3000,
      },
      env_production: {
        NODE_ENV: 'production',
        PORT: 3000,
      },
      // Logging
      log_file: '/var/log/bmad/combined.log',
      out_file: '/var/log/bmad/out.log',
      error_file: '/var/log/bmad/error.log',
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
      // Graceful restart
      kill_timeout: 5000,
      wait_ready: true,
      listen_timeout: 10000,
    },
  ],
};
