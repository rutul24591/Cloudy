var express = require('express'),
    path = require('path'),
    favicon = require('serve-favicon'),
    logger = require('morgan'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
    session = require('express-session'),
    http = require('http'),
    https = require('https'),
    passport = require('passport');
//initialize mongoose schemas
    require('./models/userModel');
//var router = express.Router();
//var index = require('./routes/index');
var api = require('./routes/api');
//var authenticate = require('./routes/authenticate')(passport);
//var mongoose = require('mongoose');                         //add for Mongo support
//mongoose.connect('mongodb://localhost/cloudy');         
     //connect to Mongo
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(session({
  secret: 'keyboard cat'
}));


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public/Landing')));
//app.use(passport.initialize());
//app.use(passport.session());

//app.use('/',router);
//app.use('/', index);
//app.use('/auth', authenticate);
app.use('/api', api);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

//// Initialize Passport
//var initPassport = require('./passport-init');
//initPassport(passport);

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

server = http.createServer(app);
var ip = process.env.OPENSHIFT_NODEJS_IP || "127.0.0.1",
    port = process.env.OPENSHIFT_NODEJS_PORT || 3000;


console.log(" Express server listening on port 3000");
app.listen(port,ip);

module.exports = app;