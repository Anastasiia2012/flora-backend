'use strict';

const app = require('./app');
const { sequelize } = require('./db');
const { port, host } = require('./envConfigs');

(async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connection successful');

    // Sync models (creates tables if they do not exist; safe in dev)
    await sequelize.sync({ alter: true });
    console.log('Models synced');
  } catch (err) {
    console.error('Unable to connect to the database:', err.message);
    process.exit(1);
  }

  const server = app.listen(port, () => {
    console.log(`🌸 Flora backend listening on http://${host}:${port}`);
    console.log(`   Docs:     http://${host}:${port}/api/docs`);
    console.log(`   Health:   http://${host}:${port}/api/health`);
    console.log(`   Bouquets: http://${host}:${port}/api/bouquets`);
  });

  const shutdown = (signal) => {
    console.log(`\n${signal} received — shutting down gracefully...`);
    server.close(() => { console.log('Server closed.'); process.exit(0); });
  };
  process.on('SIGINT',  () => shutdown('SIGINT'));
  process.on('SIGTERM', () => shutdown('SIGTERM'));
})();
