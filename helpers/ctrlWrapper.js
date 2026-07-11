'use strict';

/**
 * Decorator that wraps an async controller so any thrown/rejected error
 * is forwarded to Express' error-handling middleware via `next`.
 * This removes repetitive try/catch from every controller.
 */
const ctrlWrapper = (controller) => {
  return async (req, res, next) => {
    try {
      await controller(req, res, next);
    } catch (error) {
      next(error);
    }
  };
};

module.exports = ctrlWrapper;
