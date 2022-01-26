const express = require("express");
const router = express.Router();

const movieService = require("./movie.service");

router.get("/", movieService.getTodasLasPeliculas);

router.get("/like", movieService.getPeliculasConLikes);

router.get("/:id", movieService.getPeliculaPorId);

router.post("", movieService.crearPelicula);

router.patch("/:idPelicula", movieService.actualizarPelicula);

router.patch("/:idPelicula/like", movieService.darLikeAPelicula);

router.patch("/:idPelicula/unlike", movieService.quitarLikeAPelicula);

router.delete("/:id", movieService.eliminarPelicula);

module.exports = router;
