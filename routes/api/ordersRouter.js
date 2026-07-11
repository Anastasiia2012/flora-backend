'use strict';

const express = require('express');
const { ordersController } = require('../../controllers');

const ordersRouter = express.Router();

// POST /api/orders  — create an order
ordersRouter.post('/', ordersController.createOrder);
// GET  /api/orders  — list stored orders (demo/debug)
ordersRouter.get('/', ordersController.listOrders);

module.exports = ordersRouter;
