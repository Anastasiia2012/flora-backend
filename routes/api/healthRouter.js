'use strict';

const express = require('express');

const { healthController } = require('../../controllers');

const healthRouter = express.Router();

// GET /api/health
healthRouter.get('/', healthController.healthCheck);

module.exports = healthRouter;
