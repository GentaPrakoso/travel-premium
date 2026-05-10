// controllers/fleetController.js
const db = require('../config/db');
exports.getAll = async (req, res) => {
  const [rows] = await db.query('SELECT * FROM fleets WHERE status="active"');
  res.json(rows);
};
exports.getById = async (req, res) => {
  const [rows] = await db.query('SELECT * FROM fleets WHERE id = ?', [req.params.id]);
  res.json(rows[0] || {});
};