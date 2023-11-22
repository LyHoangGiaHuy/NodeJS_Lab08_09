const express = require('express');
const router = express.Router();
const controller = require('../controllers/order');
const checkLogin = require('../auth/checkLogin');

router.get('', checkLogin, controller.getOrders);
router.post('', checkLogin, controller.addOrder);
router.get('/:id', checkLogin, controller.getOrder);
router.put('/:id', checkLogin, controller.updateOrder);
router.delete('/:id', checkLogin, controller.deleteOrder);

module.exports = router;