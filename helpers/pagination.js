'use strict';
const { defaultPage, defaultLimit, maxLimit } = require('../envConfigs');
const HttpError = require('./HttpError');

const parsePagination = (query) => {
  const page  = query.page  === undefined ? defaultPage  : Number.parseInt(query.page,  10);
  let   limit = query.limit === undefined ? defaultLimit : Number.parseInt(query.limit, 10);
  if (!Number.isInteger(page)  || page  < 1) throw new HttpError(400, '`page` must be a positive integer');
  if (!Number.isInteger(limit) || limit < 1) throw new HttpError(400, '`limit` must be a positive integer');
  if (limit > maxLimit) limit = maxLimit;
  return { page, limit };
};

module.exports = { parsePagination };
