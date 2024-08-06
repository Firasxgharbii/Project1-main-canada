const express = require('express');
const path = require('path');
const app = express();
const port = 8080; // Vous pouvez utiliser n'importe quel port disponible

// Servir les fichiers statiques (HTML, CSS, JS, images)
app.use(express.static(path.join(__dirname, '')));

// Démarrer le serveur
app.listen(port, () => {
    console.log(`Serveur de fichiers en écoute sur http://localhost:${port}`);
});
