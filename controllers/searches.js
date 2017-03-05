// global variables & requires
var express = require('express');
// var db = require('../models');

var router = express.Router();

// routes 

// /GET, landing view
router.get('/', function(req, res) {
	res.render('search');
});

// /POST, submit a search
router.post('/', function(req, res) {
	res.send(req.body);
});

// /GET, view game details
router.get('/:id', function(req, res) {
	res.render('game');
});


// export
module.exports = router;