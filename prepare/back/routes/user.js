const express = require('express');
const bcrypt = require('bcrypt');
const passport = require('passport');
const pool = require('../lib/pool');

const router = express.Router();

router.post('/login', (req,res,next) => {
    passport.authenticate('local', (err, user, info) => { //서버에러, 성공객체, 인포
        if(err){
            console.error(err);
            return next(err);
        }
        if(info){
            return res.status(401).send(info.reason);
        }
        return req.login(user, async (loginErr) => {
            if(loginErr) { //passport 로그인 에러
                console.error(loginErr);
                return next(loginErr);
            }
            console.log(user);
            const [WithoutPassword] = await pool.query(`
                SELECT id, email, nickname FROM users WHERE users.id=?
            `,[user.id]);
            const [UserPost] = await pool.query(`
                SELECT * FROM react_nodebird.users RIGHT JOIN react_nodebird.posts ON users.id=posts.UserId WHERE users.id=?;
            `,[user.id]);
            return res.status(200).json({
                id: WithoutPassword[0].id,
                nickname: WithoutPassword[0].nickname,
                Posts: UserPost,
                Followings: [],
                Followers: [],
            });
        })
    })(req,res,next); //미들웨어 확장 (express 기법)
});

router.post('/logout', (req,res) => {
    req.logout();
    req.session.destroy();
    res.send('ok');
});

router.post('/', async (req,res,next) => { // POST   /user/
    try{
        const { email, nickname, password } = req.body;
        const [exUser] = await pool.query(`
        SELECT * FROM users WHERE email=?
        `, [email]);
        if(exUser.length > 0){
            return res.status(403).send('이미 사용 중인 아이디입니다.');
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        await pool.query(`
            INSERT INTO users (email, nickname, password) VALUE(?,?,?)`,
            [email, nickname, hashedPassword],
        );
        res.status(201).send('ok');
    } catch (error) {
        console.error(error);
        next(error);
    }
});

module.exports = router;