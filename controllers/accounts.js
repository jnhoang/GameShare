// global variables & requires
var express = require('express');
// var db = require('../models');

var router = express.Router();

// routes

// /GET, user account home page
router.get('/', function(req, res) {
	res.send('user home page works');
})


// export
module.exports = router;