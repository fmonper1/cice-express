const express = require("express");
const cors = require("cors");
const app = express();

const routerPeliculas = require("./api/movies/movie.controller");

app.use(express.json());
app.use(cors());

app.use((req, res, next) => {
  console.log("he recibido una peticion");
  next();
});

app.use("/peliculas", routerPeliculas);

app.listen(5000, () => console.log("Ready on port 5000"));
