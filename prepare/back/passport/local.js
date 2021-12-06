const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

// const pool = require('../lib/pool');
const { User } = require('../models');

module.exports = () => {
    passport.use(new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
    }, async (email, password, done) => {
        try{
            const user = await User.findOne({
                where: { email }
            });
            if(!user){
                return done(null, false, { reason: '존재하지 않는 사용자입니다!' }); //서버에러, 성공, 클라이언트에러 순서 기억하기
            }
            const result = await bcrypt.compare(password, user.password);
            if(result){
                return done(null, user);
            }
            return done(null, false, { reason: '비밀번호가 틀렸습니다.' });
        } catch (error) {
            console.error(error);
            return done(error);
        }
    }));
};

/* sql Ver
module.exports = () => {
    passport.use(new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
    }, async (email, password, done) => {
        try{
            const [user] = await pool.query(`
                SELECT * FROM users WHERE email=?
            `,[email])
            if(user.length !== 1){
                return done(null, false, { reason: '존재하지 않는 사용자입니다!' }); //서버에러, 성공, 클라이언트에러 순서 기억하기
            }
            const result = await bcrypt.compare(password, user[0].password);
            if(result){
                return done(null, user[0]);
            }
            return done(null, false, { reason: '비밀번호가 틀렸습니다.' });
        } catch (error) {
            console.error(error);
            return done(error);
        }
    }));
};
*/