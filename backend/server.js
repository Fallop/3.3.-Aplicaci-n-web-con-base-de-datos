const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

// Simulación de base de datos
let usuarios = [
  { id: 1, name: 'Juan Pérez', email: 'juan@example.com' },
  { id: 2, name: 'María Gómez', email: 'maria@example.com' }
];

// Consultar todos los usuarios
app.get('/usuarios', (req, res) => {
  res.json(usuarios);
});

// Consultar un usuario por ID
app.get('/usuarios/:id', (req, res) => {
  const usuario = usuarios.find(u => u.id == req.params.id);
  usuario ? res.json(usuario) : res.status(404).send('No encontrado');
});

// Agregar usuario
app.post('/usuarios', (req, res) => {
  const nuevo = { id: Date.now(), ...req.body };
  usuarios.push(nuevo);
  res.json(nuevo);
});

// Editar usuario
app.put('/usuarios/:id', (req, res) => {
  const idx = usuarios.findIndex(u => u.id == req.params.id);
  if (idx !== -1) {
    usuarios[idx] = { ...usuarios[idx], ...req.body };
    res.json(usuarios[idx]);
  } else {
    res.status(404).send('No encontrado');
  }
});

// Eliminar usuario
app.delete('/usuarios/:id', (req, res) => {
  usuarios = usuarios.filter(u => u.id != req.params.id);
  res.json({ message: 'Eliminado' });
});

app.listen(port, () => console.log(`API corriendo en puerto ${port}`));
