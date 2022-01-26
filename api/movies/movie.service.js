const fs = require("fs");
const rutaArchivo = "./info.json";

const leerArchivo = () => {
  const contenido = fs.readFileSync(rutaArchivo);
  const object = JSON.parse(contenido.toString());
  return object.data;
};
const actualizarPeliculas = (peliculas) => {
  const objeto = { data: peliculas };
  // descomentar para ver los diferentes formatos
  // console.log(peliculas);
  // console.log(peliculas.toString());
  // console.log(objeto);
  // console.log(JSON.stringify(objeto));
  fs.writeFile(rutaArchivo, JSON.stringify(objeto), (err) => {
    if (err) {
      console.error("error");
      return;
    }
    console.log("archivo actualizado");
  });
};

let peliculas = leerArchivo();

const movieService = {};

movieService.getTodasLasPeliculas = (req, res) => {
  res.json(peliculas);
};

movieService.getPeliculasConLikes = (req, res) => {
  const pelisLike = peliculas.filter((elemento, indice) => {
    return elemento.tieneLike;
  });
  res.json(pelisLike);
};

movieService.getPeliculaPorId = (req, res) => {
  const id = parseInt(req.params.id);
  // const { id } = req.params;
  const laPelicula = peliculas.find((pelicula) => {
    return pelicula.id === id;
  });
  res.json(laPelicula);
};

movieService.crearPelicula = (req, res) => {
  const nuevaPeli = req.body;
  const idPeli = peliculas.length;
  nuevaPeli.id = idPeli;
  peliculas.push(nuevaPeli);
  res.json(nuevaPeli);
};

movieService.actualizarPelicula = (req, res) => {
  const id = parseInt(req.params.idPelicula);
  const nuevaPeli = req.body;

  peliculas.forEach((pelicula, indice) => {
    if (id === pelicula.id) {
      peliculas[indice] = { ...pelicula, ...nuevaPeli, id: id };
    }
  });
  actualizarPeliculas(peliculas);
  res.json(peliculas);
};

movieService.darLikeAPelicula = (req, res) => {
  const id = parseInt(req.params.idPelicula);

  peliculas.forEach((pelicula, indice) => {
    if (id === pelicula.id) {
      peliculas[indice] = { ...pelicula, tieneLike: true };
      res.json(peliculas[indice]);
    }
  });
  actualizarPeliculas(peliculas);
};

movieService.quitarLikeAPelicula = (req, res) => {
  const id = parseInt(req.params.idPelicula);

  peliculas.forEach((pelicula, indice) => {
    if (id === pelicula.id) {
      peliculas[indice] = { ...pelicula, tieneLike: false };
      res.json(peliculas[indice]);
    }
  });
  actualizarPeliculas(peliculas);
};

movieService.eliminarPelicula = (req, res) => {
  const id = parseInt(req.params.id);
  // const { id } = req.params;
  const nuevaLista = peliculas.filter((pelicula) => {
    return pelicula.id !== id;
  });
  peliculas = nuevaLista;
  actualizarPeliculas(peliculas);
  res.json(nuevaLista);
};
module.exports = movieService;
