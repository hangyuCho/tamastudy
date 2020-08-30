require('dotenv').config();
const {
  DB_USERNAME,
  DB_PASSWORD,
  DB_DBNAME,
  DB_HOST,
  DB_PORT,
} = require('../db-env');

module.exports = {
  development: {
    username: DB_USERNAME,
    password: DB_PASSWORD,
    database: DB_DBNAME,
    host: DB_HOST,
    port: DB_PORT,
    dialect: 'mysql',
    logging: false,
  },
  test: {
    username: DB_USERNAME,
    password: DB_PASSWORD,
    database: DB_DBNAME,
    host: DB_HOST,
    port: DB_PORT,
    dialect: 'mysql',
  },
  production: {
    username: DB_USERNAME,
    password: DB_PASSWORD,
    database: DB_DBNAME,
    host: DB_HOST,
    port: DB_PORT,
    dialect: 'mysql',
  },
};
