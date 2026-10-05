const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

const allowedOrigins = [
  'http://localhost:5173',
  'http://127.0.0.1:5173',
  process.env.FRONTEND_URL || 'http://localhost:5173'
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('No permitido por CORS'));
    }
  }
}));

app.use(express.json());

// Routers
const empresasRouter = require('./routes/empresas');
const cotizarRouter = require('./routes/cotizar');
const zonasRouter = require('./routes/zonas');
const rutasRouter = require('./routes/rutas');

app.use('/api/empresas', empresasRouter);
app.use('/api/zonas', zonasRouter);
app.use('/api/rutas', rutasRouter);
app.use('/api', cotizarRouter);

app.get('/', (req, res) => {
  res.send('API TaxiCompara funcionando 🚕');
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});