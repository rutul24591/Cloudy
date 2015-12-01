var  _ = require('underscore')
  , fs = require('fs')
  , env = require('../config/environment')
  , logger = env.logger
  , byline = require('byline')
  , os  = require('os-utils')
;

// var bugzilla = require("node-bugzilla").connect{
//    url: "https://api-dev.bugzilla.mozilla.org/test/1.3/",
//    username: "user",
//    password: "secret",
//    defaults: {
//     "product": "My Bugzilla Product",
//     "component": "My Bugzilla Component"
//   }
// });



module.exports.getErrors = function(req, res, next) {
  res.render('errors');
}


// bugzilla.handleUncaughtExceptions( '[Crash:cloudy]', function( err, result ) {
//   if ( err ) {
//     console.log( 'Crash, node-bugzilla unable to file bug in bugzilla.' );
//     return;
//   }

//   console.log( "Crash, Bug #" + result.bug );
//   console.log( result.err.stack );

// });

module.exports.getErrorsJson = function(req, res, next) {
  var stream = byline(fs.createReadStream(env.config.server.logfile, { encoding: 'utf8' }));
  var errorList = [];
  stream.on('data', function(line) {
    errorList.push(line);
  });
  stream.on('end', function() {
    res.send(errorList.reverse());
  });
}


