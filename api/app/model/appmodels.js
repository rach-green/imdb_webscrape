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
                    //console.log("error: ", err);
                    result(null, err);
                }
                else{
                  //console.log('tasks : ', res);

                 result(null, res);
                }
            });
};

Movie.getAllWriters = function (result) {
        console.log("all writers function");
        sql.query("Select writers from movies", function (err, res) {
                if(err) {
                    //console.log("error: ", err);
                    result(null, err);
                }
                else{
                  //console.log('tasks : ', res);

                 result(null, res);
                }
            });
};
Movie.getAllDirectors = function (result) {
        console.log("all director function");
        sql.query("Select directors from movies", function (err, res) {
                if(err) {
                    //console.log("error: ", err);
                    result(null, err);
                }
                else{
                  //console.log('tasks : ', res);

                 result(null, res);
                }
            });
};
Movie.getAllCast = function (result) {
        console.log("all cast function");
        sql.query("Select cast from movies", function (err, res) {
                if(err) {
                    //console.log("error: ", err);
                    result(null, err);
                }
                else{
                  //console.log('tasks : ', res);

                 result(null, res);
                }
            });
};

Movie.getAverage = function (field, json, result) {
        console.log('entered average')
        let data = JSON.parse(json);
        let command = "Select AVG(" + field + ") from movies WHERE "
        if (data["directors"].length != 0){
        command += "("
        for(var i = 0; i < data["directors"].length; i++){
            command+= "directors LIKE '%" + (data["directors"])[i] + "%'" + " OR ";
        }
        command = command.slice(0,-4);
        command += ") AND "
        }
        if (data["cast"].length != 0){
        command += "("
        for(var i = 0; i < data["cast"].length; i++){
        command+= "cast LIKE '%" + (data["cast"])[i] + "%'" + " OR ";
        }
        command = command.slice(0,-4);
        command += ") AND "
        }
        if (data["writers"].length != 0){
        command += "("
        for(var i = 0; i < data["writers"].length; i++){
            command+= "writers LIKE '%" + (data["writers"])[i] + "%'" + " OR ";
        }
        command = command.slice(0,-4);
        command += ") AND "
        }
        if (data["ratings"].length != 0){
        command += "("
        for(var i = 0; i < data["ratings"].length; i++){
            command+= "rating = '" + (data["ratings"])[i] + "' OR ";
        }
        command = command.slice(0,-4);
        command += ") AND "
        }
        if (data["years"].length != 0){
        command += "("
        command+= "year BETWEEN " + (data["years"])[0] + " AND " + (data["years"])[1];
        command += ") AND "
        }
        command = command.slice(0,-5);
        console.log("sql code: ",command);
        sql.query(command, function (err, res) {
                if(err) {
                    console.log("error: ", err);
                    result(null, err);
                }
                else{
                        //console.log('tasks : ', res);
                        result(null, res);
                }
        });
};

Movie.getMoviebyField = function (field, value, result) {
        console.log("field function");
        //console.log("field", field);
        //console.log("id", value);
        let command = "Select * from movies where " + field + " = ?";
        //console.log("sql code",command);
        sql.query(command, [value], function (err, res) {
                if(err) {
                    //console.log("error: ", err);
                    result(null, err);
                }
                else{
                  //console.log('tasks : ', res);
                 result(null, res);
                }
            });
};

Movie.getMoviebyPhrase = function (field, phrase, result) {
        console.log("phrase function");
        let command = "SELECT * FROM movies WHERE " + field + " LIKE '%" + phrase + "%'";
        //console.log("sql code",command);
        sql.query(command, function (err, res) {
                if(err) {
                    //console.log("error: ", err);
                    result(null, err);
                }
                else{
                  //console.log('tasks : ', res);
                 result(null, res);
                }
            });
};

