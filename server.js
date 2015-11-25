var express = require('express'),
    path = require('path'),
    favicon = require('serve-favicon'),
    logger = require('morgan'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
    session = require('express-session'),
    http = require('http'),
    https = require('https'),
    handlebars = require('handlebars'),
    sharedEnv = require('./config/environment'),
    fs = require('fs'),
    validator = require('validator'),
    logger = require('util'),
    ejs = require('ejs'),
    io = require('socket.io')(http),
    mongoose= require("mongoose");


//var index = require('./routes/index');
//var api = require('./routes/api');
//var authenticate = require('./routes/authenticate')(passport);

//initialize mongoose schemas

var app = express();

app.use(bodyParser.json());       // to support JSON-encoded bodies
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
