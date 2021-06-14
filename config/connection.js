const Sequelize = require('sequelize');
require('dotenv').config();

if (process.env.JAWSDB_URL) {
    sequelize = new Sequelize(process.env.JAWSDB_URL);
  } else {
    sequelize = new Sequelize(
      process.env.DB_NAME,
      process.env.DB_USER,
      process.env.DB_PASSWORD,
      {
        host: 'localhost',
        dialect: 'mysql',
        logging: false,
        port: 3306
      }
    );
  }

module.exports = sequelize;