var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors'); 

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var signInRouter = require('./routes/account/signin');
var signUpRouter = require('./routes/account/signup');
var deleteAccountRouter = require('./routes/account/deleteaccount');
var memberDetailsRouter = require('./routes/account/memberdetails');
var carparkAvailabilityRouter = require('./routes/information/carparkavailability');

var db = require('./src/connection');

var app = express();

app.listen('3000', () => {
  console.log('Server started on port 3000');
})

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.options('*', cors());

// list of paths
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/signin', signInRouter);
app.use('/signup', signUpRouter);
app.use('/deleteaccount', deleteAccountRouter);
app.use('/memberdetails', memberDetailsRouter);
app.use('/carparkavailability', carparkAvailabilityRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
