const express = require('express');
const path = require('path');
const app = express();
const axios = require('axios');

// Définir le répertoire statique pour les fichiers Vue.js
app.use(express.static(path.join(__dirname, 'public')));

// Route principale pour servir le fichier HTML de l'application Vue.js
app.get('/', (req, res) => {
  axios.get('https://valorant-api.com/v1/agents')
  .then(response => {
    console.log(response.data);
  })
  .catch(error => {
    console.error(error);
  });
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// ... Autres routes et configurations Express
// Démarrer le serveur Express
app.listen(3001, () => {
  console.log('Serveur Express en cours d\'exécution sur le port 3001');
});