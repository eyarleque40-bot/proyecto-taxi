const express = require('express');
const router = express.Router();
const pool = require('../db');

const zonasDemo = [
  'Ancón', 'Aeropuerto Jorge Chávez', 'Ate', 'Barranco', 'Bellavista',
  'Breña', 'Callao', 'Carmen de la Legua', 'Centro de Lima', 'Chaclacayo',
  'Chorrillos', 'Cieneguilla', 'Comas', 'El Agustino', 'Independencia',
  'Jesús María', 'La Molina', 'La Perla', 'La Victoria', 'Lince',
  'Los Olivos', 'Lurigancho (Chosica)', 'Lurín', 'Magdalena', 'Mi Perú',
  'Miraflores', 'Pachacámac', 'Pueblo Libre', 'Puente Piedra', 'Punta Hermosa',
  'Rímac', 'San Bartolo', 'San Borja', 'San Isidro', 'San Juan de Lurigancho',
  'San Juan de Miraflores', 'San Luis', 'San Martín de Porres', 'San Miguel',
  'Santa Anita', 'Santa Rosa', 'Surco', 'Ventanilla', 'Villa El Salvador',
  'Villa María del Triunfo'
];

router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT nombre FROM zonas ORDER BY nombre');
    if (rows.length === 0) throw new Error('Vacío');
    res.json(rows.map(r => r.nombre));
  } catch (error) {
    res.json(zonasDemo);
  }
});

module.exports = router;