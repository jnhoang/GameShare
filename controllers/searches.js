// global variables & requires
var express = require('express');
var request = require('request');

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
		url: 'https://igdbcom-internet-game-database-v1.p.mashape.com/games/',
		headers: {
			'X-Mashape-Key': process.env.mashapeKey,
			'Accept': 'application/json',
		},
		qs: {
		fields: 'name,cover,url',		
		search: s
		}
	}, function (error, response, body) {
		if (!error && response.statusCode == 200) {
			var gameData = JSON.parse(body);
			res.send(gameData);
		} else {
			console.log(body);
			res.redirect('/search');

		}
	});
});

// /GET, view game details
router.get('/:id', function(req, res) {
	res.render('game');
});


// export
module.exports = router;