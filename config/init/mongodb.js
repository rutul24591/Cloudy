/*
 *	Mongo db set up file for freedoor
 *
 */

var mongoose = require('mongoose'), 
	schema = require('mongoose').Schema,
	db = mongoose.createConnection('localhost','cloudy');

	db.on("error",console.error.bind(console,"connnection error: "));

// blank schema to make req/res schema less
var userSchema = new schema({}, { strict: false });
var ticketSchema = new schema({}, {strict:false });
var alertSchema = new schema({}, {strict:false });
var instanceSchema = new schema({}, {strict:false });
var logSchema = new schema({}, {strict:false});


// gym bar book

module.exports = function(app, env) {
	// mongoose gives default pool of 100 connections
	var mongoUrl = env.config.mongo.url;
	env.db = mongoose.connect(mongoUrl);
	env.Logs = mongoose.model('Logs', logSchema);
	env.Users = mongoose.model('Users', userSchema);
	env.Instance = mongoose.model('Instances', instanceSchema);
	env.Alerts = mongoose.model('Alerts', alertSchema);
	env.Tickets = mongoose.model('Tickets', ticketSchema);
}
