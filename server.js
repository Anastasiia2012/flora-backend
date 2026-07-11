'use strict';

const app = require('./app');
const { port, host } = require('./envConfigs');

const server = app.listen(port, () => {
  console.log(`🌸 Flora backend listening on http://${host}:${port}`);
  console.log(`   Health:   http://${host}:${port}/api/health`);
  console.log(`   Bouquets: http://${host}:${port}/api/bouquets`);
});

// Graceful shutdown.
const shutdown = (signal) => {
  console.log(`\n${signal} received — shutting down gracefully...`);
  server.close(() => {
    console.log('Server closed.');
    process.exit(0);
  });
};

process.on('SIGINT', () => shutdown('SIGINT'));
process.on('SIGTERM', () => shutdown('SIGTERM'));
