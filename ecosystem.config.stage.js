module.exports = {
  apps: [
    {
      name: 'node-base-app',
      script: 'index.js',
      ignore_watch: ['.git', 'node_modules', 'docs', 'dist', 'public'],
      out_file: '/dev/null',
      error_file: '/dev/null',
      log_date_format: 'YYYY-MM-DD HH:mm:ss',
      env: {
        PORT: '9000',
        NODE_ENV: 'production',
      },
    },
  ],
};
