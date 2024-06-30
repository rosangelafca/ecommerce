require('dotenv').config();
const express = require('express')
const app = express();
const cors = require('cors');
const Tasks = require('./utils/TasksCron')();

// Configurações do App
require('./configs/configApp')(express, app);

// Lista de Models
require('./models/listModels')();

// CORS
app.use(cors())

// Rotas
const UsuarioRoutes = require('./routes/UsuarioRoutes');
const PainelRoutes = require('./routes/PainelRoutes');
const MercadoPagoRoutes = require('./routes/MercadoPagoRoutes');

// Middlewares
const ProtectRoute = require('./utils/ProtectRoute');

app.use('/', UsuarioRoutes);
app.use('/painel', ProtectRoute,PainelRoutes);
app.use('/mp', MercadoPagoRoutes);

app.use((req,res,next) => {
    res.redirect('/')
});




module.exports = app;