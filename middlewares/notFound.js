'use strict';

const { HttpError } = require('../helpers');

/**
 * Reached only when no route matched — forwards a 404 to the error handler.
 */
const notFound = (req, res, next) => {
  next(new HttpError(404, `Route not found: ${req.method} ${req.originalUrl}`));
};

module.exports = notFound;
