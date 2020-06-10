//[code language = "javascript"]
var mysql = require('mysql');

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    passsword: 'dalehollow'
    // database: 'mydatabase'
});

connection.connect(function(err) {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }
  console.log('connected as id ' + connection.threadId);
 });

// connection.connect(function(err){
//     if (err) throw err;
//     console.log("Connected!");
// });
//module.exports = connection;
