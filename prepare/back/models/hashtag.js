const Sequelize = require('sequelize');

module.exports = class Hashtag extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            content: {
                type: Sequelize.STRING(20),
                allowNull: false,
            },
        },{
            sequelize,
            modelName: 'Hashtag',
            tableName: 'hashtags',
            timestamps: true,
            charset: 'utf8',
            collate: 'utf8_general_ci', // 한글 저장
        });
    }

    static associtate(db){
        db.Hashtag.belongsToMany(db.Post, { through: 'PostHashtag' });
    };
};

/*
CREATE TABLE hashtags(
    id INT NOT NULL AUTO_INCREMENT,
    content VARCHAR(20) NOT NULL,
    created_at DATETIME NOT NULL DEFAULT now(),
    PRIMARY KEY(id))
    DEFAULT CHARACTER SET =  utf8
    DEFAULT COLLATE = utf8_general_ci
    ENGINE = InnoDB;
*/