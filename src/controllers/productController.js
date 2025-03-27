const Product = require('../models/Product');

// Obtener todos los productos
exports.getAllProducts = async (req, res) => {
    try {
        const products = await Product.find(); // Obtener todos los productos de MongoDB
        res.render('realTimeProducts', { products }); // Renderiza la vista con los productos
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
};

// Obtener un producto por ID
exports.getProductById = async (req, res) => {
    const productId = req.params.pid;
    try {
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ status: 'error', message: 'Product not found' });
        }
        res.json({ status: 'success', payload: product });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
};

// Agregar un nuevo producto
exports.addProduct = async (req, res) => {
    const newProduct = new Product(req.body);
    try {
        await newProduct.save();
        res.status(201).json({ status: 'success', payload: newProduct });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
};

// Actualizar un producto
exports.updateProduct = async (req, res) => {
    const productId = req.params.pid;
    try {
        const updatedProduct = await Product.findByIdAndUpdate(productId, req.body, { new: true });
        if (!updatedProduct) {
            return res.status(404).json({ status: 'error', message: 'Product not found' });
        }
        res.json({ status: 'success', payload: updatedProduct });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
};

// Eliminar un producto
exports.deleteProduct = async (req, res) => {
    const productId = req.params.pid;
    try {
        const deletedProduct = await Product.findByIdAndDelete(productId);
        if (!deletedProduct) {
            return res.status(404).json({ status: 'error', message: 'Product not found' });
        }
        res.json({ status: 'success', message: 'Product deleted', payload: deletedProduct });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
};