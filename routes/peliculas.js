const express = require('express');
const router = express.Router();
const Pelicula = require('../models/Pelicula');

// Obtener todas las películas
router.get('/', async (req, res) => {
  try {
    const peliculas = await Pelicula.find();
    console.log("Películas desde la base de datos:", peliculas);

    res.json(peliculas);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener películas' });
  }
});

// Obtener película por ID
router.get('/:id', async (req, res) => {
  try {
    const pelicula = await Pelicula.findById(req.params.id);
    if (!pelicula) return res.status(404).json({ error: 'Película no encontrada' });
    res.json(pelicula);
  } catch (error) {
    res.status(500).json({ error: 'Error al buscar la película' });
  }
});

// Crear nueva película
router.post('/', async (req, res) => {
  try {
    const nuevaPelicula = new Pelicula(req.body);
    await nuevaPelicula.save();
    res.status(201).json(nuevaPelicula);
  } catch (error) {
    res.status(400).json({ error: 'Error al crear la película' });
  }
});

// Actualizar película
router.put('/:id', async (req, res) => {
  try {
    const peliculaActualizada = await Pelicula.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!peliculaActualizada) return res.status(404).json({ error: 'Película no encontrada' });
    res.json(peliculaActualizada);
  } catch (error) {
    res.status(400).json({ error: 'Error al actualizar la película' });
  }
});

// Eliminar película
router.delete('/:id', async (req, res) => {
  try {
    const peliculaEliminada = await Pelicula.findByIdAndDelete(req.params.id);
    if (!peliculaEliminada) return res.status(404).json({ error: 'Película no encontrada' });
    res.json({ mensaje: 'Película eliminada correctamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar la película' });
  }
});

module.exports = router;
