var passport = require('passport');
var localStrategy = require('passport-local').Strategy;
var db = require('../models');

passport.serializeUser(function(user, cb) {
	cb(null, user.id);
});

passport.deserializeUser(function(user, cb) {
	db.user.findById(id) 
	.then(function(user) {
		cb(null, user);
	})
	.catch(cb);				// why are we just handing back the cb in catch?
});

passport.use(new localStrategy({
	usernameField: 'username',				// change to username if this works
	password: 'password'				// just sure to change email below
}, function(username, password, cb) {
	db.user.findOne({
		where: {username: username}
	})
	.then(function(user) {
		if(!user || !user.isValidPassword(password)) {
			cb(null, false);
		} else {
			cb(null, user);
		}
	})
	.catch(cb);
}));

module.exports = passport;