let express = require('express');
let router = express.Router();
let controller = require('../controllers/equipment_controller');

router.get('/', controller.get_equipment);
router.post('/create', controller.post_create);
router.get('/create/new', controller.get_new);
router.post('/:id/update', controller.post_update);
router.get('/:id/edit', controller.get_edit);
router.get('/:id', controller.get_detail);
router.get('/:id/remove', controller.delete_remove);

module.exports = router;