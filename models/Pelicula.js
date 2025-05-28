const mongoose = require('mongoose');

const peliculaSchema = new mongoose.Schema({
  titulo: String,
  imagen: String,
});

module.exports = mongoose.model('Pelicula', peliculaSchema);
