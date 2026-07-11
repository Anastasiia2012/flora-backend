'use strict';

const express = require('express');

const { bouquetsController } = require('../../controllers');

const categoriesRouter = express.Router();

// GET /api/categories
categoriesRouter.get('/', bouquetsController.listCategories);

module.exports = categoriesRouter;
