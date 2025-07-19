const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.join(__dirname, '../../db/database.sqlite');
const db = new sqlite3.Database(dbPath);

// 📥 GET all users
exports.getAllUsers = (req, res) => {
  db.all('SELECT * FROM users', (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(rows);
  });
};

// ➕ POST add new user
exports.addUser = (req, res) => {
  const { name, phone } = req.body;
  if (!name || !phone) {
    return res.status(400).json({ error: 'Name and phone are required' });
  }

  db.run('INSERT INTO users (name, phone) VALUES (?, ?)', [name, phone], function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json({ id: this.lastID, name, phone });
  });
};
