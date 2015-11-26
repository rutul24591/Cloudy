/*
 *
 * Database functionalities for recommendation api's
 *
 */

var env = require("../config/environment")
	, validator = require("validator")
	, _ = require("underscore")
	, logger = env.logger;


function dbGetTicket(ticketId, callback){
	env.Tickets.find().where("ticketId", ticketId).exec(function(error,ticket){
		if(error){
			logger.error("Error From database:" + error);
			return callback(error);
		}

		//Check for any null object received from the database
		if(validator.isNull(ticket)){
			logger.debug("Null object received from the database, ticketId: " +ticketId);
			return callback(null,{});
		}
		// return ticket data from the database
		return callback(null, _.omit(ticket, ['_id','__v']));
	});
}

function dbCreateTicket(ticketObject, callback) {
	if (!ticketObject.ticketId) {
		var ticketId = {"ticketId": env.uuid()};
	}
	ticketObject = _.extend(ticketObject, ticketId);

	// Create object instance for mongoose
	var dbTicketObject = new env.Tickets(ticketObject);

	// Because mongoose is an orm, we need to save the object instance
	dbTicketObject.save(function(error, newTicketObject) {
		if(error) {
			logger.error('Error from database creating a ticket.');
			return callback(error, null);
		}
		// Convert the mongoose doc to JSON object
		newTicketObject = newTicketObject.toObject();
		return callback(null, _.omit(newTicketObject, ['_id', '__v']));
	});
}



function dbGetLog(logId, callback){
	env.Logs.find().where("logId", logId).exec(function(error,log){
		if(error){
			logger.error("Error From Database:" +error);
			return callback(error);
		}
		if(validator.isNull(log)){
			logger.debug("Null object received from the database,logId:", +logId);
			return callback(null,{});
		}
		return callback(null,_.omit(log, ['_id','__v']));
		
	});
}


function dbGetAllTickets(callback) {
	env.Tickets.find({}, function(err, tickets) {
		if (err) {
			return callback(err);
		}
		return callback(null, tickets);
	});
}
 
function dbGetAllLogs(callback){
	env.Logs.find({}, function(err,logs){
		if(err){
			return callback(err);
		}
		console.log(logs);
		return callback(null, logs);
	});
}


moduleExports = {}
moduleExports.dbGetTicket = dbGetTicket;
moduleExports.dbCreateTicket = dbCreateTicket;
moduleExports.dbGetLog = dbGetLog;
moduleExports.dbGetAllTickets = dbGetAllTickets;
moduleExports.dbGetAllLogs = dbGetAllLogs;
module.exports = moduleExports;
