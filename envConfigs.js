'use strict';

require('dotenv').config();

const envConfigs = {
  port:         Number(process.env.PORT)         || 3000,
  host:         process.env.HOST                 || 'localhost',
  nodeEnv:      process.env.NODE_ENV             || 'development',
  corsOrigin:   process.env.CORS_ORIGIN          || '*',
  dbUrl:        process.env.DB_URL               || '',
  baseUrl:      process.env.BASE_URL             || 'http://localhost:3000',
  defaultPage:  Number(process.env.DEFAULT_PAGE) || 1,
  defaultLimit: Number(process.env.DEFAULT_LIMIT) || 6,
  maxLimit:     Number(process.env.MAX_LIMIT)    || 50,
};

module.exports = envConfigs;
