const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const User = require('../models/user.model');

// Ruta para registrar usuarios
router.post('/register', userController.register);

// Ruta temporal para ver usuarios (solo para verificación)
router.get('/all', async (req, res) => {
    try {
        const users = await User.find({}, { password: 0 }); // Excluimos el password
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router; 