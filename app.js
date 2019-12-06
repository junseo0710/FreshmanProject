var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var favicon = require('serve-favicon');


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var cfg = require('./cfg/cfg')
var app = express();

if (!cfg) {
  console.error('./cfg/cfg.js file not exists');
  process.exit(1);
}
if(cfg.web.cors) app.use(require('cors')());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'fe', 'dist'))); // added here
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/api', require('./routes/api'));

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
  res.send({ success: false, msg: err.message });
});



//Database

const mongoose = require('mongoose');
const url = 'mongodb+srv://june:123Qwe@cluster0-phzy9.mongodb.net/test'

mongoose.set('useFindAndModify', false);
mongoose.connect(cfg.db.url, (err) => {
  if (err) return console.error(err);
  console.log('mongoose connected');
});
module.exports = app;
