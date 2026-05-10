// controllers/packageController.js
const db = require('../config/db');
exports.getAll = async (req, res) => { const [rows] = await db.query('SELECT * FROM packages'); res.json(rows); };
exports.getById = async (req, res) => { const [rows] = await db.query('SELECT * FROM packages WHERE id = ?', [req.params.id]); res.json(rows[0] || {}); };