let express = require('express');
let router = express.Router();
let controller = require('../controllers/dashboard_controller');

router.get('/', controller.get_dashboard);

module.exports = router;