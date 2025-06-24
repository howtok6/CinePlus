const request = require("supertest");
const express = require("express");
const mongoose = require("mongoose");
const peliculasRoutes = require("../routes/peliculas");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use("/api/peliculas", peliculasRoutes);

beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
});

afterAll(async () => {
  await mongoose.disconnect();
});

describe("GET /api/peliculas", () => {
  it("debería responder con un array de películas con enlaces HATEOAS", async () => {
    const res = await request(app).get("/api/peliculas");
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    if (res.body.length > 0) {
      expect(res.body[0]).toHaveProperty("_links");
      expect(res.body[0]._links).toHaveProperty("self");
    }
  });
});
