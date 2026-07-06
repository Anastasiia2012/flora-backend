'use strict';
const { nodeEnv } = require('../envConfigs');

// eslint-disable-next-line no-unused-vars
const errorHandler = (err, req, res, next) => {
  const status  = err.status || 500;
  const message = status === 500 ? 'Internal Server Error' : err.message || 'Error';
  if (status === 500) console.error('[ERROR]', err);
  res.status(status).json({
    status: 'error', code: status, message,
    ...(nodeEnv !== 'production' && status === 500 ? { stack: err.stack } : {}),
  });
};
module.exports = errorHandler;
