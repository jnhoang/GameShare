// global variables & requires
var express = require('express');
// var db = require('../models');

var router = express.Router();

// routes 

// /GET, landing view
router.get('/', function(req, res) {
	res.send('/search route works');
});

// /POST, submit a search
router.post('/', function(req, res) {
	res.send(req.body);
});

// /GET, view game details
router.get('/:id', function(req, res) {
	res.send('view game details route works');
});


// export
module.exports = router;