let express = require('express');
let router = express.Router();
let news_controller = require('../controllers/news_controller');
let {isLoggedIn, hasAuth} = require('../middleware/hasAuth.js')

router.get('/', hasAuth, news_controller.get_editNews);
router.post('/:id/update', hasAuth, news_controller.post_update);
router.get('/:id/edit', hasAuth, news_controller.get_edit);

router.post('/create', hasAuth, news_controller.post_create);

module.exports = router;