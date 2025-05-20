const BaseDAO = require('./base.dao');
const Product = require('../models/product.model');

class ProductDAO extends BaseDAO {
    constructor() {
        super(Product);
    }

    async findByCode(code) {
        try {
            const product = await this.model.findOne({ code });
            return product;
        } catch (error) {
            throw error;
        }
    }

    async updateStock(id, quantity) {
        try {
            const product = await this.model.findById(id);
            if (!product) throw new Error('Product not found');
            
            product.stock -= quantity;
            await product.save();
            return product;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = new ProductDAO(); 