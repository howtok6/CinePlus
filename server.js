// server.js
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 8080;
const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");



console.log("Conectando a MongoDB URI:", process.env.MONGODB_URI);


// Conexión a MongoDB Atlas
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ Conectado a MongoDB Atlas'))
.catch((err) => console.error('❌ Error MongoDB:', err));

// Middleware para parsear JSON
app.use(express.json());

// Middleware para servir archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Ruta API para películas
const peliculasRoutes = require("./routes/peliculas");
app.use("/api/peliculas", peliculasRoutes);

// Fallback para single page app
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});



const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API de Películas",
      version: "1.0.0",
      description: "Documentación de la API del sistema de cine",
    },
  },
  apis: ["./routes/*.js"],
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));




// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
