const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Resolve path to DB inside Railway
const dbPath = path.resolve(__dirname, 'db/database.sqlite');

const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('❌ Could not connect to database:', err.message);
  } else {
    console.log('✅ Connected to database');
  }
});

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      phone TEXT UNIQUE NOT NULL,
      name TEXT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `, (err) => {
    if (err) {
      console.error('❌ Error creating users table:', err.message);
    } else {
      console.log('✅ Users table created or already exists');
    }
  });
});

db.close((err) => {
  if (err) {
    console.error('❌ Error closing the database:', err.message);
  } else {
    console.log('🔒 Closed database connection');
  }
});
