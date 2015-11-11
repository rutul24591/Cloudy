var express = require('express'),
    path = require('path'),
    favicon = require('serve-favicon'),
    logger = require('morgan'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
    session = require('express-session'),
    http = require('http'),
    https = require('https'),
    passport = require('passport'),
    sharedEnv = require('./config/environment'),
    fs = require('fs'),
    validator = require('validator'),
    logger = require('util'),
    express = require('express'),
    ejs = require('ejs'),
    mongoose= require("mongoose");


//var index = require('./routes/index');
//var api = require('./routes/api');
//var authenticate = require('./routes/authenticate')(passport);

//initialize mongoose schemas

var app = express();

app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

sharedEnv.logger = logger;

// view engine setup
app.set('views', path.join(__dirname, 'public'));
app.set('view engine', 'html');
app.engine('html', require('hogan-express'));

//Set init configuration
require('./config/init/config')(app, sharedEnv);
require('./config/init/errorHandler')(app, sharedEnv);
require('./config/init/mongodb')(app, sharedEnv);
require('./config/init/routes')(app, sharedEnv);
require('./config/init/util')(app, sharedEnv);
require('./config/init/compileSchemas')(app, sharedEnv);

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
//app.use(logger('dev'));
// app.use(session({
//   secret: 'keyboard cat'
// }));


// app.use(passport.initialize());
// app.use(passport.session());

// app.use('/', index);
// app.use('/auth', authenticate);
//app.use('/api', api);


// catch 404 and forward to error handler
// app.use(function(req, res, next) {
//     var err = new Error('Not Found');
//     err.status = 404;
//     next(err);
// });

//// Initialize Passport
// var initPassport = require('./passport-init');
// initPassport(passport);

// error handlers

// development error handler
// will print stacktrace
// if (app.get('env') === 'development') {
//     app.use(function(err, req, res, next) {
//         res.status(err.status || 500);
//         res.render('error', {
//             message: err.message,
//             error: err
//         });
//     });
// }

// production error handler
// no stacktraces leaked to user
// app.use(function(err, req, res, next) {
//     res.status(err.status || 500);
//     res.render('error', {
//         message: err.message,
//         error: {}
//     });
// });

sharedEnv.hostname = require('os').hostname();
server = http.createServer(app);
var io = require('socket.io').listen(server);
sharedEnv.io = io;

io.on('connection', function(socket) {
    // console.log('emitted');
    // socket.emit('request', 'blah');
});

var ip = process.env.OPENSHIFT_NODEJS_IP || "127.0.0.1",
    port = process.env.OPENSHIFT_NODEJS_PORT || 3002;


console.log(" Express server listening on port 3002");
app.listen(port,ip);

module.exports = app;