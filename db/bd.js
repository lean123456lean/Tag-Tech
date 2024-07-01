
const sqlite3 = require('sqlite3').verbose();

const initDB = () => {
    const db = new sqlite3.Database(':memory:');

    // Criar tabelas
    db.serialize(() => {
        // Tabela de comentários
        db.run("CREATE TABLE IF NOT EXISTS comments (id INTEGER PRIMARY KEY AUTOINCREMENT, author TEXT, text TEXT)");

        // Tabela de usuários
        db.run("CREATE TABLE IF NOT EXISTS usuarios (id INTEGER PRIMARY KEY AUTOINCREMENT, nome TEXT, email TEXT)");
    });

    return db;
};

module.exports = { initDB };