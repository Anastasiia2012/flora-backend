'use strict';

const express = require('express');
const { bouquetsController }    = require('../../controllers');
const { validateBody, upload }  = require('../../middlewares');
const {
  createBouquetSchema,
  updateBouquetSchema,
  favoriteBouquetSchema,
} = require('../../schemas/bouquet.schemas');

const router = express.Router();

// GET  /api/bouquets
router.get('/',    bouquetsController.listBouquets);

// GET  /api/bouquets/:id
router.get('/:id', bouquetsController.getBouquetById);

// POST /api/bouquets
router.post('/',   validateBody(createBouquetSchema), bouquetsController.createBouquet);

// PUT  /api/bouquets/:id
router.put('/:id', validateBody(updateBouquetSchema), bouquetsController.updateBouquet);

// DELETE /api/bouquets/:id
router.delete('/:id', bouquetsController.deleteBouquet);

// PATCH /api/bouquets/:id/favorite
router.patch('/:id/favorite', validateBody(favoriteBouquetSchema), bouquetsController.setFavorite);

// PATCH /api/bouquets/:id/photo  (multipart/form-data, field: photo)
router.patch('/:id/photo', upload.single('photo'), bouquetsController.updatePhoto);

module.exports = router;
