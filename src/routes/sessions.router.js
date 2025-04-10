const express = require('express');
const router = express.Router();
const passport = require('passport');
const sessionsController = require('../controllers/sessions.controller');

// Ruta de login
router.post('/login', sessionsController.login);

// Ruta para obtener el usuario actual
router.get('/current', 
    passport.authenticate('current', { session: false }),
    sessionsController.getCurrentUser
);

module.exports = router; 