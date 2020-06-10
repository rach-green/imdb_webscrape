//[code language = "javascript"]
var mysql = require('mysql');

var connection = mysql.createPool({
    host: 'localhost',
    user: 'root',
    passsword: 'dalehollow',
    database: 'mydatabase'
});

connection.connect(function(err){
    if(err) throw err;
    console.log("Connected!");
});
