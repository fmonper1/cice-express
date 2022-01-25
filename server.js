const express = require("express");
const app = express();

app.use(express.json());

let peliculas = [
  { id: 0, name: "Gladiator", descripcion: "hola k ase" },
  { id: 1, name: "West Side Story" },
  { id: 3, name: "La pasion de cristo" },
  { id: 2, name: "No mires arriba" },
];

app.get("/", (req, res) => {
  res.json(usuarios);
});

// CRUD ----

// READ
app.get("/peliculas", (req, res) => {
  res.json(peliculas);
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
app.patch("/peliculas/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const nuevaPeli = req.body;

  peliculas.forEach((pelicula, indice) => {
    if (id === pelicula.id) {
      peliculas[indice] = { ...pelicula, ...nuevaPeli, id: id };
    }
  });
  res.json(peliculas);
});

// DELETE
app.delete("/peliculas/:id", (req, res) => {
  const id = parseInt(req.params.id);
  // const { id } = req.params;
  const nuevaLista = peliculas.filter((pelicula) => {
    return pelicula.id !== id;
  });
  peliculas = nuevaLista;
  res.json(nuevaLista);
});

// app.get("/users/:id", (req, res) => {
//   const userId = req.params.id;

//   const user = usuarios.find((user) => user.id == userId);
//   res.json(user);
// });

// const bodyIsEmpty = (body) => {
//   if (body === undefined) return true;
//   if (Object.keys(body).length === 0) return true;
//   return false;
// };

// app.post("/users", (req, res) => {
//   if (bodyIsEmpty(req.body)) {
//     res.status(400).send("La peticion esta malformada");
//   } else {
//     const newUser = req.body;
//     newUser.id = usuarios.length;
//     usuarios.push(newUser);
//     res.json(newUser);
//   }
// });

app.listen(3000, () => console.log("Ready on port 3000"));
