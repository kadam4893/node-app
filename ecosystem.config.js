module.exports = {
  apps: [
    {
      name: 'node-base-app',
      script: 'starter.js',
      cwd: '',
      watch: false,
      out_file: 'public/logs/debug/node-debug.log',
      error_file: 'public/logs/debug/node-error.log',
      log_date_format: 'YYYY-MM-DD HH:mm:ss',
      env: {
        PORT: '3000',
        DEBUG: 'api:*',
        NODE_ENV: 'development',
        DB_CLIENT: 'mysql',
        DB_HOST: 'localhost',
        DB_USER: 'root',
        DB_PASS: 'root',
        DB_NAME: 'myapp',
        DB_DEBUG: 1,
      },
    },
  ],
};
