'use strict';
const notFound     = require('./notFound');
const errorHandler = require('./errorHandler');
const validateBody = require('./validateBody');
const upload       = require('./upload');
module.exports = { notFound, errorHandler, validateBody, upload };
