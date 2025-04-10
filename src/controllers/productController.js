const Product = require('../models/Product');

// Obtener todos los productos
exports.getAllProducts = async (req, res) => {
    try {
        console.log('Intentando obtener productos...');
        console.log('Modelo de Producto:', Product.modelName); // Verificar el nombre del modelo
        console.log('Colección:', Product.collection.name); // Verificar el nombre de la colección

        const products = await Product.find().lean();
        
        console.log('Productos encontrados (raw):', products);
        console.log('Número de productos encontrados:', products.length);
        console.log('Productos encontrados (detallado):', JSON.stringify(products, null, 2));

        if (!products || products.length === 0) {
            console.log('No se encontraron productos');
        }

        return res.render('home', { 
            title: 'E-commerce',
            products: products,
            hasProducts: products.length > 0
        });
    } catch (error) {
        console.error('Error detallado al obtener productos:', error);
        return res.status(500).render('home', {
            title: 'E-commerce',
            error: 'Error al cargar los productos: ' + error.message,
            products: []
        });
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