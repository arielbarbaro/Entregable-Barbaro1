require('dotenv').config();
const connectDB = require('../config/db');
const Product = require('../models/Product');

const createTestProduct = async () => {
    try {
        await connectDB();
        
        const testProduct = new Product({
            title: "Producto de Prueba",
            description: "Este es un producto de prueba",
            code: "TEST001",
            price: 29.99,
            stock: 10,
            category: "Test"
        });

        const savedProduct = await testProduct.save();
        console.log('Producto de prueba creado:', savedProduct);
        process.exit(0);
    } catch (error) {
        console.error('Error al crear producto de prueba:', error);
        process.exit(1);
    }
};

createTestProduct(); 