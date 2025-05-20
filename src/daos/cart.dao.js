const BaseDAO = require('./base.dao');
const Cart = require('../models/cart.model');

class CartDAO extends BaseDAO {
    constructor() {
        super(Cart);
    }

    async findByIdAndPopulate(id) {
        try {
            const cart = await this.model.findById(id)
                .populate('products.product');
            return cart;
        } catch (error) {
            throw error;
        }
    }

    async addProduct(cartId, productId, quantity) {
        try {
            const cart = await this.model.findById(cartId);
            if (!cart) throw new Error('Cart not found');

            const productIndex = cart.products.findIndex(
                item => item.product.toString() === productId
            );

            if (productIndex === -1) {
                cart.products.push({ product: productId, quantity });
            } else {
                cart.products[productIndex].quantity += quantity;
            }

            await cart.save();
            return cart;
        } catch (error) {
            throw error;
        }
    }

    async removeProduct(cartId, productId) {
        try {
            const cart = await this.model.findById(cartId);
            if (!cart) throw new Error('Cart not found');

            cart.products = cart.products.filter(
                item => item.product.toString() !== productId
            );

            await cart.save();
            return cart;
        } catch (error) {
            throw error;
        }
    }

    async clearCart(cartId) {
        try {
            const cart = await this.model.findById(cartId);
            if (!cart) throw new Error('Cart not found');

            cart.products = [];
            await cart.save();
            return cart;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = new CartDAO(); 