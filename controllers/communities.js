// global variables & requires
var express = require('express');
var db = require('../models');
var router = express.Router();

// routes

// /GET, shows all communities available
router.get('/', function(req, res) {
	db.community.findAll({ limit: 10})
	.then(function(communities) {
		res.render('community/allCommunities', {communities: communities});		
	})
});

// /GET, shows form to create a new community
router.get('/create', function(req, res) {
	res.render('community/createCommunity');
});

// /POST, findOrCreate a new community, redirect to new community page
router.post('/create/:id', function(req, res) {
	var currentUser = req.user;

	if (currentUser) {
		db.user.find({
			where: {id: currentUser.id}
		})
		.then(function(user) {
			db.community.findOrCreate({
				where: {name: req.body.name},
				defaults: {description: req.body.description}
			})
			.spread(function(community, wasCreated) {
				if(wasCreated) {
					user.addCommunity(community);
					req.flash('success', 'community was created');
					res.redirect('/account');
				} else {
					req.flash('error', 'community with that name already exists');
					res.redirect('/');
				}
			})
			.catch(function(error) {
				res.sendStatus(404);
			});
		});
	} else {
		res.send('something went wrong');
	}
})


// /GET, shows a single community's site
router.get('/:id', function(req, res) {
	db.community.find({
		where: {id: req.params.id},
		include: [db.user]
	})
	.then(function(community) {
		var usersArr = getUserId(community.users);
		db.game.findAll({
			where: {userId: {$in: usersArr}},
			include: [db.user]
		})
		.then(function(game) {
			res.send(game);
			// res.render('community/singleCommunity',{
			// 	community: community,
			// 	game: game
			// });			
		})

	})
});


// export
module.exports = router;




function getUserId(userArr) {
	var tempArr = [];
	userArr.forEach(function(user) {
		tempArr.push(user.id);
	});

	return tempArr;
}
