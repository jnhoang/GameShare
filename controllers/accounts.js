// global variables & requires
var express = require('express');
var db = require('../models');
var isLoggedIn = require('./../middleware/isLoggedIn');

var router = express.Router();

// routes

// /GET, user account home page
router.get('/',isLoggedIn , function(req, res) {
	res.render('account');
});


// export
module.exports = router;