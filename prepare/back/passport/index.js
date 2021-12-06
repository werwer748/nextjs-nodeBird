const passport = require('passport');
const local = require('./local');
// const pool = require('../lib/pool');
const { User } = require('../models');

module.exports = () => {
    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser(async (id, done) => {
        try{
            const user = await User.findOne({ where: { id }});
            done(null, user);
        } catch (error) {
            console.error(error);
            done(error);
        }
    });

    local();
};
/* sql Ver
module.exports = () => {
    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser(async (id, done) => {
        try{
            const [user] = await pool.query(`
                SELECT * FROM users WHERE id=?
            `,[id]);
            done(null, user[0]);
        } catch (error) {
            console.error(error);
            done(error);
        }
    });

    local();
};
*/