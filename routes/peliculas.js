
const express = require("express");
const router = express.Router();
const Pelicula = require("../models/Pelicula");

router.get("/", async (req, res) => {
  const peliculas = await Pelicula.find();
  res.json(peliculas);
});

module.exports = router;
