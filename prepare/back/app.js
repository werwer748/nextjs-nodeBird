const express = require('express');
const cors = require('cors');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const dotenv =require('dotenv');
const morgan = require('morgan');

const postRouter = require('./routes/post');
const userRouter = require('./routes/user');
const postsRouter = require('./routes/posts');
const { sequelize } = require('./models');
const passportConfig = require('./passport');

dotenv.config();
const app = express();
sequelize.sync({ force: false })
.then(() => {
    console.log('db 연결 성공!');
})
.catch(console.error);
passportConfig();

app.use(morgan('dev'));
app.use(cors({
    origin: true,
    credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(process.env.COOKIE_SECRET)); //쿠키와 세션 브라우져와 서버가 같은 정보를 가지고있어야하기 때문
app.use(session({
    saveUninitialized: false,
    resave: false,
    secret: process.env.COOKIE_SECRET
}));
app.use(passport.initialize());
app.use(passport.session());

app.get('/', (req, res) => {
    res.send('hello express');
});

// app.get('/', (req, res) => {
//     res.send('hello api');
// });

app.use('/post', postRouter);
app.use('/posts', postsRouter);
app.use('/user', userRouter);

app.listen(3065, () => {
    console.log('서버 실행 중!');
});