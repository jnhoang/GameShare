// global variables & requires
var express = require('express');
var db = require('../models');
var flash = require('connect-flash');


var router = express.Router();

router.use(flash());

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
	var currentUser = req.user.id;

	if (currentUser) {
		db.user.find({ where: {id: currentUser}})
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
		req.flash('error', 'you need to be logged in to create a community');
		res.redirect('/');
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
		.then(function(games) {
			// res.send(games[0].user)				///debug code
			res.render('community/singleCommunity',{
				community: community,
				games: games
			});			
		})

	})
});

// /POST, active user joins community
router.post('/join', function(req, res) {
	currentUser = req.user.id;
	communityId = req.body.communityId;
	db.user_community.findOrCreate({
		where: {
			userId: currentUser,
			communityId: communityId
		}
	})
	.spread(function(jointTable, userAdded) {
		// userAdded ? req.flash('success', 'Welcome to the community')
		// : 			req.flash('error', 'You\'re already a member :) ');

		if (userAdded) {
			req.flash('success', 'Welcome to the community');
		} else {
			req.flash('error', 'You\'re already a member :)');
		}
		res.redirect('/community/' + communityId);
	})
	.catch(function(error) {
		req.flash('error', error.message);
		res.redirect('/');
	});
})

// /DELETE, remove association between currentUser & community
router.delete('/leave/:communityId', function(req, res) {
	var currentUser = req.user.id;
	var communityId = req.params.communityId;
	console.log(communityId)
	db.user_community.destroy({
		where: {
			userId: currentUser,
			communityId: communityId
		}
	})
	.then(function(success) {
		if (success) {
			req.flash('success', 'this group will be a little less awesome without you :\'(');
			res.sendStatus(200);
		} else {
			req.flash('error', 'You weren\'t even part of the group and you want to leave?!');
			res.sendStatus(200);
		}
	});
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
