'use strict';

const { Sequelize } = require('sequelize');
const { dbUrl, nodeEnv } = require('../envConfigs');

const sequelize = new Sequelize(dbUrl, {
  dialect: 'postgres',
  logging: false,
  dialectOptions:
    nodeEnv === 'production'
      ? { ssl: { require: true, rejectUnauthorized: false } }
      : {},
});

module.exports = sequelize;
