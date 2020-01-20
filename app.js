var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
let passport = require('passport');
let session = require('express-session');
let flash = require('connect-flash');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const equipmentRouter = require('./routes/equipment');
const jobsRouter = require('./routes/jobs');
const pickupRouter = require('./routes/pickup');
const dashboardRouter = require('./routes/dashboard');
const walkthroughRouter = require('./routes/walkthrough');
const newsRouter = require('./routes/news');

require('./passport_setup')(passport);
require('dotenv').config()

var app = express();

// Set up mongoose connection
const mongoDB = process.env.MONGODB_URI;

mongoose.connect(mongoDB, { useNewUrlParser: true });
mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  secret: process.env.SECRET,
  
  proxy: true,
  resave: true,
  saveUninitialized: true
}));
app.use(flash()); // use connect-flash for flash messages stored in session
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions

// Routers
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/jobs', jobsRouter);
app.use('/equipment', equipmentRouter);
app.use('/pickup', pickupRouter);
app.use('/dashboard', dashboardRouter);
app.use('/walkthrough', walkthroughRouter);
app.use('/news', newsRouter);

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
