import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

const zonasFallback = [
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

function App() {
  const [zonas, setZonas] = useState(zonasFallback);
  const [origen, setOrigen] = useState('Miraflores');
  const [destino, setDestino] = useState('Aeropuerto Jorge Chávez');
  const [distancia, setDistancia] = useState(15);
  const [tiempo, setTiempo] = useState(30);
  const [resultados, setResultados] = useState([]);
  const [cargando, setCargando] = useState(false);

  // Cargar zonas desde la API
  useEffect(() => {
    axios.get(`${API_URL}/api/zonas`)
      .then(res => { if (res.data.length > 0) setZonas(res.data); })
      .catch(() => {});
  }, []);

  const comparar = async () => {
    setCargando(true);
    try {
      const res = await axios.post(`${API_URL}/api/cotizar`, {
        origen,
        destino,
        distancia_km: Number(distancia),
        tiempo_min: Number(tiempo)
      });
      setResultados(res.data);
    } catch (error) {
      alert('Error al consultar precios. Intenta de nuevo.');
    }
    setCargando(false);
  };

  return (
    <div className="container">
      <h1>🚕 TaxiCompara</h1>
      <p className="subtitulo">
        Comparando <strong>18 empresas</strong> en <strong>{zonas.length} zonas</strong> de Lima
      </p>

      <div className="formulario">
        <label>Origen</label>
        <select value={origen} onChange={e => setOrigen(e.target.value)}>
          {zonas.map(z => <option key={z} value={z}>{z}</option>)}
        </select>

        <label>Destino</label>
        <select value={destino} onChange={e => setDestino(e.target.value)}>
          {zonas.map(z => <option key={z} value={z}>{z}</option>)}
        </select>

        <label>Distancia (km)</label>
        <input type="number" value={distancia} onChange={e => setDistancia(e.target.value)} disabled />

        <label>Tiempo estimado (min)</label>
        <input type="number" value={tiempo} onChange={e => setTiempo(e.target.value)} disabled />

        <button onClick={comparar} disabled={cargando}>
          {cargando ? 'Comparando...' : 'Comparar precios'}
        </button>
      </div>

      {resultados.length > 0 && (
        <p className="info-ruta">
          Mostrando {resultados.length} opciones para <strong>{origen} → {destino}</strong>
        </p>
      )}

      <div className="resultados">
        {resultados.map((r, i) => (
          <div key={r.empresa_id} className={`tarjeta ${i === 0 ? 'mejor-precio' : ''}`}>
            <h3>{i === 0 ? '🥇 ' : ''}{r.nombre}</h3>
            <p className="precio">S/ {r.precio_total}</p>
            <p>📞 {r.telefono}</p>
            <button 
              className="btn-reservar"
              onClick={() => {
                const mensaje = `Hola ${r.nombre}, quiero reservar un taxi de ${origen} a ${destino}. El precio estimado es S/ ${r.precio_total}. ¿Está disponible?`;
                const url = `https://wa.me/51${r.telefono}?text=${encodeURIComponent(mensaje)}`;
                window.open(url, '_blank');
              }}
            >
              Reservar por WhatsApp
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;