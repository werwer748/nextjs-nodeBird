const mysql = require('mysql2');
const dbsecret = require('../config/db');

const pool = mysql.createConnection(
    dbsecret
);
 
const promisePool = pool.promise();

module.exports = promisePool;