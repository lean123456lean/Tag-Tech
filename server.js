
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { initDB } = require('./db/db'); // Importar a função initDB do arquivo db.js

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Configurar banco de dados SQLite
const db = initDB(); // Inicializar o banco de dados

// Rota para obter todos os comentários
app.get('/comments', (req, res) => {
    db.all("SELECT * FROM comments", (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json(rows);
    });
});

// Rota para adicionar um novo comentário
app.post('/comments', (req, res) => {
    const { author, text } = req.body;
    const stmt = db.prepare("INSERT INTO comments (author, text) VALUES (?, ?)");
    stmt.run(author, text, function(err) {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({ id: this.lastID, author, text });
    });
    stmt.finalize();
});

// Iniciar o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});


