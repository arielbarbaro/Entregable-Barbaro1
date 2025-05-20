const jwt = require('jsonwebtoken');
const userRepository = require('../repositories/user.repository');

const authMiddleware = {
    // Middleware para verificar el token JWT
    verifyToken: async (req, res, next) => {
        try {
            const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
            
            if (!token) {
                return res.status(401).json({ message: 'No token provided' });
            }

            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            const user = await userRepository.findById(decoded.id);

            if (!user) {
                return res.status(401).json({ message: 'User not found' });
            }

            req.user = user;
            next();
        } catch (error) {
            return res.status(401).json({ message: 'Invalid token' });
        }
    },

    // Middleware para verificar si el usuario es administrador
    isAdmin: (req, res, next) => {
        if (req.user.role !== 'admin') {
            return res.status(403).json({ message: 'Admin access required' });
        }
        next();
    },

    // Middleware para verificar si el usuario es usuario normal
    isUser: (req, res, next) => {
        if (req.user.role !== 'user') {
            return res.status(403).json({ message: 'User access required' });
        }
        next();
    },

    // Middleware para verificar si el usuario es el propietario del carrito
    isCartOwner: async (req, res, next) => {
        try {
            const cartId = req.params.cid;
            const user = await userRepository.findById(req.user.id);

            if (!user || user.cart.toString() !== cartId) {
                return res.status(403).json({ message: 'Not authorized to access this cart' });
            }

            next();
        } catch (error) {
            return res.status(500).json({ message: 'Error verifying cart ownership' });
        }
    }
};

module.exports = authMiddleware; 