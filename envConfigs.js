'use strict';

require('dotenv').config();

/**
 * Centralised environment configuration.
 * Every other module reads its settings from here instead of touching
 * `process.env` directly — this keeps defaults in one place and makes
 * the rest of the codebase easy to test.
 */
const envConfigs = {
  port: Number(process.env.PORT) || 3000,
  host: process.env.HOST || 'localhost',
  nodeEnv: process.env.NODE_ENV || 'development',

  // Comma-separated list of allowed origins for CORS.
  // Use "*" (default) to allow any origin during development.
  corsOrigin: process.env.CORS_ORIGIN || '*',

  // Default pagination values (can be overridden per request via query).
  defaultPage: Number(process.env.DEFAULT_PAGE) || 1,
  defaultLimit: Number(process.env.DEFAULT_LIMIT) || 8,
  maxLimit: Number(process.env.MAX_LIMIT) || 50,
};

module.exports = envConfigs;
