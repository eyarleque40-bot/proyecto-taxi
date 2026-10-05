// Datos de respaldo (modo demo cuando la BD no responde)
const empresas = [
  { id: 1,  nombre: 'Uber',         telefono: '999111222', precio_base: 3.50, precio_km: 1.40, precio_minuto: 0.28 },
  { id: 2,  nombre: 'Cabify',       telefono: '999333444', precio_base: 4.50, precio_km: 1.80, precio_minuto: 0.25 },
  { id: 3,  nombre: 'InDriver',     telefono: '999777888', precio_base: 4.00, precio_km: 1.60, precio_minuto: 0.35 },
  { id: 4,  nombre: 'Maxim',        telefono: '999222333', precio_base: 5.00, precio_km: 1.50, precio_minuto: 0.30 },
  { id: 5,  nombre: 'DiDi',         telefono: '999444555', precio_base: 3.80, precio_km: 1.55, precio_minuto: 0.27 },
  { id: 6,  nombre: 'Beat',         telefono: '999555666', precio_base: 4.20, precio_km: 1.65, precio_minuto: 0.32 },
  { id: 7,  nombre: 'Taxi Directo', telefono: '999666777', precio_base: 4.00, precio_km: 1.30, precio_minuto: 0.25 },
  { id: 8,  nombre: 'Satelital',    telefono: '999888999', precio_base: 3.90, precio_km: 1.35, precio_minuto: 0.26 },
  { id: 9,  nombre: 'Taxi Verde',   telefono: '999000111', precio_base: 3.75, precio_km: 1.25, precio_minuto: 0.24 },
  { id: 10, nombre: 'Easy Taxi',    telefono: '999101010', precio_base: 4.10, precio_km: 1.45, precio_minuto: 0.29 },
  { id: 11, nombre: '99',           telefono: '999202020', precio_base: 3.60, precio_km: 1.38, precio_minuto: 0.26 },
  { id: 12, nombre: 'Lime',         telefono: '999303030', precio_base: 4.30, precio_km: 1.55, precio_minuto: 0.31 },
  { id: 13, nombre: 'Grin',         telefono: '999404040', precio_base: 4.40, precio_km: 1.35, precio_minuto: 0.27 },
  { id: 14, nombre: 'Movit',        telefono: '999505050', precio_base: 4.00, precio_km: 1.30, precio_minuto: 0.24 },
  { id: 15, nombre: 'Taxi Real',    telefono: '999606060', precio_base: 3.85, precio_km: 1.28, precio_minuto: 0.23 },
  { id: 16, nombre: 'Mi Taxi',      telefono: '999707070', precio_base: 3.95, precio_km: 1.32, precio_minuto: 0.25 },
  { id: 17, nombre: 'Taxi Express', telefono: '999808080', precio_base: 3.70, precio_km: 1.22, precio_minuto: 0.22 },
  { id: 18, nombre: 'Taxi Seguro',  telefono: '999909090', precio_base: 3.65, precio_km: 1.20, precio_minuto: 0.21 },
];

module.exports = empresas;