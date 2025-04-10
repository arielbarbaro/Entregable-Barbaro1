const User = require('../models/user.model');

const register = async (req, res) => {
    try {
        const { first_name, last_name, email, age, password, role } = req.body;

        // Verificar si el email ya existe
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: 'El email ya está registrado' });
        }

        // Crear nuevo usuario
        const newUser = new User({
            first_name,
            last_name,
            email,
            age,
            password,
            role: role || 'user' // Si no se especifica, será 'user'
        });

        // Guardar usuario (la contraseña se encriptará automáticamente por el middleware)
        await newUser.save();

        res.status(201).json({
            status: 'success',
            message: 'Usuario registrado exitosamente',
            user: {
                id: newUser._id,
                email: newUser.email,
                first_name: newUser.first_name,
                last_name: newUser.last_name,
                role: newUser.role
            }
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    register
}; 