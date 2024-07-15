module.exports = {
  apps: [
    {
      name: 'frontend-nextjs',
      script: 'node_modules/next/dist/bin/next',
      args: 'start',
      instances: '5',
      exec_mode: 'cluster',
      autorestart: true,
    },
  ],
};
