'use strict';

const bouquets = require('../data/bouquets');
const { CATEGORIES } = require('../constants/routes');
const HTTP_STATUS = require('../constants/httpStatus');
const {
  HttpError,
  ctrlWrapper,
  parsePagination,
  applyFilters,
  paginate,
} = require('../helpers');

/**
 * GET /api/bouquets
 * Query: ?page=&limit=&search=&category=
 * Returns a paginated + filtered bouquet list.
 */
const listBouquets = async (req, res) => {
  const { page, limit } = parsePagination(req.query);
  const filtered = applyFilters(bouquets, req.query);
  const payload = paginate(filtered, page, limit);

  res.status(HTTP_STATUS.OK).json(payload);
};

/**
 * GET /api/bouquets/:id
 * Returns a single bouquet or 404.
 */
const getBouquetById = async (req, res) => {
  const id = Number.parseInt(req.params.id, 10);
  const bouquet = bouquets.find((item) => item.id === id);

  if (!bouquet) {
    throw new HttpError(
      HTTP_STATUS.NOT_FOUND,
      `Bouquet with id ${req.params.id} not found`,
    );
  }

  res.status(HTTP_STATUS.OK).json({ data: bouquet });
};

/**
 * GET /api/categories
 * Returns the list of categories used by the filter UI.
 */
const listCategories = async (req, res) => {
  res.status(HTTP_STATUS.OK).json({ data: CATEGORIES });
};

module.exports = {
  listBouquets: ctrlWrapper(listBouquets),
  getBouquetById: ctrlWrapper(getBouquetById),
  listCategories: ctrlWrapper(listCategories),
};
