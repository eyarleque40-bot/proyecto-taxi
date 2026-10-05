const express = require('express');
const router = express.Router();
const pool = require('../db');

router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query(
      `SELECT DISTINCT origen_zona, destino_zona 
       FROM tarifas 
       ORDER BY origen_zona, destino_zona
       LIMIT 1000`
    );
    res.json({
      total: rows.length,
      rutas: rows.map(r => `${r.origen_zona} → ${r.destino_zona}`)
    });
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener rutas' });
  }
});

module.exports = router;