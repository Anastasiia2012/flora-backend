'use strict';

const HTTP_STATUS = require('../constants/httpStatus');
const { HttpError, ctrlWrapper } = require('../helpers');

/**
 * In-memory order store. Resets on server restart — sufficient for the
 * project scope (no database). Each order gets an incrementing id.
 */
const orders = [];
let nextId = 1;

/**
 * POST /api/orders
 * Body: { customerName, customerPhone, customerAddress, customerMessage?, items? }
 * Validates required fields, stores the order, returns it with an id.
 */
const createOrder = async (req, res) => {
  const {
    customerName,
    customerPhone,
    customerAddress,
    customerMessage = '',
    items = [],
  } = req.body || {};

  // Validation of required fields
  const missing = [];
  if (!customerName || !String(customerName).trim()) missing.push('customerName');
  if (!customerPhone || !String(customerPhone).trim()) missing.push('customerPhone');
  if (!customerAddress || !String(customerAddress).trim()) missing.push('customerAddress');

  if (missing.length) {
    throw new HttpError(
      HTTP_STATUS.BAD_REQUEST,
      `Missing required field(s): ${missing.join(', ')}`,
    );
  }

  const order = {
    id: nextId++,
    customerName: String(customerName).trim(),
    customerPhone: String(customerPhone).trim(),
    customerAddress: String(customerAddress).trim(),
    customerMessage: String(customerMessage).trim(),
    items: Array.isArray(items) ? items : [],
    createdAt: new Date().toISOString(),
  };

  orders.push(order);

  res.status(HTTP_STATUS.CREATED).json({
    message: 'Order created successfully',
    data: order,
  });
};

/**
 * GET /api/orders
 * Returns all stored orders (useful for debugging / demo).
 */
const listOrders = async (req, res) => {
  res.status(HTTP_STATUS.OK).json({ data: orders, total: orders.length });
};

module.exports = {
  createOrder: ctrlWrapper(createOrder),
  listOrders: ctrlWrapper(listOrders),
};
