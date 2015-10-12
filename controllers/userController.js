//CMPE 295 cloudy userControllers

var env = require("../config/environment")
	, validator = require("validator")
	, _ = require("underscore")
	, async = require('async')
	, logger = env.logger
	, crypto = require('crypto');

	//encryption algorithm
	var algo= "md5";

	//setting datamodels
	var userModel = require("../models/userModel");

	module.exports.getRoot = function(req, res) {
	logger.log('GET Request for URL: / received.');
	res.render('../views/Landing.html');
	}

	module.exports.postUser= function(req,res){
		if(_.isEmpty(req.body)){
			logger.log("Empty request body received in post user");
			return res.render("errorpage",{layout : "layout"});
		}
		logger.log("POST /user request received." + JSON.stringify(req.body));
		
	userModel.dbCreateUser(req,body, function(err,newUser){
		if(error)
		{
			logger.log(" Error received from the database in POST user." +error);
			return res.render("errorpage", {layout: "layout"});
		}
		if(validator.isNull(newUser)){
			logger.log('Null object received from database in POST user. ');
			return res.render('errorpage', {layout: 'layout'});
		}
		logger.log('POST /user response: ' + JSON.stringify(newUser));
		return res.render('chatpage', {layout: 'layout'});
		});	
	}

	module.exports.getUser = function(req,res){
		logger.log("Get USER request received userId" +req.params.user_id);
		var userId = req.params.user_id;
		userModel.dbGetUser(userId, function(error,user){
			if(error){
				logger.log("Erroe received from the databse in GET user" +error);
				return res.render("errorpage",{layout: "layout"});
			}
			if(validator.isNull(user)){
			logger.log('Null object received in get User controller, userId: ' + userId);
			return res.render('errorpage', {layout: 'layout'});
		}
		logger.log('GET /user response ' + JSON.stringify(user));
		return res.send(200, user);

		});
 
	}



	

