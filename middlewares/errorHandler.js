'use strict';

const { nodeEnv } = require('../envConfigs');

/**
 * Central error handler (must be the LAST middleware registered).
 * Returns a consistent JSON error envelope and only leaks the stack
 * outside of production.
 */
// eslint-disable-next-line no-unused-vars
const errorHandler = (err, req, res, next) => {
  const status = err.status || 500;
  const message =
    status === 500 ? 'Internal Server Error' : err.message || 'Error';

  if (status === 500) {
    // Log unexpected errors server-side.
    console.error('[ERROR]', err);
  }

  res.status(status).json({
    status: 'error',
    code: status,
    message,
    ...(nodeEnv !== 'production' && status === 500
      ? { stack: err.stack }
      : {}),
  });
};

module.exports = errorHandler;
