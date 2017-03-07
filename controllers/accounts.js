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
		where: {username: currentUser.username}
	})
	.then(function(user) {
		console.log(user.username, user.id);			// debug code
		res.render('account', {user: currentUser});
	})
});




// export
module.exports = router;












