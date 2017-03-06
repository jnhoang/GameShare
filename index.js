// global variables & require
require('dotenv').config();
var express = require('express');
var session = require('express-session');
var request = require('request');
var bodyParser = require('body-parser');
var flash = require('connect-flash');
var ejsLayouts = require('express-ejs-layouts');
var passport = require('./config/passportConfig.js');
var isLoggedIn = require('./middleware/isLoggedIn');
var db = require('./models');
var app = express();

// set and use statements
app.set('view engine', 'ejs');
app.use(session({
	secret: process.env.SESSION_SECRET,
	resave: false,
	saveUninitialized: true
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
app.use(function(req, res, next) {
	res.locals.currentUser = req.user;
	res.locals.alerts = req.flash();
	next();
});
app.use(ejsLayouts);
app.use(bodyParser.urlencoded({extended: false}));
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