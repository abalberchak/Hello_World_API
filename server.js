var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Vehicle = require('./app/models/vehicle');

//Configure App for Body-parser
//Body-Parser lets us grab data from POST methods

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

//Set up the port for the server to listen on
var port = process.env.PORT || 3000;

// Connect to DB with the MongoDB default port
//creates a table called "Code Along"
mongoose.connect('mongodb://localhost:27017/codealong');

//API routes
var router = express.Router();

//Routes will be prefixed with /api (/api after the domain name)
app.use('/api', router);

//MIDDLEWARE
//Middlewae can be very useful for doing validations. We can log things from here or stop the request from continuing in the event that the request is not safe.
//Use the Middleware for ALL requests (pre processing/validation)
//An API request will always hit the middleware first, then if it passes, continues
router.use(function(req, res, next) {
	console.log('FYI...there is some processing happening right now...');
	next();
});



//Test Route
router.get('/', function(req, res) {
	res.json({message: 'Welcome to our API'});
});

//Resouce url below to get vehicles resource
router.route('/vehicles')
	.post(function(req, res) {
		var vehicle = new Vehicle(); //new instance of a vehicle
		vehicle.make = req.body.make;
		vehicle.model = req.body.make;
		vehicle.color = req.body.color;

		vehicle.save(function(err) {
			if (err) {
				res.send(err);
			}
			res.json({message: 'Vehicle was successfully added!'})
		})
	})

	.get(function(req, res) {
		Vehicle.find(function(err, vehicles) {
			if (err) {
				res.send(err);
			}
			res.json(vehicles);
		});
	});

router.route('/vehicles/:vehicle_id')
	.get(function(req, res) {
		Vehicle.findById(req.params.vehicle_id, function(err, vehicle) {
			if (err) {
				res.send(err);
			}
			res.json(vehicle);
		});
	});

router.route('/vehicle/make/:make')
	.get(function(req, res) {
		Vehicle.find({make:req.params.make}, function(err, vehicle) {
			if (err) {
				res.send(err);
			}
			res.json(vehicle);
		});
	});

router.route('/vehicle/color/:color')
	.get(function(req, res) {
		Vehicle.find({color:req.params.color}, function(err, vehicle) {
			if (err) {
				res.send(err);
			}
			res.json(vehicle);
		})
	})




//Launch the server
app.listen(port);



console.log('Server listening on Port ' + port);