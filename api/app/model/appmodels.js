var sql = require('./db.js');

//Task object constructor
var Movie = function(movie){
    this.year = movie.year;
    this.title = movie.title
    this.summary = movie.summary
    this.people = movie.people
    this.rating = movie.rating
};
//gives list of dictionaries for all movies in the DB
Movie.getAllMovie = function (result) {
        sql.query("Select * from movies", function (err, res) {
                if(err) {
                    console.log("error: ", err);
                    result(null, err);
                }
                else{
                  console.log('tasks : ', res);

                 result(null, res);
                }
            });
};

Movie.getMoviebyField = function (field, value, result) {
        console.log("field", field);
        console.log("id", value);
        let command = "Select * from movies where " + field + " = ?";
        console.log("sql code",command);
        sql.query(command, [value], function (err, res) {
                if(err) {
                    console.log("error: ", err);
                    result(null, err);
                }
                else{
                  console.log('tasks : ', res);
                 result(null, res);
                }
            });
};

Movie.getMoviebyPhrase = function (field, phrase, result) {
        let command = "SELECT * FROM movies WHERE " + field + " LIKE '%" + phrase + "%'";
        console.log("sql code",command);
        sql.query(command, function (err, res) {
                if(err) {
                    console.log("error: ", err);
                    result(null, err);
                }
                else{
                  console.log('tasks : ', res);
                 result(null, res);
                }
            });
};





module.exports= Movie;
