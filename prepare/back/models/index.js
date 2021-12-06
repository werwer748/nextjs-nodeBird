const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require('../config/config')[env];

const comment = require('./comment');
const hashtag = require('./hashtag');
const image = require('./image');
const post = require('./post');
const user = require('./user');

const db = {};

const sequelize = new Sequelize(config.database, config.username, config.password, config);

db.sequelize = sequelize;

db.Comment = comment;
db.Hashtag = hashtag;
db.Image = image;
db.Post = post;
db.User = user;

comment.init(sequelize);
hashtag.init(sequelize);
image.init(sequelize);
post.init(sequelize);
user.init(sequelize);

comment.associtate(db);
hashtag.associtate(db);
image.associtate(db);
post.associtate(db);
user.associtate(db);



module.exports = db;