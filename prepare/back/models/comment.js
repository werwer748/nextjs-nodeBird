const Sequelize = require('sequelize');

module.exports = class Comment extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            content: {
                type: Sequelize.TEXT,
                allowNull: false,
            },
        },{
            sequelize,
            modelName: 'Comment',
            tableName: 'comments',
            timestamps: true,
            charset: 'utf8',
            collate: 'utf8_general_ci', // 한글 저장
        });
    }

    static associtate(db){
        db.Comment.belongsTo(db.User);
        db.Comment.belongsTo(db.Post);
    };
};

/*
CREATE TABLE comments(
    id INT NOT NULL AUTO_INCREMENT,
    content TEXT NOT NULL,
    created_at DATETIME NOT NULL DEFAULT now(),
    updated_at DATETIME NULL,
    UserId INT NOT NULL,
    PostId INT NOT NULL,
    PRIMARY KEY(id))
    DEFAULT CHARACTER SET =  utf8mb4
    DEFAULT COLLATE = utf8mb4_general_ci
    ENGINE = InnoDB;
*/