Movie.getMoviebyRange = function (field, value1, value2, result) {
        console.log("range function");
        let command = "SELECT * FROM movies WHERE " + field + " BETWEEN " + value1 + " AND " + value2;
        //console.log("sql code",command);
        sql.query(command, function (err, res) {
                if(err) {
                    //console.log("error: ", err);
                    result(null, err);
                }
                else{
                  //console.log('tasks : ', res);
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
        // //console.log("command before slice", command);
        command = command.slice(0,-5);
        //console.log("sql code",command);
        sql.query(command, function (err, res) {
                if(err) {
                    //console.log("error: ", err);
                    result(null, err);
                }
                else{
                  //console.log('tasks : ', res);
                 result(null, res);
                }
            });
};

Movie.getMoviesbyJson = function (json, result) {
    console.log("allMoviesbyJson function");
    let command = "SELECT * FROM movies WHERE ";
    //data hold json object.
    let data = JSON.parse(json);
    if (data["directors"].length != 0){
    command += "("
    for(var i = 0; i < data["directors"].length; i++){
        command+= "directors LIKE '%" + (data["directors"])[i] + "%'" + " OR ";
    }
    command = command.slice(0,-4);
    command += ") AND "
    }
    if (data["cast"].length != 0){
    command += "("
    for(var i = 0; i < data["cast"].length; i++){
        command+= "cast LIKE '%" + (data["cast"])[i] + "%'" + " OR ";
    }
    command = command.slice(0,-4);
    command += ") AND "
    }
    if (data["writers"].length != 0){
    command += "("
    for(var i = 0; i < data["writers"].length; i++){
        command+= "writers LIKE '%" + (data["writers"])[i] + "%'" + " OR ";
    }
    command = command.slice(0,-4);
    command += ") AND "
    }
    if (data["ratings"].length != 0){
    command += "("
    for(var i = 0; i < data["ratings"].length; i++){
        command+= "rating = '" + (data["ratings"])[i] + "' OR ";
    }
    command = command.slice(0,-4);
    command += ") AND "
    }
    if (data["years"].length != 0){
    command += "("
    command+= "year BETWEEN " + (data["years"])[0] + " AND " + (data["years"])[1];
    command += ") AND "
    }
    command = command.slice(0,-5);
    console.log("sql code: ",command);
    sql.query(command, function (err, res) {
            if(err) {
                console.log("error: ", err);
                result(null, err);
            }
            else{
                    //console.log('tasks : ', res);
                    result(null, res);
            }

        });
};

Movie.getAllAvg = function (json, result) {
    console.log("allAvg function");
    let command = "Select AVG(gross), AVG(critic_score), AVG(year), AVG(budget), AVG(runtime), AVG(rating) FROM movies WHERE ";
    //data hold json object.
    let data = JSON.parse(json);
    if (data["directors"].length != 0){
    command += "("
    for(var i = 0; i < data["directors"].length; i++){
        command+= "directors LIKE '%" + (data["directors"])[i] + "%'" + " OR ";
    }
    command = command.slice(0,-4);
    command += ") AND "
    }
    if (data["cast"].length != 0){
    command += "("
    for(var i = 0; i < data["cast"].length; i++){
        command+= "cast LIKE '%" + (data["cast"])[i] + "%'" + " OR ";
    }
    command = command.slice(0,-4);
    command += ") AND "
    }
    if (data["writers"].length != 0){
    command += "("
    for(var i = 0; i < data["writers"].length; i++){
        command+= "writers LIKE '%" + (data["writers"])[i] + "%'" + " OR ";
    }
    command = command.slice(0,-4);
    command += ") AND "
    }
    if (data["ratings"].length != 0){
    command += "("
    for(var i = 0; i < data["ratings"].length; i++){
        command+= "rating = '" + (data["ratings"])[i] + "' OR ";
    }
    command = command.slice(0,-4);
    command += ") AND "
    }
    if (data["years"].length != 0){
    command += "("
    command+= "year BETWEEN " + (data["years"])[0] + " AND " + (data["years"])[1];
    command += ") AND "
    }
    command = command.slice(0,-5);

    console.log("sql code: ",command);
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

}

Movie.getAvgRating = function (json, result) {
    console.log("avgRating function");
    let command = "Select rating, Count(*) FROM movies WHERE ";
    //data hold json object.
    let data = JSON.parse(json);
    if (data["directors"].length != 0){
    command += "("
    for(var i = 0; i < data["directors"].length; i++){
        command+= "directors LIKE '%" + (data["directors"])[i] + "%'" + " OR ";
    }
    command = command.slice(0,-4);
    command += ") AND "
    }
    if (data["cast"].length != 0){
    command += "("
    for(var i = 0; i < data["cast"].length; i++){
        command+= "cast LIKE '%" + (data["cast"])[i] + "%'" + " OR ";
    }
    command = command.slice(0,-4);
    command += ") AND "
    }
    if (data["writers"].length != 0){
    command += "("
    for(var i = 0; i < data["writers"].length; i++){
        command+= "writers LIKE '%" + (data["writers"])[i] + "%'" + " OR ";
    }
    command = command.slice(0,-4);
    command += ") AND "
    }
    if (data["ratings"].length != 0){
    command += "("
    for(var i = 0; i < data["ratings"].length; i++){
        command+= "rating = '" + (data["ratings"])[i] + "' OR ";
    }
    command = command.slice(0,-4);
    command += ") AND "
    }
    if (data["years"].length != 0){
    command += "("
    command+= "year BETWEEN " + (data["years"])[0] + " AND " + (data["years"])[1];
    command += ") AND "
    }
    command = command.slice(0,-5);
    command += " GROUP BY rating";

    console.log("sql code: ",command);
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
}

module.exports= Movie;
