'use strict';

const { defaultPage, defaultLimit, maxLimit } = require('../envConfigs');
const HttpError = require('./HttpError');

/**
 * Parse & validate pagination query params (`page`, `limit`).
 * Falls back to env defaults and clamps `limit` to a safe maximum.
 */
const parsePagination = (query) => {
  // Treat missing params as "use default"; validate anything explicitly sent.
  const page =
    query.page === undefined ? defaultPage : Number.parseInt(query.page, 10);
  let limit =
    query.limit === undefined ? defaultLimit : Number.parseInt(query.limit, 10);

  if (!Number.isInteger(page) || page < 1) {
    throw new HttpError(400, '`page` must be a positive integer');
  }
  if (!Number.isInteger(limit) || limit < 1) {
    throw new HttpError(400, '`limit` must be a positive integer');
  }
  if (limit > maxLimit) limit = maxLimit;

  return { page, limit };
};

/**
 * Apply text search (`search`) and category (`category`) filtering
 * to a list of bouquet records. Pure function — returns a new array.
 */
const applyFilters = (items, query) => {
  let result = items;

  if (query.category) {
    const category = String(query.category).toLowerCase();
    result = result.filter((item) => item.category === category);
  }

  if (query.search) {
    const term = String(query.search).trim().toLowerCase();
    result = result.filter(
      (item) =>
        item.name.toLowerCase().includes(term) ||
        item.description.toLowerCase().includes(term),
    );
  }

  return result;
};

/**
 * Slice a list into a single page and return a structured payload
 * the frontend can consume directly for "Load more" / pagination.
 */
const paginate = (items, page, limit) => {
  const total = items.length;
  const totalPages = Math.max(1, Math.ceil(total / limit));
  const start = (page - 1) * limit;
  const data = items.slice(start, start + limit);

  return {
    data,
    total,
    page,
    perPage: limit,
    totalPages,
    hasMore: page < totalPages,
  };
};

module.exports = { parsePagination, applyFilters, paginate };
