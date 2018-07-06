module.exports = {
  /**
   * Application configuration section
   * http://pm2.keymetrics.io/docs/usage/application-declaration/
   */
  apps: [
    // First application
    {
      name: 'home',
      script: './index.js',
      // cwd: '$HOME/code/websites/web-home',
      env: {
        NODE_ENV: 'development'
      },
      env_production: {
        NODE_ENV: 'production'
      },
      log_date_format: 'YYYY-MM-DD HH:mm:ss',
      error_file: '$HOME/.pm2/logs/home-err.log',
      out_file: '$HOME/.pm2/logs/home-out.log',
    },
  ],

  /**
   * Deployment section
   * http://pm2.keymetrics.io/docs/usage/deployment/
   */
  deploy: {
    production: {
      user: 'zsirfs',
      host: '47.97.112.108',
      ref: 'origin/master',
      repo: 'https://github.com/zsirfs/web-home.git',
      path: '$HOME/websites/',
      'post-deploy': 'npm install && pm2 reload ecosystem.config.js --env production'
    },
  }
}
