const express = require('express');
const app = express();
const path = require('path');
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/usuarios', (req, res) => res.json(usuarios));

app.get('/usuarios/:id', (req, res) => {
  const u = usuarios.find(user => user.id == req.params.id);
  u ? res.json(u) : res.status(404).send('No encontrado');
});

app.post('/usuarios', (req, res) => {
  const nuevo = { id: Date.now(), ...req.body };
  usuarios.push(nuevo);
  res.json(nuevo);
});

app.put('/usuarios/:id', (req, res) => {
  const idx = usuarios.findIndex(u => u.id == req.params.id);
  if (idx !== -1) {
    usuarios[idx] = { ...usuarios[idx], ...req.body };
    res.json(usuarios[idx]);
  } else {
    res.status(404).send('No encontrado');
  }
});

app.delete('/usuarios/:id', (req, res) => {
  usuarios = usuarios.filter(u => u.id != req.params.id);
  res.json({ message: 'Eliminado' });
});

app.listen(port, () => console.log(`Servidor en puerto ${port}`));
