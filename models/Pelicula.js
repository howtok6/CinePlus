const mongoose = require('mongoose');

const PeliculaSchema = new mongoose.Schema({
  titulo: {
    type: String,
    required: true
  },
  imagen: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model("Pelicula", PeliculaSchema);
