'use strict';
const { HttpError } = require('../helpers');

/**
 * Returns an Express middleware that validates req.body against a Joi schema.
 * On failure, forwards an HttpError(400) with Joi's first message.
 */
const validateBody = (schema) => (req, res, next) => {
  const { error } = schema.validate(req.body, { abortEarly: true });
  if (error) return next(new HttpError(400, error.details[0].message));
  next();
};

module.exports = validateBody;
