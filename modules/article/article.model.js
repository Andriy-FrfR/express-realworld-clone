const { DataTypes } = require('sequelize');
const sequelize = require('../../config/db');
const User = require('../user/user.model');

const Article = sequelize.define('articles', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  slug: { type: DataTypes.STRING, allowNull: false, unique: true },
  title: { type: DataTypes.STRING, allowNull: false, unique: true },
  description: { type: DataTypes.STRING, allowNull: false },
  body: { type: DataTypes.STRING, allowNull: false },
  tagList: { type: DataTypes.ARRAY(DataTypes.STRING), allowNull: true },
  favoritesCount: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
    allowNull: false,
  },
  author: {
    type: DataTypes.INTEGER,
    references: { model: User, key: 'id' },
    allowNull: false,
  },
});

module.exports = Article;
