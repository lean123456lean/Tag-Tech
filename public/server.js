
const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const app = express();
const port = 3000;

// Conectar ao banco de dados SQLite
const db = new sqlite3.Database('./comments.db', (err) => {
    if (err) {
        console.error('Erro ao conectar ao banco de dados SQLite:', err.message);
    } else {
        console.log('Conectado ao banco de dados SQLite');
        // Criar tabela de comentários se ainda não existir
        db.run(`CREATE TABLE IF NOT EXISTS comments (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            content TEXT NOT NULL
        )`);
    }
});

// Servir arquivos estáticos da pasta 'public'
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

// Rota para buscar todos os comentários
app.get('/api/comments', (req, res) => {
    db.all('SELECT * FROM comments ORDER BY id DESC', (err, rows) => {
        if (err) {
            console.error('Erro ao buscar comentários:', err.message);
            res.status(500).json({ error: 'Erro interno do servidor' });
        } else {
            res.json(rows);
        }
    });
});

// Rota para adicionar um novo comentário
app.post('/api/comments', (req, res) => {
    const { content } = req.body;
    if (!content) {
        return res.status(400).json({ error: 'O conteúdo do comentário é obrigatório' });
    }

    db.run('INSERT INTO comments (content) VALUES (?)', [content], function(err) {
        if (err) {
            console.error('Erro ao inserir comentário:', err.message);
            res.status(500).json({ error: 'Erro interno do servidor' });
        } else {
            const newCommentId = this.lastID;
            res.status(201).json({ id: newCommentId, content });
        }
    });
});

app.listen(port, () => {
    console.log(`Servidor está rodando em http://localhost:${port}`);
});



document.getElementById('comment-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const content = document.getElementById('comment-content').value;

    if (content) {
        fetch('/api/comments', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ content }),
        })
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                console.error('Erro:', data.error);
            } else {
                console.log('Comentário publicado com sucesso:', data);
                document.getElementById('comment-content').value = ''; // Limpa o campo de texto
                loadComments(); // Recarrega os comentários
            }
        })
        .catch((error) => {
            console.error('Erro:', error);
        });
    }
});

function loadComments() {
    fetch('/api/comments')
        .then(response => response.json())
        .then(data => {
            const commentsSection = document.getElementById('comments-section');
            commentsSection.innerHTML = '';
            data.forEach(comment => {
                const commentElement = document.createElement('div');
                commentElement.textContent = comment.content;
                commentsSection.appendChild(commentElement);
            });
        })
        .catch(error => {
            console.error('Erro ao carregar comentários:', error);
        });
}

// Carregar os comentários quando a página é carregada
document.addEventListener('DOMContentLoaded', loadComments);