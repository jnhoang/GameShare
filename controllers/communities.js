// global variables & requires
var express = require('express');
var db = require('../models');
var router = express.Router();

// routes

// /GET, shows all communities available
router.get('/', function(req, res) {
	res.render('community/allCommunities');
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
					//res.send('something was created');						
				}
				//callback(null)
				// } else {
				// 	//req.flash('error', 'community with that name already exists');
				// 	res.redirect('/');
				// }
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
	res.render('community/community');
});


// export
module.exports = router;





