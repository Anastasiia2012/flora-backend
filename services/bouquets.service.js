'use strict';

const fs      = require('fs/promises');
const path    = require('path');
const { v4: uuidv4 } = require('uuid');
const gravatar = require('gravatar');

const { Bouquet }    = require('../db');
const { HttpError }  = require('../helpers');
const { parsePagination } = require('../helpers');
const HTTP_STATUS    = require('../constants/httpStatus');
const { baseUrl }    = require('../envConfigs');

const PHOTOS_DIR = path.join(__dirname, '..', 'public', 'photos');

/* ─── Helpers ─────────────────────────────────────────────── */
const notFound = (id) => new HttpError(HTTP_STATUS.NOT_FOUND, `Bouquet with id ${id} not found`);

/* ─── READ ────────────────────────────────────────────────── */
const listBouquets = async (query) => {
  const { page, limit } = parsePagination(query);
  const where = {};
  if (query.category) where.category = query.category;

  const searchCols = [];
  if (query.search) {
    const { Op } = require('sequelize');
    const term = `%${query.search}%`;
    searchCols.push({
      [Op.or]: [
        { title:       { [Op.iLike]: term } },
        { description: { [Op.iLike]: term } },
      ],
    });
    Object.assign(where, ...searchCols);
  }

  const offset = (page - 1) * limit;
  const { count, rows } = await Bouquet.findAndCountAll({
    where, limit, offset, order: [['createdAt', 'DESC']],
  });

  return {
    data:       rows,
    total:      count,
    page,
    perPage:    limit,
    totalPages: Math.max(1, Math.ceil(count / limit)),
    hasMore:    page < Math.ceil(count / limit),
  };
};

const getBouquetById = async (id) => {
  const bouquet = await Bouquet.findByPk(id);
  if (!bouquet) throw notFound(id);
  return bouquet;
};

/* ─── CREATE ──────────────────────────────────────────────── */
const createBouquet = async (body) => {
  // Generate a gravatar URL as placeholder photo if not provided
  if (!body.photoURL) {
    body.photoURL = gravatar.url(
      `${body.title}@flora.local`,
      { s: '600', d: 'identicon', r: 'pg' },
      true,
    );
  }
  return Bouquet.create(body);
};

/* ─── UPDATE ──────────────────────────────────────────────── */
const updateBouquet = async (id, body) => {
  const bouquet = await Bouquet.findByPk(id);
  if (!bouquet) throw notFound(id);
  return bouquet.update(body);
};

/* ─── DELETE ──────────────────────────────────────────────── */
const deleteBouquet = async (id) => {
  const bouquet = await Bouquet.findByPk(id);
  if (!bouquet) throw notFound(id);
  await bouquet.destroy();
  return { message: 'Bouquet deleted' };
};

/* ─── PATCH favorite ──────────────────────────────────────── */
const setFavorite = async (id, favorite) => {
  const bouquet = await Bouquet.findByPk(id);
  if (!bouquet) throw notFound(id);
  return bouquet.update({ favorite });
};

/* ─── PATCH photo ─────────────────────────────────────────── */
const updatePhoto = async (id, file) => {
  if (!file) throw new HttpError(HTTP_STATUS.BAD_REQUEST, 'Photo file is required');

  const bouquet = await Bouquet.findByPk(id);
  if (!bouquet) throw notFound(id);

  const ext      = path.extname(file.originalname);
  const filename = `${uuidv4()}${ext}`;
  const destPath = path.join(PHOTOS_DIR, filename);

  await fs.rename(file.path, destPath);

  const photoURL = `${baseUrl}/photos/${filename}`;
  await bouquet.update({ photoURL });
  return bouquet;
};

module.exports = {
  listBouquets, getBouquetById,
  createBouquet, updateBouquet, deleteBouquet,
  setFavorite, updatePhoto,
};
