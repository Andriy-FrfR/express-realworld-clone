const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const User = require('./user.model');

const Follow = sequelize.define('follows', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  followerUsername: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  followedUsername: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Follow;
