import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

// Coordenadas de las 45 zonas de Lima
const coordenadasZonas = {
  'Ancón':                   { lat: -11.7741, lng: -77.1738 },
  'Aeropuerto Jorge Chávez': { lat: -12.0219, lng: -77.1143 },
  'Ate':                     { lat: -12.0289, lng: -76.9196 },
  'Barranco':                { lat: -12.1464, lng: -77.0206 },
  'Bellavista':              { lat: -12.0620, lng: -77.1268 },
  'Breña':                   { lat: -12.0583, lng: -77.0510 },
  'Callao':                  { lat: -12.0565, lng: -77.1181 },
  'Carmen de la Legua':      { lat: -12.0457, lng: -77.0930 },
  'Centro de Lima':          { lat: -12.0464, lng: -77.0428 },
  'Chaclacayo':              { lat: -11.9752, lng: -76.7697 },
  'Chorrillos':              { lat: -12.1748, lng: -77.0174 },
  'Cieneguilla':             { lat: -12.1184, lng: -76.7944 },
  'Comas':                   { lat: -11.9395, lng: -77.0498 },
  'El Agustino':             { lat: -12.0434, lng: -77.0034 },
  'Independencia':           { lat: -11.9898, lng: -77.0542 },
  'Jesús María':             { lat: -12.0741, lng: -77.0475 },
  'La Molina':               { lat: -12.0792, lng: -76.9489 },
  'La Perla':                { lat: -12.0679, lng: -77.1094 },
  'La Victoria':             { lat: -12.0651, lng: -77.0247 },
  'Lince':                   { lat: -12.0846, lng: -77.0350 },
  'Los Olivos':              { lat: -11.9907, lng: -77.0707 },
  'Lurigancho (Chosica)':    { lat: -11.9448, lng: -76.7048 },
  'Lurín':                   { lat: -12.2744, lng: -76.8696 },
  'Magdalena':               { lat: -12.0909, lng: -77.0707 },
  'Mi Perú':                 { lat: -11.8576, lng: -77.1219 },
  'Miraflores':              { lat: -12.1191, lng: -77.0284 },
  'Pachacámac':              { lat: -12.2153, lng: -76.8728 },
  'Pueblo Libre':            { lat: -12.0723, lng: -77.0630 },
  'Puente Piedra':           { lat: -11.8673, lng: -77.0765 },
  'Punta Hermosa':           { lat: -12.3333, lng: -76.8333 },
  'Rímac':                   { lat: -12.0287, lng: -77.0299 },
  'San Bartolo':             { lat: -12.3833, lng: -76.7833 },
  'San Borja':               { lat: -12.1058, lng: -77.0035 },
  'San Isidro':              { lat: -12.0972, lng: -77.0365 },
  'San Juan de Lurigancho':  { lat: -12.0148, lng: -76.9997 },
  'San Juan de Miraflores':  { lat: -12.1547, lng: -76.9742 },
  'San Luis':                { lat: -12.0731, lng: -77.0006 },
  'San Martín de Porres':    { lat: -12.0083, lng: -77.0793 },
  'San Miguel':              { lat: -12.0774, lng: -77.0813 },
  'Santa Anita':             { lat: -12.0511, lng: -76.9703 },
  'Santa Rosa':              { lat: -11.7989, lng: -77.1690 },
  'Surco':                   { lat: -12.1448, lng: -76.9986 },
  'Ventanilla':              { lat: -11.8756, lng: -77.1308 },
  'Villa El Salvador':       { lat: -12.2139, lng: -76.9350 },
  'Villa María del Triunfo': { lat: -12.1639, lng: -76.9428 },
};

const zonasFallback = Object.keys(coordenadasZonas).sort();

// Fórmula de Haversine: calcula la distancia entre dos coordenadas
function calcularDistancia(lat1, lng1, lat2, lng2) {
  const R = 6371; // Radio de la Tierra en km
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLng = (lng2 - lng1) * Math.PI / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLng / 2) * Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

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

  // 🔄 Calcular distancia y tiempo automáticamente al cambiar origen/destino
  useEffect(() => {
  //   const coordsOrigen = coordenadasZonas[origen];
  //   const coordsDestino = coordenadasZonas[destino];

  //   if (coordsOrigen && coordsDestino) {
  //     // Distancia en línea recta × 1.4 (factor de corrección por calles reales)
  //     const dist = calcularDistancia(
  //       coordsOrigen.lat, coordsOrigen.lng,
  //       coordsDestino.lat, coordsDestino.lng
  //     ) * 1.4;
      
  //     const distanciaRedondeada = Math.max(1, Math.round(dist));
  //     // Tiempo estimado: 30 km/h promedio en Lima con tráfico
  //     const tiempoEstimado = Math.round((distanciaRedondeada / 30) * 60);

  //     setDistancia(distanciaRedondeada);
  //     setTiempo(tiempoEstimado);
  //     setResultados([]); // Limpiar resultados anteriores
  //   }
  // }, [origen, destino]);
  // Normalizar nombres (quitar espacios extra, comparar sin distinguir mayúsculas)
  const normalizar = (str) => str.toLowerCase().trim();
  
  const claveOrigen = Object.keys(coordenadasZonas).find(
    k => normalizar(k) === normalizar(origen)
  );
  const claveDestino = Object.keys(coordenadasZonas).find(
    k => normalizar(k) === normalizar(destino)
  );

  const coordsOrigen = coordenadasZonas[claveOrigen];
  const coordsDestino = coordenadasZonas[claveDestino];

  console.log('Origen:', origen, '-> Coordenadas:', coordsOrigen);
  console.log('Destino:', destino, '-> Coordenadas:', coordsDestino);

  if (coordsOrigen && coordsDestino) {
    const dist = calcularDistancia(
      coordsOrigen.lat, coordsOrigen.lng,
      coordsDestino.lat, coordsDestino.lng
    ) * 1.4;

    const distanciaRedondeada = Math.max(1, Math.round(dist));
    const tiempoEstimado = Math.round((distanciaRedondeada / 30) * 60);

    setDistancia(distanciaRedondeada);
    setTiempo(tiempoEstimado);
    setResultados([]);
  } else {
    console.warn('No se encontraron coordenadas para:', origen, 'o', destino);
  }
}, [origen, destino]);

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
        <input type="number" value={distancia} readOnly />

        <label>Tiempo estimado (min)</label>
        <input type="number" value={tiempo} readOnly />

        <button onClick={comparar} disabled={cargando}>
          {cargando ? 'Comparando...' : 'Comparar precios'}
        </button>
      </div>

      {resultados.length > 0 && (
        <p className="info-ruta">
          Mostrando {resultados.length} opciones para <strong>{origen} → {destino}</strong>
          <br />
          <small>Distancia: {distancia} km · Tiempo: {tiempo} min</small>
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