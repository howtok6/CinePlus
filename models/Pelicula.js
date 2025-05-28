const mongoose = require('mongoose');

const peliculaSchema = new mongoose.Schema({
  titulo: String,
  imagen: String,
  descripcion: String,
  categoria: String,
  estreno: Date
});

module.exports = mongoose.model('Pelicula', peliculaSchema);
