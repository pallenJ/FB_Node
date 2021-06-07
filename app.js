var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var firebase = require('firebase').default
var config = {
    apiKey: "AIzaSyCEsUYmEz_qu9V8RSLjPKI3ZwRXn1lVKDQ",
    authDomain: "joonmohome.firebaseapp.com",
    databaseURL: "https://joonmohome-default-rtdb.firebaseio.com",
    projectId: "joonmohome",
    storageBucket: "joonmohome.appspot.com",
    messagingSenderId: "407521114451",
    appId: "1:407521114451:web:8e7325fec85349447209a6",
    measurementId: "G-59PZS1P5X9"
  };
firebase.initializeApp(config)
//var serviceAccount = require('./joonmohome-firebase-adminsdk-6gzmi-1bfb4adf29.json')

var indexRouter = require('./routes/index.js');
var usersRouter = require('./routes/users.js');
var articleRouter = require('./routes/article.js');
var log = require('log4js').getLogger();
var app = express();


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
//app.use('/src',express.static(__dirname + "/src"));
app.use('/home', indexRouter);
app.use('/users', usersRouter);
app.use('/article', articleRouter);
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
// admin.initializeApp({
//     credential:admin.credential.cert(serviceAccount),
//     databaseURL:"https://joonmohome-default-rtdb.firebaseio.com"
// });

module.exports = app;