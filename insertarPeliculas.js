require('dotenv').config();
const mongoose = require('mongoose');
const Pelicula = require('./models/Pelicula');

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(async () => {
  console.log("📦 Conectado a MongoDB");

  const nuevasPeliculas = [
    {
      titulo: "Dune: Parte Dos",
      imagen: "dune.jpg",
      descripcion: "Paul Atreides se une a los Fremen.",
      categoria: "Ciencia Ficción",
      estreno: "2024-03-01"
    },
    {
      titulo: "Intensamente 2",
      imagen: "intensamente2.jpg",
      descripcion: "Nuevas emociones llegan a la cabeza de Riley.",
      categoria: "Animación",
      estreno: "2024-06-14"
    }
  ];

  await Pelicula.insertMany(nuevasPeliculas);
  console.log("🎬 Películas añadidas");
  mongoose.connection.close();
});
