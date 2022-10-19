const { Sequelize } = require('sequelize');
const sequelize = new Sequelize(
  'express-realworld-clone',
  'postgres',
  'postgres',
  {
    dialect: 'postgres',
    host: 'localhost',
    logging: false,
  }
);

module.exports = sequelize;
