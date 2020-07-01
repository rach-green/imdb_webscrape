module.exports = function(app) {
  //two dots means go up a directory. one dot means in this current directory
  var movieList = require('../app/controller/appcontroller');

  // movieList Routes
  app.route('/allmovies')
    .get(movieList.list_all_movies)

  app.route('/allsummaries/:id')
    .get(movieList.list_summaries)

  app.route('/allmovies/directors')
    .get(movieList.list_all_directors)

  app.route('/allmovies/writers')
    .get(movieList.list_all_writers)

  app.route('/allmovies/cast')
     .get(movieList.list_all_cast)

  app.route('/allmovies/field/:field/:value')
    .get(movieList.list_by_field)

  app.route('/allmovies/phrase/:field/:phrase')
    .get(movieList.list_by_phrase)

  app.route('/allmovies/range/:field/:value1/:value2')
    .get(movieList.list_by_range)

  app.route('/all/:rfield/:value1/:value2/:sfield/:phrase/:vfield/:value/:pfield/:person')
    .get(movieList.list_by_all)

  app.route('/analytics/:json')
    .get(movieList.list_by_json)

  app.route('/analytics/:field/:json')
     .get(movieList.list_average)

  app.route('/avg/:json')
     .get(movieList.list_all_average)

     app.route('/avg/rating/:json')
        .get(movieList.list_avg_rating)

};
