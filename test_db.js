
const sqlite3 = require('sqlite3').verbose();

// Conectar ao banco de dados SQLite
const db = new sqlite3.Database('./test.db', (err) => {
    if (err) {
        console.error('Erro ao conectar ao banco de dados SQLite:', err.message);
    } else {
        console.log('Conectado ao banco de dados SQLite');
        // Criar tabela de teste
        db.run(`CREATE TABLE IF NOT EXISTS test_table (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            content TEXT NOT NULL
        )`, (err) => {
            if (err) {
                console.error('Erro ao criar tabela:', err.message);
            } else {
                console.log('Tabela criada ou já existente');
                // Inserir dados na tabela de teste
                db.run(`INSERT INTO test_table (content) VALUES (?)`, ['Test Content'], function(err) {
                    if (err) {
                        console.error('Erro ao inserir dados:', err.message);
                    } else {
                        console.log(`Dados inseridos com sucesso, ID: ${this.lastID}`);
                        // Consultar dados da tabela de teste
                        db.all(`SELECT * FROM test_table`, (err, rows) => {
                            if (err) {
                                console.error('Erro ao consultar dados:', err.message);
                            } else {
                                console.log('Dados consultados com sucesso:', rows);
                                // Fechar a conexão ao banco de dados
                                db.close((err) => {
                                    if (err) {
                                        console.error('Erro ao fechar a conexão:', err.message);
                                    } else {
                                        console.log('Conexão ao banco de dados fechada');
                                    }
                                });
                            }
                        });
                    }
                });
            }
        });
    }
});