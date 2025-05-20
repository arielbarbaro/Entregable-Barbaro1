const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('../models/user.model');

const initializePassport = () => {
    // Estrategia para extraer el token de las cookies
    const cookieExtractor = req => {
        let token = null;
        if (req && req.cookies) {
            token = req.cookies['jwt'];
        }
        return token;
    };

    // Estrategia para extraer el token del header de Authorization
    const headerExtractor = req => {
        let token = null;
        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
            token = req.headers.authorization.split(' ')[1];
        }
        return token;
    };

    // Opciones para la estrategia JWT
    const options = {
        jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor, headerExtractor]),
        secretOrKey: process.env.JWT_SECRET
    };

    // Estrategia JWT
    passport.use('jwt', new JwtStrategy(options, async (jwt_payload, done) => {
        try {
            const user = await User.findById(jwt_payload.id);
            if (user) {
                return done(null, user);
            }
            return done(null, false);
        } catch (error) {
            return done(error, false);
        }
    }));

    // Estrategia current para obtener el usuario actual
    passport.use('current', new JwtStrategy(options, async (jwt_payload, done) => {
        try {
            const user = await User.findById(jwt_payload.id);
            if (user) {
                return done(null, user);
            }
            return done(null, false);
        } catch (error) {
            return done(error, false);
        }
    }));
};

module.exports = initializePassport; 