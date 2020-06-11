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
  // connection.query("SELECT * FROM movies WHERE id = '1'", function (err, result) {
  //   if (err) throw err;
  //   console.log(result);
  // });
  // connection.query("SELECT summary FROM movies WHERE summary LIKE '%violence%'", function (err, result) {
  //   if (err) throw err;
  //   console.log(result);
  // });
  // connection.query("SELECT * FROM movies WHERE year BETWEEN 2016 AND 2020", function (err, result) {
  //   if (err) throw err;
  //   console.log(result);
  // });
  // connection.query("SELECT * FROM movies WHERE rating = 'R' AND year < 1990", function (err, result) {
  //   if (err) throw err;
  //   console.log(result);
  // });
  connection.query("SELECT * FROM movies WHERE rating = 'PG' AND summary LIKE '%spirits%'", function (err, result) {
    if (err) throw err;
    console.log(result);
  });
  connection.end();
});
