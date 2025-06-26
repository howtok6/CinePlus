require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");

const app = express();
const PORT = process.env.PORT || 8080;

// 🔧 Conexión a MongoDB
console.log("Conectando a MongoDB URI:", process.env.MONGO_URI);
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ Conectado a MongoDB Atlas'))
.catch((err) => console.error('❌ Error MongoDB:', err));

// 🔧 Middleware JSON
app.use(express.json());

// 🔧 Archivos estáticos desde "public"
app.use(express.static(path.join(__dirname, 'public')));

// 🔧 Rutas API
const peliculasRoutes = require("./routes/peliculas");
app.use("/api/peliculas", peliculasRoutes);

// 🔧 Swagger
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

// ✅ Fallback solo para la raíz
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// ✅ Ruta catch-all (opcional, si no usas SPA)
app.get("*", (req, res) => {
  res.status(404).send("Página no encontrada");
});

// 🚀 Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
