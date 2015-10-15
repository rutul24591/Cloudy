var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var ticketSchema = new mongoose.Schema({
	ticketname: String,		//should be changed to ObjectId, ref "User"
	created_at: {type: Date, default: Date.now},
	ticketseverity: String,
	created_by: String,
	ticketstatus: String,
	ticketLevel: String,
});

var alertSchema= new mongoose.Schema({
	projectname: String,
	created_at: {type: Date, default: Date.now},
});

var projectSchema = new mongoose.Schema({
	projectname: String,
	created_at: {type:Date, default: Date.now},
	created_by: String,
	companyname: String,
});

var userSchema = new mongoose.Schema({
	firstname: String,
	lastname: String,
	company: String,
	email: String,
	password: String, //hash created from password
	created_at: {type: Date, default: Date.now}
});


//mongoose.model('Post', postSchema);
mongoose.model('User', userSchema);
mongoose.model('Alert',alertSchema);
mongoose.model('Project',projectSchema);
mongoose.model('Ticket',ticketSchema);