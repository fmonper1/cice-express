const express = require("express");
const app = express();

const routerPeliculas = require("./api/movies/movie.controller");

app.use(express.json());

app.use((req, res, next) => {
  console.log("he recibido una peticion");
  next();
});

app.use("/peliculas", routerPeliculas);

app.listen(3000, () => console.log("Ready on port 3000"));
