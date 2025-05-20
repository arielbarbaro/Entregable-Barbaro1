const { Router } = require('express');
const cartRepository = require('../repositories/cart.repository');
const productRepository = require('../repositories/product.repository');
const ticketRepository = require('../repositories/ticket.repository');
const authMiddleware = require('../middlewares/auth.middleware');

const router = Router();

// Middleware de autenticación para todas las rutas
router.use(authMiddleware.verifyToken);

// Obtener carrito
router.get('/:cid', authMiddleware.isCartOwner, async (req, res) => {
    try {
        const cart = await cartRepository.findByIdAndPopulate(req.params.cid);
        res.json(cart);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Agregar producto al carrito
router.post('/:cid/product/:pid', authMiddleware.isUser, async (req, res) => {
    try {
        const { quantity = 1 } = req.body;
        const cart = await cartRepository.addProduct(req.params.cid, req.params.pid, quantity);
        res.json(cart);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Eliminar producto del carrito
router.delete('/:cid/product/:pid', authMiddleware.isCartOwner, async (req, res) => {
    try {
        const cart = await cartRepository.removeProduct(req.params.cid, req.params.pid);
        res.json(cart);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Vaciar carrito
router.delete('/:cid', authMiddleware.isCartOwner, async (req, res) => {
    try {
        const cart = await cartRepository.clearCart(req.params.cid);
        res.json(cart);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Finalizar compra
router.post('/:cid/purchase', authMiddleware.isCartOwner, async (req, res) => {
    try {
        const cart = await cartRepository.findByIdAndPopulate(req.params.cid);
        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        const productsToPurchase = [];
        const productsNotPurchased = [];
        let totalAmount = 0;

        // Verificar stock y calcular total
        for (const item of cart.products) {
            const product = await productRepository.findById(item.product.id);
            
            if (!product) {
                productsNotPurchased.push(item.product.id);
                continue;
            }

            if (product.stock >= item.quantity) {
                // Actualizar stock
                await productRepository.updateStock(product.id, item.quantity);
                productsToPurchase.push(item);
                totalAmount += product.price * item.quantity;
            } else {
                productsNotPurchased.push(item.product.id);
            }
        }

        // Crear ticket si hay productos para comprar
        let ticket = null;
        if (productsToPurchase.length > 0) {
            ticket = await ticketRepository.createTicket({
                amount: totalAmount,
                purchaser: req.user.email
            });
        }

        // Actualizar carrito con productos no comprados
        if (productsNotPurchased.length > 0) {
            await cartRepository.update(req.params.cid, {
                products: cart.products.filter(item => 
                    productsNotPurchased.includes(item.product.id)
                )
            });
        } else {
            await cartRepository.clearCart(req.params.cid);
        }

        res.json({
            ticket,
            productsNotPurchased
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router; 