const BaseRepository = require('./base.repository');
const cartDAO = require('../daos/cart.dao');
const CartDTO = require('../dtos/cart.dto');

class CartRepository extends BaseRepository {
    constructor() {
        super(cartDAO);
    }

    async findByIdAndPopulate(id) {
        const cart = await this.dao.findByIdAndPopulate(id);
        return cart ? CartDTO.toDTO(cart) : null;
    }

    async addProduct(cartId, productId, quantity) {
        const cart = await this.dao.addProduct(cartId, productId, quantity);
        return cart ? CartDTO.toDTO(cart) : null;
    }

    async removeProduct(cartId, productId) {
        const cart = await this.dao.removeProduct(cartId, productId);
        return cart ? CartDTO.toDTO(cart) : null;
    }

    async clearCart(cartId) {
        const cart = await this.dao.clearCart(cartId);
        return cart ? CartDTO.toDTO(cart) : null;
    }

    async create(cartData) {
        const cart = await this.dao.create(cartData);
        return CartDTO.toDTO(cart);
    }

    async findAll() {
        const carts = await this.dao.findAll();
        return CartDTO.toDTOList(carts);
    }

    async update(id, cartData) {
        const cart = await this.dao.update(id, cartData);
        return cart ? CartDTO.toDTO(cart) : null;
    }
}

module.exports = new CartRepository(); 