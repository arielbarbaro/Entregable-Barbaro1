class ProductDTO {
    constructor(product) {
        this.id = product._id;
        this.title = product.title;
        this.description = product.description;
        this.price = product.price;
        this.thumbnail = product.thumbnail;
        this.code = product.code;
        this.stock = product.stock;
        this.category = product.category;
    }

    static toDTO(product) {
        return new ProductDTO(product);
    }

    static toDTOList(products) {
        return products.map(product => new ProductDTO(product));
    }
}

module.exports = ProductDTO; 