// server.js
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Conexión a MongoDB Atlas
mongoose.connect("mongodb+srv://gabrielcv20:abc132023@cineplusdb.xv9dgo9.mongodb.net/?retryWrites=true&w=majority&appName=CinePlusDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

.then(() => console.log('✅ Conectado a MongoDB Atlas'))
.catch((err) => console.error('❌ Error MongoDB:', err));

// Middleware para parsear JSON
app.use(express.json());

// Middleware para servir archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// API para obtener películas (si no existe aún)
app.use('/api/peliculas', require('./routes/peliculas'));

// Fallback para single page app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
