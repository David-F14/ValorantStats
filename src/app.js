const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('Bonjour, bienvenue sur mon site Web!');
});

app.listen(3001, () => {
  console.log('Le serveur est en écoute sur le port 3001!');
});
