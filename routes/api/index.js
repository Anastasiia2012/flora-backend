'use strict';

const express = require('express');

const { ROUTES } = require('../../constants/routes');
const bouquetsRouter = require('./bouquetsRouter');
const categoriesRouter = require('./categoriesRouter');
const healthRouter = require('./healthRouter');
const feedbacksRouter = require('./feedbacksRouter');
const ordersRouter = require('./ordersRouter');

const apiRouter = express.Router();

// Mount feature routers. Each path segment lives in constants/routes.js.
apiRouter.use(ROUTES.HEALTH, healthRouter);       // /api/health
apiRouter.use(ROUTES.BOUQUETS, bouquetsRouter);   // /api/bouquets
apiRouter.use(ROUTES.CATEGORIES, categoriesRouter); // /api/categories
apiRouter.use(ROUTES.FEEDBACKS, feedbacksRouter); // /api/feedbacks
apiRouter.use(ROUTES.ORDERS, ordersRouter);       // /api/orders

module.exports = apiRouter;
