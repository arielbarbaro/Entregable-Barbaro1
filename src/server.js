require('dotenv').config(); 

const express = require('express');
const exphbs = require('express-handlebars');
const http = require('http');
const socketIo = require('socket.io');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const connectDB = require('./config/db');
const initializePassport = require('./config/passport.config');
const productRoutes = require('./routes/productRoutes');
const cartRoutes = require('./routes/cartRoutes');
const sessionsRouter = require('./routes/sessions.router');
const userRouter = require('./routes/user.router');
const productController = require('./controllers/productController');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Conectar a la base de datos
connectDB();

// Inicializar Passport
initializePassport();

// Configurar Handlebars como motor de plantillas
app.engine('handlebars', exphbs.engine({
    defaultLayout: 'main',
    layoutsDir: __dirname + '/views/layouts'
}));
app.set('view engine', 'handlebars');
app.set('views', __dirname + '/views');

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(passport.initialize());

// Rutas
app.use('/api/products', productRoutes);
app.use('/api/carts', cartRoutes);
app.use('/api/sessions', sessionsRouter);
app.use('/api/users', userRouter);

// Ruta para la vista principal
app.get('/', productController.getAllProducts);

io.on('connection', (socket) => {
    console.log('New client connected');

    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
});

// Iniciar el servidor
const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});