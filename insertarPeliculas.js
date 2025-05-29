require("dotenv").config();
const mongoose = require("mongoose");
const Pelicula = require("./models/Pelicula");

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log("Conectado a MongoDB");

  return Pelicula.insertMany([
    { titulo: 'Dune', imagen: 'dune.jpg' },
    { titulo: 'Interstellar', imagen: 'interstellar.jpg' },
    { titulo: 'Tenet', imagen: 'tenet.jpg' },
    { titulo: 'Inception', imagen: 'inception.jpg' },
    { titulo: 'Matrix', imagen: 'matrix.jpg' },
    { titulo : 'Sonic', imagen: 'sonic.jpg'}
  ]);

})
.then(() => {
  console.log("Películas insertadas correctamente");
  return mongoose.disconnect();
})
.catch((error) => {
  console.error("Error insertando películas:", error);
});
