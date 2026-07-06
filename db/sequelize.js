'use strict';

const { Sequelize } = require('sequelize');
const { dbUrl, nodeEnv } = require('../envConfigs');

const isRender = dbUrl.includes('render.com') || dbUrl.includes('onrender.com');

const sequelize = new Sequelize(dbUrl, {
  dialect: 'postgres',
  logging: false,
  dialectOptions:
    nodeEnv === 'production' || isRender
      ? { ssl: { require: true, rejectUnauthorized: false } }
      : {},
});

module.exports = sequelize;
