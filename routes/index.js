var express = require('express');
var router = express.Router();

/* Home routes */

router.get('/robots.txt', function (req, res, next) {
  res.type('text/plain')
  res.send("User-agent: *\nDisallow: \nSitemap: https://www.maintrax.org/sitemap.xml/");
});

router.get('/', function(req, res, next) {
  res.redirect('/dashboard');
});

router.get('/index', function(req, res, next) {
  res.redirect('/dashboard');
});

router.get('/notAuth', function(req, res, next) {
  res.render('notAuth', {
    title: 'Not Authorized',
    user: req.user,
  })
});

module.exports = router;
