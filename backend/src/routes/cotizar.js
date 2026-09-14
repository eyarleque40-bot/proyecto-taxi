const express = require('express');
const router = express.Router();
const pool = require('../db');

router.post('/cotizar', async (req, res) => {
  const { origen, destino, distancia_km, tiempo_min } = req.body;

  try {
    const [rows] = await pool.query(
      `SELECT e.id, e.nombre, e.telefono,
              t.precio_base, t.precio_km, t.precio_minuto
       FROM tarifas t
       JOIN empresas e ON e.id = t.empresa_id
       WHERE t.origen_zona = ? AND t.destino_zona = ?`,
      [origen, destino]
    );

    const resultados = rows.map(r => ({
      empresa_id: r.id,
      nombre: r.nombre,
      telefono: r.telefono,
      precio_total: (
        Number(r.precio_base) +
        Number(r.precio_km) * distancia_km +
        Number(r.precio_minuto) * tiempo_min
      ).toFixed(2)
    }));

    resultados.sort((a, b) => a.precio_total - b.precio_total);
    res.json(resultados);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;