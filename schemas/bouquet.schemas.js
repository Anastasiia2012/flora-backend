'use strict';
const Joi = require('joi');

const CATEGORIES = ['bestseller', 'wedding', 'seasonal', 'classic'];

/** POST /api/bouquets — all required fields */
const createBouquetSchema = Joi.object({
  title:       Joi.string().min(2).max(120).required(),
  description: Joi.string().min(5).max(1000).required(),
  price:       Joi.number().positive().precision(2).required(),
  category:    Joi.string().valid(...CATEGORIES).required(),
  photoURL:    Joi.string().uri().optional(),
  favorite:    Joi.boolean().optional(),
});

/** PUT /api/bouquets/:id — at least one field required, body must not be empty */
const updateBouquetSchema = Joi.object({
  title:       Joi.string().min(2).max(120),
  description: Joi.string().min(5).max(1000),
  price:       Joi.number().positive().precision(2),
  category:    Joi.string().valid(...CATEGORIES),
  photoURL:    Joi.string().uri().optional(),
  favorite:    Joi.boolean(),
}).min(1); // rejects empty body → 400

/** PATCH /api/bouquets/:id/favorite */
const favoriteBouquetSchema = Joi.object({
  favorite: Joi.boolean().required(),
});

module.exports = { createBouquetSchema, updateBouquetSchema, favoriteBouquetSchema };
