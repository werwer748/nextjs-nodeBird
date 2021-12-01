const express = require('express');
const bcrypt = require('bcrypt');
const passport = require('passport');
const pool = require('../lib/pool');

const router = express.Router();

router.post('/login', passport.authenticate('local'), (err, user, info) => { //서버에러, 성공객체, 인포

});

router.post('/', async (req,res,next) => { // POST   /user/
    console.log('요청받음');
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