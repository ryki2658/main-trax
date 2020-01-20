
let models = require("../models/user");
let bcrypt = require("bcrypt");
const passport = require('passport');
const myPassport = require('../passport_setup')(passport);
let flash = require('connect-flash');
const {isEmpty} = require('lodash');
const { validateUser } = require('../validators/signup');

exports.show_login = function(req, res, next) {
	res.render('user/login', { 
		message : req.flash('error'),
		urlStr: req.body.urlStr //pass origanal request URL
	});
}

exports.show_signup = function(req, res, next) {
	req.logout();
	res.render('user/signup', { message : req.flash('error') });
}

exports.signup = passport.authenticate('local-signup', {
	successRedirect : '/', // redirect to the secure profile section
	failureRedirect : 'signup', // redirect back to the signup page if there is an error
	failureFlash : true // allow flash messages
})


exports.login = function(req, res, next) {
	// generate the authenticate method and pass the req/res
	passport.authenticate('local-login', {
		successRedirect : ((!req.body.urlStr) ? '/': req.body.urlStr), // redirect to origanal requested page if one exists
		failureRedirect : 'login', // redirect back to the login page if there is an error
		failureFlash : true // allow flash messages
	})(req, res, next);
}
exports.logout = function(req, res, next) { 
	req.logout();
	req.session.destroy();
	res.redirect('login');
}

