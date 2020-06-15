//creates a Movie object
var Movie = require('../model/appmodels.js');


exports.list_all_movies = function(req, res) {
  Movie.getAllMovie(function(err, movie) {

    console.log('controller')
    if (err)
      res.send(err);
      console.log('res', movie);
    res.send(movie);
  });
};
