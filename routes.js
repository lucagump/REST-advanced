const express = require('express');
const router = express.Router();

// Require the controllers WHICH WE DID NOT CREATE YET!!
const product_controller = require('./controllers/product.controller');


// a simple test url to check that all of our files are communicating correctly.
router.get('/test', product_controller.test)
router.post('/products', product_controller.createProduct)
router.get('/products/:id', product_controller.getProduct)
router.put('/:id/update', product_controller.updateProduct)
router.delete('/:id/delete', product_controller.deleteProduct)

router.post('/players', player_controller.createPlayer)

module.exports = router;
