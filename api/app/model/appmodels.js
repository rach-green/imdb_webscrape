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
        console.log("all table function");
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
Movie.getAllDirectors = function (result) {
        console.log("all table function");
        sql.query("Select directors from movies", function (err, res) {
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
        console.log("field function");
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
        console.log("phrase function");
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

Movie.getMoviebyRange = function (field, value1, value2, result) {
        console.log("range function");
        let command = "SELECT * FROM movies WHERE " + field + " BETWEEN " + value1 + " AND " + value2;
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

Movie.getMoviewithAll = function (rfield, value1, value2, sfield, phrase, vfield, value, pfield, person, result) {
        let command = "SELECT * FROM movies WHERE ";
        if (rfield != 0){
            command += rfield + " BETWEEN " + value1 + " AND " + value2 + " AND ";
        }
        if (sfield != 0){
            command += sfield + " LIKE '%" + phrase + "%'" + " AND ";
        }
        if (pfield !=0){
            command += pfield + " LIKE '%" + person + "%'" + " AND ";
        }
        //rethink to include 0
        if (vfield != 0){
            command += vfield + " = '" + value + "' AND ";
        }
        // console.log("command before slice", command);
        command = command.slice(0,-5);
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
