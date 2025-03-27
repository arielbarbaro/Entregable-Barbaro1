const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

// Rutas para manejar productos
router.get('/', productController.getAllProducts); 
router.get('/:pid', productController.getProductById);
router.post('/', productController.addProduct);
router.put('/:pid', productController.updateProduct);
router.delete('/:pid', productController.deleteProduct);

module.exports = router;