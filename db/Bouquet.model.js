'use strict';

const { DataTypes } = require('sequelize');
const sequelize = require('./sequelize');

const Bouquet = sequelize.define(
  'Bouquet',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    category: {
      type: DataTypes.ENUM('bestseller', 'wedding', 'seasonal', 'classic'),
      allowNull: false,
    },
    photoURL: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    favorite: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  },
  {
    tableName: 'bouquets',
    timestamps: true,
  },
);

module.exports = Bouquet;
