module.exports = function(app) {
  //two dots means go up a directory. one dot means in this current directory
  var movieList = require('../app/controller/appcontroller');

  // movieList Routes
  app.route('/movies')
    .get(movieList.list_all_movies)
};
