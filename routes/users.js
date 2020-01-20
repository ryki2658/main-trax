/*
var express = require('express');
var router = express.Router();

// GET users listing. 
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
*/

var express = require('express');
var router = express.Router();
let user = require('../controllers/user_controller');

let {isLoggedIn, hasAuth} = require('../middleware/hasAuth.js')

router.get('/login', user.show_login);
router.get('/signup', user.show_signup);
router.post('/login', user.login);
router.post('/signup', user.signup);
router.post('/logout', user.logout);
router.get('/logout', user.logout);

module.exports = router;
