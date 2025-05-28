// scripts/poblarPeliculas.js
const mongoose = require('mongoose');
require('dotenv').config();
const Pelicula = require('./models/Pelicula');

const peliculas = [
  {
    titulo: "Dune",
    imagen: "dune.png",
  },
  {
    titulo: "Interstellar",
    imagen: "interstellar.jpg",
  },
  {
    titulo: "Avatar",
    imagen: "avatar.png",
  },
  {
    titulo: "Oppenheimer",
    imagen: "oppenheimer.jpg",
  },
];

async function poblar() {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    await Pelicula.deleteMany({});
    await Pelicula.insertMany(peliculas);
    console.log("Películas insertadas correctamente.");
    process.exit();
  } catch (error) {
    console.error("Error al poblar películas:", error);
    process.exit(1);
  }
}

poblar();
