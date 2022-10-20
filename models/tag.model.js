const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Tag = sequelize.define('tags', {
  id: { primaryKey: Boolean, type: DataTypes.INTEGER, autoIncrement: true },
  name: { type: DataTypes.STRING, allowNull: false },
});

module.exports = Tag;
