var express = require('express');
var router = express.Router();
let walkthrough_controller = require('../controllers/walkthrough_controller');
let {isLoggedIn, hasAuth} = require('../middleware/hasAuth');

router.get('/', walkthrough_controller.get_navigation);
router.post('/create', walkthrough_controller.post_create);
router.get('/myReport', isLoggedIn, walkthrough_controller.get_myReport);
router.get('/manual', walkthrough_controller.get_manualEntry);
router.get('/report', hasAuth,walkthrough_controller.get_report);
router.get('/:school/:item/:number/qrscan', walkthrough_controller.get_walkReport);
router.get('/:id/details', walkthrough_controller.get_walkDeatails);
router.post('/walk/:id/update', walkthrough_controller.post_addDetails);
router.get('/:id/showDetails', walkthrough_controller.get_showDeatails);

module.exports = router;