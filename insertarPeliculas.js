const mongoose = require('mongoose');
const Pelicula = require('./models/Pelicula');
require('dotenv').config();

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(async () => {
  console.log('Conectado a MongoDB');

  const peliculas = [
    { titulo: 'Dune', imagen: 'dune.jpg' },
    { titulo: 'Interstellar', imagen: 'interstellar.jpg' },
    { titulo: 'Tenet', imagen: 'tenet.jpg' },
    { titulo: 'Inception', imagen: 'inception.jpg' },
    { titulo: 'Matrix', imagen: 'matrix.jpg' },
  ];

  await Pelicula.insertMany(peliculas);
  console.log('Películas insertadas');

  mongoose.disconnect();
}).catch(err => {
  console.error('Error al conectar a MongoDB', err);
});
