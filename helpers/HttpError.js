'use strict';

/**
 * Operational error with an attached HTTP status code.
 * Thrown inside controllers and caught by the central error middleware.
 */
class HttpError extends Error {
  constructor(status, message) {
    super(message);
    this.status = status;
    this.name = 'HttpError';
  }
}

module.exports = HttpError;
