const fs = require("fs");
const express = require("express");
const app = express();
const rutaArchivo = "./info.json";

app.use(express.json());

// CRUD ----

// READ

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

app.get("/peliculas", (req, res) => {
  res.json(peliculas);
});

app.get("/peliculas/like", (req, res) => {
  const pelisLike = peliculas.filter((elemento, indice) => {
    return elemento.tieneLike;
  });
  res.json(pelisLike);
});

app.get("/peliculas/:id", (req, res) => {
  const id = parseInt(req.params.id);
  // const { id } = req.params;
  const laPelicula = peliculas.find((pelicula) => {
    return pelicula.id === id;
  });
  res.json(laPelicula);
});

// CREATE
app.post("/peliculas", (req, res) => {
  const nuevaPeli = req.body;
  const idPeli = peliculas.length;
  nuevaPeli.id = idPeli;
  peliculas.push(nuevaPeli);
  res.json(nuevaPeli);
});

// UPDATE
// peliculas/1/actores/extras
app.patch("/peliculas/:idPelicula", (req, res) => {
  const id = parseInt(req.params.idPelicula);
  const nuevaPeli = req.body;

  peliculas.forEach((pelicula, indice) => {
    if (id === pelicula.id) {
      peliculas[indice] = { ...pelicula, ...nuevaPeli, id: id };
    }
  });
  actualizarPeliculas(peliculas);
  res.json(peliculas);
});

app.patch("/peliculas/:idPelicula/like", (req, res) => {
  const id = parseInt(req.params.idPelicula);

  peliculas.forEach((pelicula, indice) => {
    if (id === pelicula.id) {
      peliculas[indice] = { ...pelicula, tieneLike: true };
      res.json(peliculas[indice]);
    }
  });
  actualizarPeliculas(peliculas);
});

app.patch("/peliculas/:idPelicula/unlike", (req, res) => {
  const id = parseInt(req.params.idPelicula);

  peliculas.forEach((pelicula, indice) => {
    if (id === pelicula.id) {
      peliculas[indice] = { ...pelicula, tieneLike: false };
      res.json(peliculas[indice]);
    }
  });
  actualizarPeliculas(peliculas);
});

// DELETE
app.delete("/peliculas/:id", (req, res) => {
  const id = parseInt(req.params.id);
  // const { id } = req.params;
  const nuevaLista = peliculas.filter((pelicula) => {
    return pelicula.id !== id;
  });
  peliculas = nuevaLista;
  actualizarPeliculas(peliculas);
  res.json(nuevaLista);
});

app.listen(3000, () => console.log("Ready on port 3000"));
