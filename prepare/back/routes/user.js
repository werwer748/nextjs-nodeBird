const express = require('express');
const bcrypt = require('bcrypt');
const passport = require('passport');
// const pool = require('../lib/pool');

const { User } = require('../models');

const router = express.Router();

router.post('/login', (req,res,next) => {
    passport.authenticate('local', (err, user, info) => { //서버에러, 성공객체, 인포(클라이언트 에러)
        if(err){
            console.error(err);
            return next(err);
        }
        if(info){
            return res.status(401).send(info.reason);
        }
        return req.login(user, async (loginErr) => {
            if(loginErr){
                console.error(loginErr);
                return next(loginErr);
            }
            return res.status(200).json(user);
        });
    })(req,res,next); //미들웨어 확장 (express 기법)
});

/* sql Ver
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
            const [WithoutPassword] = await pool.query(`
                SELECT id, email, nickname FROM users WHERE users.id=?
            `,[user.id]);
            const [UserPost] = await pool.query(`
                SELECT posts.id as Posts
                FROM users 
                JOIN posts AS Posts ON users.id=posts.UserId
                WHERE users.id=?;
            `,[user.id]);
            const [UserFollower] = await pool.query(`
                SELECT Follow.FollowingId as Followers
                FROM users 
                JOIN Follow ON users.id=Follow.FollowingId
                WHERE users.id=?;
            `,[user.id]);
            const [UserFollowing] = await pool.query(`
                SELECT Follow.FollowerId as Followings
                FROM users 
                JOIN Follow ON users.id=Follow.FollowerId
                WHERE users.id=?;
            `,[user.id]);
            return res.status(200).json({
                id: WithoutPassword[0].id,
                nickname: WithoutPassword[0].nickname,
                Posts: UserPost,
                Followings: UserFollowing,
                Followers: UserFollower,
            });
        })
    })(req,res,next); //미들웨어 확장 (express 기법)
});
*/

router.post('/logout', (req,res) => {
    req.logout();
    req.session.destroy();
    res.send('ok');
});

router.post('/', async (req,res,next) => { // POST   /user/
    try{
        const exUser = await User.findOne({
            where: {
                email: req.body.email,
            }
        });
        if(exUser){
            return res.status(403).send('이미 사용중인 아이디입니다.');
        }
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        await User.create({
            email: req.body.email,
            nickname: req.body.nickname,
            password: hashedPassword,
        });
        res.status(201).send('ok');
    } catch (error) {
        console.error(error);
        next(error); // status 500
    }
});

/*sql Ver
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
*/

module.exports = router;