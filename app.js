var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');

//By Apurva
var auth = require('./routes/auth');
var code = require('./routes/code');
var profile = require('./routes/profile');
var users = require('./routes/users');
var assignments=require('./routes/assignments');
var questions=require('./routes/questions');
var courses=require('./routes/courses');
var solutions=require('./routes/solutions');
var mongoose= require('mongoose');


mongoose.connect('mongodb://localhost/test');
var db=mongoose.connection;
db.on('error',console.error.bind(console,'connection-error: '));
db.once('open',function () {
	console.log("connected to db");
});

//models
var Assignment=require('./models/Assignment');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//add bower
app.use('/bower_components',  express.static(__dirname + '/bower_components'));
//add templates for Angular
app.use('/templates',  express.static(__dirname + '/views/templates'));

app.use('/', routes);
app.use('/users', users);

app.use('/auth',auth);
app.use('/code',code);
app.use('/profile',profile);
app.use('/users',users);
app.use('/assignments',assignments);
app.use('/questions',questions);
app.use('/courses',courses);
app.use('/solutions',solutions);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
