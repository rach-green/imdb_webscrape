var mysql = require('mysql');

// var connection = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     password: 'dalehollow',
//     database: 'mydatabase'
// });
var connection = mysql.createConnection({
    host: 'us-cdbr-east-02.cleardb.com',
    user: 'b1e0b9a150f461',
    password: '373ee6e9',
    database: 'heroku_3bec028cbf30f77'
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
