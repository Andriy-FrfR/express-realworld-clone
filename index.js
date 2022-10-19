require('dotenv').config();
const sequelize = require('./config/db');
const app = require('./app');

const PORT = process.env.PORT || 3000;

const start = async () => {
  try {
    await sequelize.sync({ alter: true });
    app.listen(PORT, () => {
      console.log(`Server is listening on port ${PORT}`);
    });
  } catch (e) {
    console.error(e);
  }
};

start();
