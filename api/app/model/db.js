var mysql = require('mysql');

// var connection = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     password: 'dalehollow',
//     database: 'mydatabase'
// });
var connection = mysql.createConnection({
    host     : process.env.RDS_HOSTNAME,
    user     : process.env.RDS_USERNAME,
    password : process.env.RDS_PASSWORD,
    port     : process.env.RDS_PORT
});

connection.connect(function(err) {
    if (err) throw err;
});

module.exports = connection;

// mysql database url:
// user: b1e0b9a150f461
// :
// pass: 373ee6e9
// @
// host: us-cdbr-east-02.cleardb.com
// /
// database: heroku_3bec028cbf30f77
// ?reconnect=true
