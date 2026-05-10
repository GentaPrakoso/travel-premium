// controllers/contactController.js
const db = require('../config/db');
exports.create = async (req, res) => {
  const { name, email, subject, message } = req.body;
  await db.query('INSERT INTO contacts (name, email, subject, message) VALUES (?,?,?,?)', [name, email, subject, message]);
  res.status(201).json({ message: 'Pesan terkirim' });
};