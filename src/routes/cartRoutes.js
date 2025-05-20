const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');
const passport = require('passport');

// Rutas para manejar carritos
router.post('/', cartController.createCart);
router.get('/:cid', cartController.getCartProducts);
router.post('/:cid/product/:pid', 
    passport.authenticate('current', { session: false }),
    cartController.addProductToCart
);
router.post('/:cid/purchase',
    passport.authenticate('current', { session: false }),
    cartController.purchaseCart
);

module.exports = router;