//[code language = "javascript"]
var mysql = require('mysql');

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'dalehollow',
    database: 'mydatabase'
});
//worked
// connection.connect(function(err) {
//   if (err) {
//     console.error('error connecting: ' + err.stack);
//     return;
//   }
//   console.log('connected as id ' + connection.threadId);
//  });
connection.connect(function(err) {
  if (err) throw err;
  connection.query("SELECT * FROM movies WHERE id = '1'", function (err, result) {
    if (err) throw err;
    console.log(result);
  });
  connection.query("SELECT summary FROM movies summary LIKE '%violence%'", function (err, result) {
    if (err) throw err;
    console.log(result);
  });)
});
