const BaseRepository = require('./base.repository');
const productDAO = require('../daos/product.dao');
const ProductDTO = require('../dtos/product.dto');

class ProductRepository extends BaseRepository {
    constructor() {
        super(productDAO);
    }

    async findByCode(code) {
        const product = await this.dao.findByCode(code);
        return product ? ProductDTO.toDTO(product) : null;
    }

    async updateStock(id, quantity) {
        const product = await this.dao.updateStock(id, quantity);
        return product ? ProductDTO.toDTO(product) : null;
    }

    async create(productData) {
        const product = await this.dao.create(productData);
        return ProductDTO.toDTO(product);
    }

    async findAll() {
        const products = await this.dao.findAll();
        return ProductDTO.toDTOList(products);
    }

    async update(id, productData) {
        const product = await this.dao.update(id, productData);
        return product ? ProductDTO.toDTO(product) : null;
    }
}

module.exports = new ProductRepository(); 