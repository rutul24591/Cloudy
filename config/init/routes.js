/*

	Set all routes of the cmpe 280 application

*/

var userController = require('../../controllers/userController')
	, errorController = require('../../controllers/errorController')
	, baseurl = ''
	, apiController = require('../../controllers/apiController')
	, staticController = require('../../controllers/staticController')
;

module.exports = function(app, env) {
	app.get('/', userController.getRoot);
	
	// User routes
	app.post(baseurl + '/users', userController.postUser);
	app.get(baseurl + '/users/:user_id', userController.getUser);
	app.post(baseurl + '/login', userController.postLogin);
	app.get(baseurl + '/logout', userController.getLogout);

	// errors
	app.get(baseurl + '/errors', errorController.getErrors);
	app.get(baseurl + '/errors.json', errorController.getErrorsJson);

	app.get(baseurl + '/RCA', apiController.getRCA);
	// cpu status
	//app.get(baseurl + '/cpu', errorController.getCpu);
	//app.get(baseurl + '/cpu.json', errorController.getCpuJson);

	app.get(baseurl + "/dash", apiController.getDash);

	app.get(baseurl + "/dash1", apiController.getDash1);

	// get specific tickets
	app.get(baseurl + '/ticket', apiController.getTicket);

	//get all tickets
	app.get(baseurl + '/tickets.json', apiController.getTicketsData);

	app.get(baseurl + '/tickets', apiController.getTickets);
	// get Specific log

	app.post(baseurl + "/tickets", apiController.postTicket);

	app.post(baseurl + "/postTicket", apiController.postTicket);
	
	//put ticket
	app.put(baseurl + "/ticket", apiController.putTicket);

	//get specific log
	app.get(baseurl + "/log", apiController.getLog);

	//get all logs
	app.get(baseurl + "/logs.json", apiController.getLogsData);

	app.get(baseurl + "/logs", apiController.getLogs);

	//static to create user from yelp data set
	app.post(baseurl + '/staticCreateUser', staticController.createUser);
	app.get(baseurl + '/home' , userController.getHomePage);

	

	
}
