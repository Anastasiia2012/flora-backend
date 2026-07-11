'use strict';

const express = require('express');

const { bouquetsController } = require('../../controllers');

const bouquetsRouter = express.Router();

// GET /api/bouquets?page=&limit=&search=&category=
bouquetsRouter.get('/', bouquetsController.listBouquets);

// GET /api/bouquets/:id
bouquetsRouter.get('/:id', bouquetsController.getBouquetById);

module.exports = bouquetsRouter;
