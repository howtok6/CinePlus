// routes/peliculas.js
const express = require('express');
const router = express.Router();
const Pelicula = require('../models/Pelicula');

router.get('/', async (req, res) => {
  try {
    const peliculas = await Pelicula.find();
    res.json(peliculas);
  } catch (error) {
    console.error("Error al consultar MongoDB:", err);
    res.status(500).json({ error: 'Error al obtener películas' });
  }
});

module.exports = router;
