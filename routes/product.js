const express = require('express');
const router = express.Router();
const controller = require('../controllers/product');
const checkLogin = require('../auth/checkLogin');

router.get('', controller.getProducts);
router.post('', checkLogin, controller.addProduct);
router.get('/:id', controller.getProduct);
router.put('/:id', checkLogin, controller.updateProduct);
router.delete('/:id', checkLogin, controller.deleteProduct);
module.exports = router