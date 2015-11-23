/*
 *  http handlers for recommendation api's
 */

var env = require("../config/environment")
	, validator = require("validator")
	, _ = require("underscore")
	, async = require('async')
	, logger = env.logger
	, apiModel = require('../models/apiModel')
	//,postFiltering = require('../recommendation/postFiltering')
	,url = require('url');

// module.exports.renderTemplate = function(req, res) {
// 	res.render('../views/List.html');
// }

// module.exports.getTableau = function(req, res) {
// 	res.render('../views/tableau.html');
// }


module.exports.getTickets = function(req, res) {
	apiModel.dbGetAllTickets(function(err, tickets) {
		if (err) {
			logger.log('Error: %j', err);
			return res.sendStatus(500);
		}
		if (validator.isNull(tickets)) {
			return res.status(200).send([]);
		}
		
		console.log(tickets);
		return res.status(200).send(tickets);
	});	
}

 module.exports.getTicket = function(req,res){
	return res.render('ticket.html');
 }

module.exports.getLogs = function(req,res){
	apiModel.dbGetAllLogs(function(err, logs){
		if(err){
			logger.log("Error: %j", err);
			return res.sendStatus(500);
		}
		if(validator.isNull(logs)){
			return res.status(200).send([]);
		}
		console.log(logs);
		return res.status(200).send(logs);
	});
	
}

module.exports.getLog = function(req, res) {
	return res.render('log.html');
}


// module.exports.getCpu = function(req, res, next) {
//   env.io.emit('request', 'Received request: ' + req.method + ': ' + req.baseUrl + req.path);
//   //res.render('cpu');
// }

module.exports.getCpuJson = function(req, res, next) {
  env.io.emit('request', 'Received request: ' + req.method + ': ' + req.baseUrl + req.path);
  os.cpuUsage(function (usage) {
    os.cpuFree(function (free) {
      var stats = {
        cpuUsage: usage,
        cpuFree: free,
        freeMem: os.freememPercentage(),
        uptime: os.processUptime()
      }
      res.send(stats);      
    });
  });
}


module.exports.getTicket = function(req,res){
	if(!req.query.ticketId){
		return res.status(200).send([]);
	}
	env.io.emit('request',' Received request: '+ req.method +": "+ req.baseUrl + req.path);
	var ticket = req.query.ticketId.split(',');
	console.log("tickets:" +ticket);
	var resArr = [];
	function findTicket(ticketId, callback){
		apiModel.dbGetTicket(ticketId, function(err,ticket){
			if(err){
				logger.log("Error from the database:" +error);
				callback(err);
			}
			if(!validator.isNull(ticket)){
				resArr.push(ticket);
			}
			return callback(null,ticket);
		});
	}
	findTicket(req.query.ticketId, function(err, ticket) {
		if (err) {
			return res.sendStatus(500);
		}
		return res.status(200).send(ticket);
	});
}


module.exports.getLog = function(req,res){
	if(!req.query.logId){
		return res.status(200).send([]);
	}
	env.io.emit('request',' Received request: '+ req.method +": "+ req.baseUrl + req.path);
	var log = req.query.logId.split(',');
	var resArr = [];
	function findLog(logId, callback){
		apiModel.dbGetLog(logId, function(err,log){
			if(err){
				logger.log("Error from the database:" +error);
				callback(err);
			}
			if(!validator.isNull(log)){
				resArr.push(log);
			}
			return callback(null,log);
		});
	}
	findLog(req.query.logId,function(err,log){
		if(err){
			return res.sendStatus(500);
		}
		return res.status(200).send(log);
	});
}


module.exports.getRCA =function(req,res){
	 res.redirect("https://bugzilla.mozilla.org/");
}