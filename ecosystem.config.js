module.exports = {
  /**
   * Application configuration section
   * http://pm2.keymetrics.io/docs/usage/application-declaration/
   */
  apps: [
    // First application
    {
      name: 'home',
      script: 'index.js',
      cwd: '$HOME/code/web-home',
      env: {
        NODE_ENV: 'development'
      },
      env_production: {
        NODE_ENV: 'production'
      },
      log_date_format: 'YYYY-MM-DD HH:mm:ss',
      error: '/home/zsirfs/.pm2/logs/home-err.log',
      out: '/home/zsirfs/.pm2/logs/home-out.log',
      kill_timeout: 1600,
      wait_ready: true,
      listen_timeout: 3000
    }
  ],

  /**
   * Deployment section
   * http://pm2.keymetrics.io/docs/usage/deployment/
   */
  deploy: {
    production: {
      ssh_options: 'StrictHostKeyChecking=no',
      user: 'zsirfs',
      host: '47.97.112.108',
      ref: 'origin/master',
      repo: 'https://github.com/zsirfs/web-home.git',
      path: '/home/zsirfs/websites/websites/',
      'post-setup': 'ls -la',
      'post-deploy': 'npm install && pm2 reload ecosystem.config.js --env production'
    }
  }
}
