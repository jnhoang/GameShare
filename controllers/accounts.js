// global variables & requires
var express = require('express');
var db = require('../models');
var passport = require('../config/passportConfig.js');
var isLoggedIn = require('./../middleware/isLoggedIn');

var router = express.Router();

// routes

router.post('/signup', function(req, res) {
	console.log(req.body); 							// debug code
	db.user.findOrCreate({
		where: {username: req.body.username},
		defaults: {
			firstName: req.body.firstName,
			email: req.body.email,
			password: req.body.password
		}	
	})
	.spread(function(user, wasCreated) {
		if(wasCreated) {
			passport.authenticate('local', {
				successRedirect: '/account',
				successFlash: 'Account created, You are now logged in'
			})(req, res);
		} else {
			req.flash('error', 'username already exists');
			res.redirect('/');
		}
	})
	.catch(function(error) {
		req.flash('error', error.message);
		res.redirect('/');
	});
});

router.post('/login', passport.authenticate('local', {
	successRedirect: '/account',
	successFlash: 'Good job, you logged in',
	failureRedirect: '/',
	failureFlash: 'Invalid credentials'
}));

router.get('/logout', function(req, res) {
	if (isLoggedIn) {
		req.logout();
		req.flash('success', 'You have successfully logged out');
		res.redirect('/');
	} else {
		res.flash('error', 'You are not currently logged in');
	}
});

// /GET, user account home page
router.get('/', isLoggedIn , function(req, res) {
	//console.log(req.user);					//debug code
	var currentUser = req.user;

	db.user.find({
		where: {id: currentUser.id},
		include: [db.game, db.community]
	})
	.then(function(user) {
		//queries for all requested to be loaned
		db.game.findAll({
			where: {
				userId: currentUser.id,
				askerUsername: {$not: null}
			}
		})
		.then(function(games) {	
			res.render('account', {
				user: user,
				games: games
			});
		})
	})
});




// export
module.exports = router;












