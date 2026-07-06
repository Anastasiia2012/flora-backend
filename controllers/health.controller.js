'use strict';
const HTTP_STATUS  = require('../constants/httpStatus');
const { ctrlWrapper } = require('../helpers');

const healthCheck = async (req, res) =>
  res.status(HTTP_STATUS.OK).json({ status: 'ok', service: 'flora-backend', timestamp: new Date().toISOString() });

module.exports = { healthCheck: ctrlWrapper(healthCheck) };
