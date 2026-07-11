'use strict';

/**
 * Centralised route segments and known query/filter values.
 * Keeping these here means a path change only happens in one place.
 */
const ROUTES = {
  API_BASE: '/api',
  BOUQUETS: '/bouquets',
  CATEGORIES: '/categories',
  HEALTH: '/health',
  FEEDBACKS: '/feedbacks',
  ORDERS: '/orders',
};

// Categories used by the Flora catalogue (drives the filtering feature).
const CATEGORIES = ['bestseller', 'wedding', 'seasonal', 'classic'];

module.exports = { ROUTES, CATEGORIES };
