// global variables & requires
var express = require('express');
var db = require('../models');
var passport = require('../config/passportConfig.js');
var isLoggedIn = require('./../middleware/isLoggedIn');

var router = express.Router();

// routes

// /POST, Signup
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

// /POST, Login
router.post('/login', passport.authenticate('local', {
	successRedirect: '/account',
	successFlash: 'Good job, you logged in',
	failureRedirect: '/',
	failureFlash: 'Invalid credentials'
}));

// /GET, logout
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
			var gamesOnLoan = [];

			games.forEach(function(game) {
				if (game.askerUsername && game.loaned) {
					gamesOnLoan.push(game);
				}
			})
			res.render('account', {
				user: user,
				games: games,
				gamesOnLoan: gamesOnLoan
			});
		})
	})
});

// /PUT, game is on Borrow
router.put('/accept/:id', function(req, res) {
	var gameId = req.params.id;
	
	db.game.update(
	{loaned: true},
	{where: {id: gameId}})
	.then (function(gameLoaned) {
		res.sendStatus(200);
	})
})






// export
module.exports = router;












