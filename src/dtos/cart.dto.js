class CartDTO {
    constructor(cart) {
        this.id = cart._id;
        this.products = cart.products.map(item => ({
            product: item.product,
            quantity: item.quantity
        }));
    }

    static toDTO(cart) {
        return new CartDTO(cart);
    }

    static toDTOList(carts) {
        return carts.map(cart => new CartDTO(cart));
    }
}

module.exports = CartDTO; 