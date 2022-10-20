const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Follow = sequelize.define('follows', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  followerId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  followedId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

module.exports = Follow;
