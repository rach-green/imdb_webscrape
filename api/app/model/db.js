var mysql = require('mysql');

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'dalehollow',
    database: 'mydatabase'
});

connection.connect(function(err) {
    if (err) throw err;
});

module.exports = connection;
