const dotenv = require('dotenv');

dotenv.config();

module.exports = {
    "host": "localhost",
    "user": "root",
    "password": process.env.DB_PASSWORD,
    "database": "react-nodebird"
}