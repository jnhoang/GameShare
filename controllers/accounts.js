// global variables & requires
var express = require('express');
var db = require('../models');
var passport = require('../config/passportConfig.js');
var isLoggedIn = require('./../middleware/isLoggedIn');

var router = express.Router();

// routes

// /POST, Signup
router.post('/signup', function(req, res) {
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
	successFlash: 'Hey, Welcome back',
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
	var currentUser = req.user;

	db.user.find({
		where: {
			id: currentUser.id,
		},
		include: [db.game, db.community]
	})
	.then(function(user) {
		//queries for all requested to be loaned
		db.game.findAll({
			where: {
				$or: [
				{ 
					$or: [
						{ askerUsername: currentUser.username },
						{ askerUsername: {$not: null} },
					]
				}, { userId: currentUser.id }
				]
			},
			include:[db.user]
		})
		.then(function(games) {
			var gamesOnLoan = [];
			var gamesRequested = [];
			var currentUserLoaning = [];
			var currentUserLoanRequests = [];

			games.forEach(function(game) {
				if (game.askerUsername == currentUser.username && !game.loaned) {
					currentUserLoanRequests.push(game);
				}
			})

			games.forEach(function(game) {
				if (game.askerUsername == currentUser.username && game.loaned) {
					currentUserLoaning.push(game);
				}
			});
			
			games.forEach(function(game) {
				if (game.askerUsername && game.askerUsername != currentUser.username && 
					game.loaned && game.userId == currentUser.id) {
					gamesOnLoan.push(game);
				}
			});

			games.forEach(function(game) {
				if (game.askerUsername && game.askerUsername != currentUser.username && !game.loaned) {
					gamesRequested.push(game);
				}
			});

			res.render('account', {
				user: user,
				games: games,
				gamesOnLoan: gamesOnLoan,
				gamesRequested: gamesRequested,
				currentUserLoaning: currentUserLoaning,
				currentUserLoanRequests: currentUserLoanRequests
			});
		})
	});
});

// /PUT, game request accepted
router.put('/accept/:id', function(req, res) {
	var gameId = req.params.id;
	
	db.game.update(
		{loaned: true},
		{
			where: 
			{id: gameId}
		}
	)
	.then (function() {
		req.flash('success', 'Lending request has been accepted');
		res.sendStatus(200);
	});
});

// /PUT, game borrow request denied
router.put('/deny/:id', function(req, res) {
	var gameId = req.params.id;
	
	db.game.update(
		{askerUsername: null},
		{where: 
			{id: gameId}
		}
	)
	.then (function() {
		req.flash('success', 'Lending request has been denied');
		res.sendStatus(200);
	});
});

// /PUT, return a borrowed game
router.put('/return/:id', function(req, res) {
	var gameId = req.params.id;

	db.game.update(
		{
			askerUsername: null,
			loaned: false
		}, {
			where: {id: gameId}
		}
	)
	.then (function() {
		req.flash('success', 'Game returned');
		res.sendStatus(200);
	});
});

// /PUT, request to borrow a game
router.put('/request/:id', function(req, res) {
	var gameId = req.params.id;
	var currentUser = req.user
	db.game.update(
		{
			askerUsername: currentUser.username,
		}, {
			where: {id: gameId}
		}
	)
	.then (function() {
		req.flash('success', 'request sent');
		res.sendStatus(200);
	})
});


// export
module.exports = router;