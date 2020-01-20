var express = require('express');
var router = express.Router();
let jobs_controller = require('../controllers/jobs_controller');
let {isLoggedIn, hasAuth} = require('../middleware/hasAuth.js')


router.get('/', isLoggedIn, jobs_controller.get_job);
router.post('/show/:id', isLoggedIn, jobs_controller.get_jobForUser);
router.post('/create', isLoggedIn, jobs_controller.post_createJob);
router.get('/create/new', isLoggedIn, jobs_controller.get_new);
router.get('/:id', isLoggedIn, jobs_controller.get_showJob);
router.post('/:id/update', isLoggedIn, jobs_controller.post_updateJob);
router.get('/:id/delete', isLoggedIn, jobs_controller.delete_deleteJob);

module.exports = router;