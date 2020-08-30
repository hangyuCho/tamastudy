const Sequelize = require('sequelize');
const user = require('./user.model');
const post = require('./post.model');
const comment = require('./comment.model');
const category = require('./category.model');
const notice = require('./notice.model');
const openchat = require('./openchat.model');

const env = process.env.NODE_ENV || 'development';
const config = require('../config/config')[env];
const db = {};

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

db.Openchat = openchat;
db.Notice = notice;
db.Category = category;
db.Comment = comment;
db.Post = post;
db.User = user;

Object.keys(db).forEach((modelName) => {
  db[modelName].init(sequelize);
});

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
