const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    code: { type: String, required: true, unique: true },
    price: { type: Number, required: true },
    status: { type: Boolean, default: true },
    stock: { type: Number, required: true },
    category: { type: String, required: true },
    thumbnails: { type: [String], default: [] }
}, {
    timestamps: true,
    strict: false,
    collection: 'Products'
});

productSchema.pre('find', function() {
    console.log('Ejecutando consulta en la colección:', this.model.collection.name);
});

const Product = mongoose.model('Products', productSchema);
module.exports = Product;