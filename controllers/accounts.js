// global variables & requires
var express = require('express');
var db = require('../models');
var isLoggedIn = require('./../middleware/isLoggedIn');

var router = express.Router();

// routes

// /GET, user account home page
router.get('/', isLoggedIn , function(req, res) {
	//console.log(req.user);					//debug code
	var currentUser = req.user;

	db.user.find({
		where: {
			id: currentUser.id
		},
		include: [db.game]
	})
	.then(function(user) {
		res.render('account', {user: user});
	})
});




// export
module.exports = router;












