var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');


// var index = require('./routes/index');
var api = require('./routes/api');

var app = express();

// uncomment after placing your favicon in /client/public
app.use(favicon(path.join(__dirname, 'client/public/images', 'monitor.png')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());

/* api routes */
app.use('/api', api);

/* Routes for client. */
app.use(express.static(path.join(__dirname, 'client/public')));
app.use('/about', express.static(path.join(__dirname, 'client/public')));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');

    err.status = 404;

    next(err);
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development'
        ? err
        : {};

    /* use clients 404 error page */
    res.status(err.status || 500);
    res.sendFile(__dirname + '/client/public/index.html');
});

module.exports = app;
