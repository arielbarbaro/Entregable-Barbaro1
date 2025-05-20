const Cart = require('../models/Cart');
const Product = require('../models/Product');
const Ticket = require('../models/ticket.model');
const { v4: uuidv4 } = require('uuid');

// Crear un nuevo carrito
exports.createCart = async (req, res) => {
    try {
        const newCart = new Cart();
        await newCart.save();
        res.status(201).json({ status: 'success', payload: newCart });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
};


exports.getCartProducts = async (req, res) => {
    try {
        const cart = await Cart.findById(req.params.cid);
        if (!cart) {
            return res.status(404).json({ status: 'error', message: 'Cart not found' });
        }

        // Poblar los productos manualmente
        const populatedProducts = await Promise.all(
            cart.products.map(async (item) => {
                const product = await Product.findById(item.product);
                return {
                    product: product,
                    quantity: item.quantity
                };
            })
        );

        // Crear una copia del carrito con los productos poblados
        const populatedCart = {
            ...cart.toObject(),
            products: populatedProducts
        };

        console.log('Populated cart:', populatedCart); // Para debugging
        res.json({ status: 'success', payload: populatedCart });
    } catch (error) {
        console.error('Error in getCartProducts:', error); // Para debugging
        res.status(500).json({ status: 'error', message: error.message });
    }
};


exports.addProductToCart = async (req, res) => {
    try {
        const { pid } = req.params;
        const { quantity } = req.body;

        const cart = await Cart.findById(req.params.cid);
        if (!cart) {
            return res.status(404).json({ status: 'error', message: 'Cart not found' });
        }

        const product = await Product.findById(pid);
        if (!product) {
            return res.status(404).json({ status: 'error', message: 'Product not found' });
        }

        const existingProduct = cart.products.find(item => item.product.toString() === pid);
        if (existingProduct) {
            existingProduct.quantity += quantity;
        } else {
            cart.products.push({ product: pid, quantity });
        }

        await cart.save();
        
        // Poblar los productos antes de enviar la respuesta
        const populatedCart = await Cart.findById(cart._id).populate('products.product');
        res.json({ status: 'success', payload: populatedCart });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
};

exports.purchaseCart = async (req, res) => {
    try {
        const cart = await Cart.findById(req.params.cid).populate('products.product');
        if (!cart) {
            return res.status(404).json({ status: 'error', message: 'Cart not found' });
        }

        const productsToPurchase = [];
        const productsNotPurchased = [];
        let totalAmount = 0;

        // Verificar stock y calcular total
        for (const item of cart.products) {
            const product = item.product;
            if (product.stock >= item.quantity) {
                // Producto tiene suficiente stock
                productsToPurchase.push(item);
                totalAmount += product.price * item.quantity;
                
                // Actualizar stock
                product.stock -= item.quantity;
                await product.save();
            } else {
                // Producto no tiene suficiente stock
                productsNotPurchased.push(item.product._id);
            }
        }

        // Crear ticket si hay productos para comprar
        if (productsToPurchase.length > 0) {
            const ticket = new Ticket({
                code: uuidv4(),
                amount: totalAmount,
                purchaser: req.user.email
            });
            await ticket.save();

            // Actualizar carrito con productos no comprados
            cart.products = cart.products.filter(item => 
                productsNotPurchased.includes(item.product._id)
            );
            await cart.save();

            res.json({
                status: 'success',
                ticket,
                productsNotPurchased: productsNotPurchased.length > 0 ? productsNotPurchased : []
            });
        } else {
            res.status(400).json({
                status: 'error',
                message: 'No hay productos disponibles para comprar'
            });
        }
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
};