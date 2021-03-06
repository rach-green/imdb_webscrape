// var createError = require('http-errors');
// var express = require('express');
// var path = require('path');
// var cookieParser = require('cookie-parser');
// var logger = require('morgan');
// var cors = require("cors");
//
// var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');
// var testAPIRouter = require("./routes/testAPI");
//
// var app = express();
//
// // view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');
//
// app.use(cors());
// app.use(logger('dev'));
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));
//
// app.use('/', indexRouter);
// app.use('/users', usersRouter);
// app.use("/testAPI", testAPIRouter);
//
// // catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });
//
// // error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};
//
//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });
//
// module.exports = app;

const express = require('express'),
  path = require('path'),
  app = express(),
  bodyParser = require('body-parser');
  port = process.env.PORT || 9000;


// const mysql = require('mysql');
// connection configurations
// const mc = mysql.createConnection({
//     host: 'us-cdbr-east-02.cleardb.com',
//     user: 'b1e0b9a150f461',
//     password: '373ee6e9',
//     database: 'heroku_3bec028cbf30f77'
// });
//
// // connect to database
// mc.connect();

app.use(express.static(path.join(__dirname, '/build')));
if(process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '/build')));
    app.get('*', (req, res) => {    res.sendfile(path.join(__dirname = '/public/index.html'));  })}

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname+'/public/index.html'));
})

app.listen(port, (req, res) => {
    console.log(`API server started on port: ${port}`);
});

// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());

var routes = require('./api/routes/approutes'); //importing route
routes(app); //register the route
