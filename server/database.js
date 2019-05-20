let mysql = require('mysql');
let { database } = require('./keys');
let { promisify } = require('util')

let pool = mysql.createPool(database);

pool.getConnection((err,connection) => {
    if (err){
        console.error(err + "connection fail")
    }
    if (connection) connection.release();
    console.log('DB connected');
    return;
});
pool.query = promisify(pool.query);

module.exports = pool 