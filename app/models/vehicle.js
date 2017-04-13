var mongoose = require('mongoose');

//pull a Schema out of mongoose
var Schema = mongoose.Schema;


//Use the built-in constructor to make a schema
var VehicleSchema = new Schema({
	make: String,
	model: String,
	color: String
});

module.exports = mongoose.model('Vehicle', VehicleSchema);
