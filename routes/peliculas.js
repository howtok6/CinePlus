const express = require("express");
const router = express.Router();
const Pelicula = require("../models/Pelicula");

/**
 * @swagger
 * /api/peliculas:
 *   get:
 *     summary: Obtener todas las películas
 *     responses:
 *       200:
 *         description: Lista de películas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 */
router.get("/", async (req, res) => {
  try {
    const peliculas = await Pelicula.find();
    const peliculasConLinks = peliculas.map(p => ({
      ...p.toObject(),
      _links: {
        self: { href: `/api/peliculas/${p._id}` },
        delete: { href: `/api/peliculas/${p._id}`, method: "DELETE" },
        update: { href: `/api/peliculas/${p._id}`, method: "PUT" }
      }
    }));
    res.json(peliculasConLinks);
  } catch (err) {
    res.status(500).json({ error: "Error al obtener películas" });
  }
});

module.exports = router;
