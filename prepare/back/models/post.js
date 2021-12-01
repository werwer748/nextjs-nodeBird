const Sequelize = require('sequelize');

module.exports = class Post extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            content: {
                type: Sequelize.TEXT,
                allowNull: false,
            },
        },{
            sequelize,
            modelName: 'Post',
            tableName: 'posts',
            timestamps: true,
            charset: 'utf8mb4',
            collate: 'utf8mb4_general_ci', // 한글 + 임티 저장
        });
    };

    static associtate(db){
        db.Post.belongsTo(db.User);
        db.Post.belongsToMany(db.Hashtag);
        db.Post.hasMany(db.Comment);
        db.Post.hasMany(db.Image);
        db.Post.belongsToMany(db.User, { through: 'Like', as: 'Likers'});
        db.Post.belongsTo(db.Post, { as: 'Retweet' });
    };
};

/*

CREATE TABLE posts(
    id INT NOT NULL AUTO_INCREMENT,
    content TEXT NOT NULL,
    Retweet INT NULL,
    UserId INT NOT NULL,
    created_at DATETIME NOT NULL DEFAULT now(),
    updated_at DATETIME NULL,
    PRIMARY KEY(id))
    DEFAULT CHARACTER SET = utf8mb4
    DEFAULT COLLATE = utf8mb4_general_ci
    ENGINE = InnoDB;

*/