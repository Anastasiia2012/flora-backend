'use strict';

const express = require('express');
const { feedbacksController } = require('../../controllers');

const feedbacksRouter = express.Router();

// GET /api/feedbacks
feedbacksRouter.get('/', feedbacksController.listFeedbacks);

module.exports = feedbacksRouter;
