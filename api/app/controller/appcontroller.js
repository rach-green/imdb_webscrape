//creates a Movie object
var Movie = require('../model/appmodels.js');


exports.list_all_movies = function(req, res) {
  Movie.getAllMovie(function(err, movie) {

    //console.log('controller')
    if (err)
      res.send(err);
      //console.log('res', movie);
    // res.set('Content-Type', 'application/json');
    res.send(movie);
  });
};

exports.list_all_directors = function(req, res) {
  Movie.getAllDirectors(function(err, movie) {

    //console.log('controller')
    if (err)
      res.send(err);
      //console.log('res', movie);
    // res.set('Content-Type', 'application/json');
    res.send(movie);
  });
};
exports.list_all_cast = function(req, res) {
  Movie.getAllCast(function(err, movie) {

    //console.log('controller')
    if (err)
      res.send(err);
      //console.log('res', movie);
    // res.set('Content-Type', 'application/json');
    res.send(movie);
  });
};
exports.list_all_writers = function(req, res) {
  Movie.getAllWriters(function(err, movie) {

    //console.log('controller')
    if (err)
      res.send(err);
      //console.log('res', movie);
    // res.set('Content-Type', 'application/json');
    res.send(movie);
  });
};

exports.list_by_field = function(req, res) {
    //console.log("params", req.params);
  Movie.getMoviebyField(req.params.field, req.params.value, function(err, movie) {
    //console.log('controller')
    if (err)
      res.send(err);
      //console.log('res', movie);
    res.send(movie);
  });
};

exports.list_by_phrase = function(req, res) {
    //console.log("params", req.params);
  Movie.getMoviebyPhrase(req.params.field, req.params.phrase, function(err, movie) {
    //console.log('controller')
    if (err)
      res.send(err);
      //console.log('res', movie);
    res.send(movie);
  });
};

exports.list_by_range = function(req, res) {
    //console.log("params", req.params);
  Movie.getMoviebyRange(req.params.field, req.params.value1, req.params.value2, function(err, movie) {
    //console.log('controller')
    if (err)
      res.send(err);
      //console.log('res', movie);
    res.send(movie);
  });
};

exports.list_by_all = function(req, res) {
    //console.log("params", req.params);
  Movie.getMoviewithAll(req.params.rfield, req.params.value1, req.params.value2, req.params.sfield, req.params.phrase, req.params.vfield, req.params.value, req.params.pfield, req.params.person, function(err, movie) {
    //console.log('controller')
    if (err)
      res.send(err);
      //console.log('res', movie);
    res.send(movie);
  });
};

exports.list_by_json = function(req, res) {
    //console.log("params", req.params);
    console.log("list_by_json json string", req.params.json);
  Movie.getMoviesbyJson(req.params.json, function(err, movie) {
    console.log('controller')
    if (err)
      res.send(err);
      //console.log('res', movie);
    res.send(movie);
  });
};

exports.list_average = function(req, res) {
    //console.log("params", req.params);
    console.log("list_by_json json string", req.params.json);
  Movie.getAverage(req.params.field, req.params.json, function(err, movie) {
    console.log('controller')
    if (err)
      res.send(err);
      //console.log('res', movie);
    res.send(movie);
  });
};

exports.list_all_average = function(req, res) {
    //console.log("params", req.params);
    console.log("list_by_json json string", req.params.json);
  Movie.getAllAvg(req.params.json, function(err, movie) {
    console.log('controller')
    if (err)
      res.send(err);
      console.log('res', movie);
    res.send(movie);
  });
};

exports.list_avg_rating = function(req, res) {
    //console.log("params", req.params);
    console.log("list_avg_rating json string", req.params.json);
  Movie.getAvgRating(req.params.json, function(err, movie) {
    console.log('controller')
    if (err)
      res.send(err);
      console.log('res', movie);
    res.send(movie);
  });
};

exports.list_under_three = function(req, res) {
    //console.log("params", req.params);
    // console.log("list_avg_rating json string", req.params.json);
  Movie.getUnderThree(function(err, movie) {
    console.log('controller')
    if (err)
      res.send(err);
      console.log('res', movie);
    res.send(movie);
  });
};



exports.list_summaries = function(req, res) {
    //console.log("params", req.params);
  Movie.getSummarybyId(req.params.id, function(err, movie) {
    console.log('controller')
    if (err)
      res.send(err);
      console.log('res', movie);
    res.send(movie);
  });
};
