//creates a Movie object
var Movie = require('../model/appmodels.js');


exports.list_all_movies = function(req, res) {
  Movie.getAllMovie(function(err, movie) {

    console.log('controller')
    if (err)
      res.send(err);
      console.log('res', movie);
    // res.set('Content-Type', 'application/json');
    res.send(movie);
  });
};

exports.list_by_field = function(req, res) {
    console.log("params", req.params);
  Movie.getMoviebyField(req.params.field, req.params.value, function(err, movie) {
    console.log('controller')
    if (err)
      res.send(err);
      console.log('res', movie);
    res.send(movie);
  });
};

exports.list_by_phrase = function(req, res) {
    console.log("params", req.params);
  Movie.getMoviebyPhrase(req.params.field, req.params.phrase, function(err, movie) {
    console.log('controller')
    if (err)
      res.send(err);
      console.log('res', movie);
    res.send(movie);
  });
};

exports.list_by_range = function(req, res) {
    console.log("params", req.params);
  Movie.getMoviebyRange(req.params.field, req.params.value1, req.params.value2, function(err, movie) {
    console.log('controller')
    if (err)
      res.send(err);
      console.log('res', movie);
    res.send(movie);
  });
};
