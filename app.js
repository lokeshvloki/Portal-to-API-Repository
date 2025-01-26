const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Serve static files directly
app.use(express.static(__dirname));

// Update the database connection to use the correct database name
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root', // Replace with your MySQL username if different
  password: '', // No password
  database: 'apikeyprovider', // Correct database name
});

// Connect to the database
db.connect((err) => {
  if (err) throw err;
  console.log('Connected to MySQL database');
});

// Fetch all APIs
app.get('/apis', (req, res) => {
  db.query('SELECT * FROM apis', (err, result) => {
    if (err) throw err;
    res.json(result);
  });
});

// Add new API
app.post('/apis', (req, res) => {
  const { name, description, website, email } = req.body;
  const sql = 'INSERT INTO apis (name, description, website, email) VALUES (?, ?, ?, ?)';
  db.query(sql, [name, description, website, email], (err, result) => {
    if (err) throw err;
    res.status(201).json({ id: result.insertId });
  });
});

// Submit a contact query
app.post('/contact', (req, res) => {
  const { name, email, query } = req.body;
  const sql = 'INSERT INTO contacts (name, email, query) VALUES (?, ?, ?)';
  db.query(sql, [name, email, query], (err) => {
    if (err) throw err;
    res.status(201).send('Query submitted');
  });
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
