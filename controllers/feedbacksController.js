'use strict';

const feedbacks = require('../data/feedbacks');
const HTTP_STATUS = require('../constants/httpStatus');
const { ctrlWrapper } = require('../helpers');

/**
 * GET /api/feedbacks
 * Returns all customer feedback.
 */
const listFeedbacks = async (req, res) => {
  res.status(HTTP_STATUS.OK).json({ data: feedbacks, total: feedbacks.length });
};

module.exports = {
  listFeedbacks: ctrlWrapper(listFeedbacks),
};
