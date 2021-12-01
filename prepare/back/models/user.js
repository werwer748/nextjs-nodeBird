const Sequelize = require('sequelize');

module.exports = class User extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            // id 기본적용
            email: {
                type: Sequelize.STRING(30),
                allowNull: false, // false: 필수, true: ㄴㄴ
                unique: true,
            },
            nickname: {
                type: Sequelize.STRING(30),
                allowNull: false,
            },
            password: {
                type: Sequelize.STRING(100),
                allowNull: false,
            },
        },{
            sequelize,
            modelName: 'User',
            tableName: 'users',
            timestamps: true,
            charset: 'utf8',
            collate: 'utf8_general_ci', // 한글 저장
        });
    };

    static associtate(db){
        db.User.hasMany(db.Post);
        db.User.hasMany(db.Comment);
        db.User.belongsToMany(db.Post, { through: 'Like', as: 'Liked' }); //다대다 관계시 테이블 명
        db.User.belongsToMany(db.User, { through: 'Follow', as: 'Followers', foreignKey: 'followingId'}); //같은 테이블 내에서 관계 설정
        db.User.belongsToMany(db.User, { through: 'Follow', as: 'Followings', foreignKey: 'followerId'});
    };
};

/*

CREATE TABLE users(
    id INT NOT NULL AUTO_INCREMENT,
    email VARCHAR(30) NOT NULL,
    nickname VARCHAR(30) NOT NULL,
    password VARCHAR(100) NOT NULL,
    create_at DATETIME NOT NULL DEFAULT now(),
    PRIMARY KEY(id))
    DEFAULT CHARACTER SET =  utf8
    DEFAULT COLLATE = utf8_general_ci
    ENGINE = InnoDB;
*/