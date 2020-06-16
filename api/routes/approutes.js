module.exports = function(app) {
  //two dots means go up a directory. one dot means in this current directory
  var movieList = require('../app/controller/appcontroller');

  // movieList Routes
  app.route('/allmovies')
    .get(movieList.list_all_movies)

  app.route('/allmovies/field/:field/:value')
    .get(movieList.list_by_field)

  app.route('/allmovies/phrase/:field/:phrase')
    .get(movieList.list_by_phrase)

};
