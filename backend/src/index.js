const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

// ✅ Configuración de CORS para producción
const allowedOrigins = [
  'http://localhost:5173', // Para desarrollo local
  process.env.FRONTEND_URL // La URL de tu frontend en Vercel
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

const empresasRouter = require('./routes/empresas');
const cotizarRouter = require('./routes/cotizar');

app.use('/api/empresas', empresasRouter);
app.use('/api', cotizarRouter);

app.get('/', (req, res) => {
  res.send('API TaxiCompara funcionando 🚕');
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});