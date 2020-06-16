//[code language = "javascript"]
var mysql = require('mysql');

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'dalehollow',
    database: 'mydatabase'
});
// connection.connect(function(err) {
//   if (err) throw err;
//   // connection.query("SELECT * FROM movies WHERE id = '1'", function (err, result) {
//   //   if (err) throw err;
//   //   console.log(result);
//   // });
//   // connection.query("SELECT summary FROM movies WHERE summary LIKE '%violence%'", function (err, result) {
//   //   if (err) throw err;
//   //   console.log(result);
//   // });
//   connection.query("SELECT * FROM movies WHERE summary LIKE '%surviv%'", function (err, result) {
//     if (err) throw err;
//     console.log(result);
//   });
//   // connection.query("SELECT * FROM movies WHERE year BETWEEN 2016 AND 2020", function (err, result) {
//   //   if (err) throw err;
//   //   console.log(result);
//   // });
//   // connection.query("SELECT * FROM movies WHERE rating = 'R' AND year < 1990", function (err, result) {
//   //   if (err) throw err;
//   //   console.log(result);
//   // });
//   // connection.query("SELECT * FROM movies WHERE rating = 'PG'", function (err, result) {
//   //   if (err) throw err;
//   //   console.log(result);
//   // });
//   connection.end();
// });

// function getMovieswithPerson(name){
//     var result = [];
//     var getInformationFromDB = function(callback) {
//     mysql.connection.query('SELECT * FROM role', function(err, res, fields)
//         {
//     if (err)  return callback(err);
//    callback(null, result);
// });
// );
// }

function internal(connection, r, next){
    movies(connection, function(err,res){
        if (err) return next(err);
        console.log(res);
        r.send(res);
    });
}

function movies(connection, callback) {
    connection.query("SELECT * FROM movies WHERE year>2000",
     //use arrow instead of anonymous function
     (err,res) => {
        if (err) throw err;
        connection.end();
        console.log(res)
        return callback(res)
    });
}
internal(connection, )
