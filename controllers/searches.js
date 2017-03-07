// global variables & requires
var express = require('express');
var request = require('request');
var apiHeaders = {
			'X-Mashape-Key': process.env.mashapeKey,
			'Accept': 'application/json',
		};
var igdbURL = 'https://igdbcom-internet-game-database-v1.p.mashape.com/games/'
// var db = require('../models');

var router = express.Router();

// routes 

// /GET, landing view
router.get('/', function(req, res) {
	res.render('search');
});

router.get('/game', function(req, res) {
	var s = req.query.search;
	request({ 
		headers: apiHeaders,
		url: igdbURL,
		qs: {
			fields: 'name,cover',
			search: s
		}
	}, function (error, response, body) {
		if (!error && response.statusCode == 200) {
			var gameData = JSON.parse(body);
			//console.log(gameData);				//debug code
			//res.send(gameData);					//debug code
			res.render('game', {gameData: gameData});
		} else {
			res.redirect('/search');

		}
	});
});

// /GET, view game details
router.get('/game/:id', function(req, res) {
	var id = req.params.id;
	console.log(id);
	request({
		headers: apiHeaders,
		url: igdbURL + id,
		qs: {
			fields: 'name,screenshots,summary'
		}
	}, function(error, response, body) {
		if(!error && response.statusCode == 200) {
			var gameData = JSON.parse(body);
			console.log(gameData);					//debug code
			res.render('gameDescription', {gameData: gameData});			
		} else {
			redirect('/search');
		}
	})
});


// export
module.exports = router;