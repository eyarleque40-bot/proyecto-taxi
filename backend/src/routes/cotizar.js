const express = require('express');
const router = express.Router();
const pool = require('../db');
const empresasDemo = require('../data/empresas');

router.post('/cotizar', async (req, res) => {
  const { origen, destino, distancia_km, tiempo_min } = req.body;

  const calcularPrecios = (lista) =>
    lista.map(e => ({
      empresa_id: e.id || e.empresa_id,
      nombre: e.nombre,
      telefono: e.telefono,
      precio_total: (
        Number(e.precio_base) +
        Number(e.precio_km) * distancia_km +
        Number(e.precio_minuto) * tiempo_min
      ).toFixed(2)
    })).sort((a, b) => a.precio_total - b.precio_total);

  try {
    const [rows] = await pool.query(
      `SELECT e.id, e.nombre, e.telefono, t.precio_base, t.precio_km, t.precio_minuto
       FROM tarifas t
       JOIN empresas e ON e.id = t.empresa_id
       WHERE t.origen_zona = ? AND t.destino_zona = ?`,
      [origen, destino]
    );

    if (rows.length === 0) throw new Error('Sin datos para esta ruta');
    res.json(calcularPrecios(rows));

  } catch (error) {
    console.log('⚠️ Usando datos demo:', error.message);
    res.json(calcularPrecios(empresasDemo));
  }
});

module.exports = router;