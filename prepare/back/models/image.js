const Sequelize = require('sequelize');

module.exports = class Image extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            src: {
                type: Sequelize.STRING(200),
                allowNull: false,
            }
        },{
            sequelize,
            modelName: 'Image',
            tableName: 'images',
            timestamps: true,
            charset: 'utf8',
            collate: 'utf8_general_ci', // 한글 저장
        });
    }
    
    static associtate(db){
        db.Image.belongsTo(db.Post);
    };
};

/*

CREATE TABLE images(
    id INT NOT NULL AUTO_INCREMENT,
    src VARCHAR(200) NOT NULL,
    PostId INT NOT NULL,
    UNIQUE INDEX src_UNIQUE(src),
    PRIMARY KEY(id))
    DEFAULT CHARACTER SET =  utf8
    DEFAULT COLLATE = utf8_general_ci

*/