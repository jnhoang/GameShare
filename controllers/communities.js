// global variables & requires

var express = require('express');

router = express.Router();

// routes

// /GET, shows all communities available
router.get('/', function(req, res) {
	res.send('home community route works');
});

// /GET, shows form to create a new community
router.get('/create', function(req, res) {
	res.send('create community route works');
});

// /POST, findOrCreate a new community, redirect to new community page
router.post('/create/:id', function(req, res) {
	res.send(req.body);
})


// /GET, shows a single community's site
router.get('/:id', function(req, res) {
	res.send('single community page works');
});


// export
module.exports = router;