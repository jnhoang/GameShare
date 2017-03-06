// global variables & require
var express = require('express');
var request = require('request');
var bodyParser = require('body-parser');
var ejsLayouts = require('express-ejs-layouts');
var db = require('./models');
var app = express();

// set and use statements
app.set('view engine', 'ejs');
app.use(ejsLayouts);
app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static(__dirname + '/public'));

// routes
app.get('/', function(req, res) {
	res.render('home');
});

app.post('/', function(req, res) {
	console.log(req.body); 							// debug code

	db.user.findOrCreate({
		where: { 
			email: req.body.email 
		},
		defaults: {
			username: req.body.username,
			firstName: req.body.firstName,
			email: req.body.email,
			password: req.body.password
		}	
	})
	.spread(function(user, wasCreated) {
		if (wasCreated) {
			res.redirect('/');
		} else {
			res.send('Unsuccessful, email already in use');
		}
	})
	.catch(function(error) {
		console.error(error.message);
		res.send(error);
	})
})

// controllers
app.use('/account', require('./controllers/accounts'));
app.use('/search', require('./controllers/searches'));
//app.use('/community', require('./controllers/communities'));



// listen
app.listen(3000)