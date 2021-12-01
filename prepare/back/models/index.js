const Sequelize = require('sequelize');
const Comment = require('./comment');
const Hashtag = require('./hashtag');
const Image = require('./image');
const Post = require('./post');
const User = require('./user');

const env = process.env.NODE_ENV || 'development';
const config = require('../config/config')[env];
const db = {};

const sequelize = new Sequelize(config.database, config.username, config.password, config);

db.Comment = Comment;
db.Hashtag = Hashtag;
db.Image = Image;
db.Post = Post;
db.User = User;

Object.keys(db).forEach(modelName => {
  // console.log('초기화');
  db[modelName].init(sequelize);
});

Object.keys(db).forEach(modelName => {
  // console.log('관계생성');
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
