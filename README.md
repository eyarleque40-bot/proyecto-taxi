# 🚕 TaxiCompara

Aplicación web Full Stack que compara precios de **18 empresas de taxi** en **45 zonas** de Lima Metropolitana y Callao.

🔗 **Demo en vivo:** [https://proyecto-taxi.vercel.app](https://proyecto-taxi.vercel.app)

---

## 📊 Estadísticas del Proyecto

- 🚕 **18 empresas** de taxi registradas
- 🗺️ **45 zonas** de Lima y Callao
- 🛣️ **990 rutas** únicas disponibles
- 💰 **17,820 tarifas** calculadas automáticamente

---

## 🛠️ Tecnologías Utilizadas

**Frontend:**
- React 18 + Vite
- Axios
- CSS3 (responsive)

**Backend:**
- Node.js + Express
- MySQL2
- CORS + Dotenv

**Base de Datos:**
- MySQL (Aiven Cloud)

**DevOps:**
- Git + GitHub
- Vercel (frontend)
- Render (backend)
- Aiven (base de datos)

---

## ✨ Características

- ✅ Comparación de precios de 18 empresas en tiempo real
- ✅ Cálculo automático de distancia (fórmula de Haversine)
- ✅ Estimación de tiempo según tráfico promedio de Lima
- ✅ Ordenamiento automático por precio más bajo
- ✅ Reserva directa por WhatsApp con mensaje predefinido
- ✅ Modo demo: funciona aunque la base de datos esté inactiva
- ✅ Diseño responsive para móvil y escritorio

---

## 🚀 Cómo Probar el Proyecto

1. Abre **https://proyecto-taxi.vercel.app**
2. Selecciona **Origen:** Miraflores
3. Selecciona **Destino:** Aeropuerto Jorge Chávez
4. Observa cómo se calculan automáticamente la distancia y el tiempo
5. Presiona **"Comparar precios"**
6. Verás 18 opciones ordenadas por precio
7. Haz clic en **"Reservar por WhatsApp"** para probar la integración

### Prueba la API directamente:
- `GET /api/empresas` → Lista las 18 empresas
- `GET /api/zonas` → Lista las 45 zonas
- `GET /api/rutas` → Lista las 990 rutas
- `POST /api/cotizar` → Calcula precios

---

## 🏗️ Arquitectura
Usuario → React (Vercel)
↓
Node.js + Express (Render)
↓
MySQL (Aiven Cloud)


---

## 🚀 Instalación Local

```bash
# Clonar el repositorio
git clone https://github.com/eyarleque40-bot/proyecto-taxi.git
cd proyecto-taxi

# Backend
cd backend
npm install
# Crear archivo .env con las credenciales
npm run dev

# Frontend (en otra terminal)
cd ../frontend
npm install
npm run dev
📊 Base de Datos
Ejecutar el script database/taxi_compare_completo.sql en MySQL Workbench.
👨‍💻 Autor
Erick Yarleqe
GitHub: @eyarleque40-bot
Email: eyarleque40@gmail.com
📝 Licencia
MIT

text

---

### 📸 2. Capturas de pantalla

Crea una carpeta `screenshots/` y guarda capturas:
- La página principal
- Los resultados de comparación (con las 18 tarjetas)
- La consola de MySQL Workbench con las tablas
- El panel de Render mostrando el backend "Live"

Luego, en el README, agrega:

```markdown
## 📸 Capturas
el formulario:
<img width="679" height="567" alt="image" src="https://github.com/user-attachments/assets/5bac43af-1ef5-4a16-96a1-c67b2a4f8c22" />
los precios:
<img width="690" height="515" alt="image" src="https://github.com/user-attachments/assets/a6dd647d-9f09-4754-b33f-4a845da5d2a0" />
<img width="625" height="457" alt="image" src="https://github.com/user-attachments/assets/695f491d-473e-4ecf-9936-1a942b98c516" />

En "Website" pon: https://proyecto-taxi.vercel.app


pagina creado desde con mysql node.js react
https://proyecto-taxi.vercel.app/
