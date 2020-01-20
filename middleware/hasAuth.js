let createError = require('http-errors')

exports.isLoggedIn = function(req, res, next) {
	if (!req.isAuthenticated()) {
        res.render('user/login', { 
            message: req.flash('loginMessage'),
            urlStr: req.baseUrl
        }); 
    } else {
        return next();
    }
};
exports.hasAuth = function(req, res, next) {
	if (req.user && req.user.local.is_admin == true)
		next();
	else
		res.redirect('/notAuth');
}