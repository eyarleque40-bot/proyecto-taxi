import { useState } from 'react';
import axios from 'axios';
import './App.css';

// ✅ NUEVO: Variable de entorno para la URL del API
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

function App() {
  const [origen, setOrigen] = useState('Centro');
  const [destino, setDestino] = useState('Aeropuerto');
  const [distancia, setDistancia] = useState(15);
  const [tiempo, setTiempo] = useState(30);
  const [resultados, setResultados] = useState([]);
  const [cargando, setCargando] = useState(false);

  const comparar = async () => {
    setCargando(true);
    try {
      // ✅ NUEVO: Usamos la variable API_URL aquí
      const res = await axios.post(`${API_URL}/api/cotizar`, {
        origen,
        destino,
        distancia_km: Number(distancia),
        tiempo_min: Number(tiempo)
      });
      setResultados(res.data);
    } catch (error) {
      alert('Error al consultar precios. Asegúrate de que el backend esté corriendo.');
    }
    setCargando(false);
  };

  return (
    <div className="container">
      <h1>🚕 TaxiCompara</h1>
      <p className="subtitulo">Encuentra el mejor precio de taxi en un solo lugar</p>

      <div className="formulario">
        <label>Origen</label>
        <input value={origen} onChange={e => setOrigen(e.target.value)} />

        <label>Destino</label>
        <input value={destino} onChange={e => setDestino(e.target.value)} />

        <label>Distancia (km)</label>
        <input type="number" value={distancia} onChange={e => setDistancia(e.target.value)} />

        <label>Tiempo estimado (min)</label>
        <input type="number" value={tiempo} onChange={e => setTiempo(e.target.value)} />

        <button onClick={comparar} disabled={cargando}>
          {cargando ? 'Comparando...' : 'Comparar precios'}
        </button>
      </div>

      <div className="resultados">
        {resultados.map((r, i) => (
          <div key={r.empresa_id} className={`tarjeta ${i === 0 ? 'mejor-precio' : ''}`}>
            <h3>{i === 0 ? '🥇 ' : ''}{r.nombre}</h3>
            <p className="precio">S/ {r.precio_total}</p>
            <p>📞 {r.telefono}</p>
            <button className="btn-reservar">Reservar</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;