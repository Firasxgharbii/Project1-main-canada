const express = require('express');
const mysql = require('mysql');
const app = express();
const port = 3308;

// Middleware pour parser les requêtes JSON
app.use(express.json());

// Connexion à la base de données MariaDB
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'mama12',
    database: 'feng_Db'
});

connection.connect((err) => {
    if (err) {
        console.error('Erreur de connexion à la base de données:', err.stack);
        return;
    }
    console.log('Connecté à la base de données avec l\'ID', connection.threadId);
});

// Route de recherche
app.get('/search', (req, res) => {
    const query = req.query.q;
    console.log('Requête de recherche reçue:', query);
    const sql = 'SELECT * FROM produits WHERE LOWER(nom) LIKE ?';
    connection.query(sql, [`%${query.toLowerCase()}%`], (err, results) => {
        if (err) {
            console.error('Erreur lors de l\'exécution de la requête SQL:', err);
            return res.status(500).json({ error: err.message });
        }
        console.log('Résultats de la recherche:', results);
        res.json(results);
    });
});

// Démarrer le serveur
app.listen(port, '0.0.0.0', () => {
    console.log(`Serveur en écoute sur http://localhost:${port}`);
});
