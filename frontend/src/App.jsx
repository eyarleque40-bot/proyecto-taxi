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
      <h1>🚕Taxi Go </h1>
      <p className="subtitulo">Encuentra el mejor precio de taxi en un solo lugar</p>

      <div className="formulario">
        <label>Origen</label>
        <input value={origen} onChange={e => setOrigen(e.target.value)} />

        <label>Destino</label>
        <input value={destino} onChange={e => setDestino(e.target.value)} />

        <label>Distancia (km)</label>
        <input type="number" value={distancia} onChange={e => setDistancia(e.target.value)} disabled />

        <label>Tiempo estimado (min)</label>
        <input type="number" value={tiempo} onChange={e => setTiempo(e.target.value)} disabled />

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
          
<button 
  className="btn-reservar"
  onClick={() => {
    const mensaje = `Hola ${r.nombre}, quiero reservar un taxi de ${origen} a ${destino}. El precio estimado es S/ ${r.precio_total}. ¿Está disponible?`;
    const url = `https://wa.me/51${r.telefono}?text=${encodeURIComponent(mensaje)}`;
    window.open(url, '_blank');
  }}
>
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    width="18" 
    height="18" 
    fill="currentColor"
    style={{ marginRight: '8px', verticalAlign: 'middle' }}
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
  Reservar por WhatsApp
</button>
         
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;