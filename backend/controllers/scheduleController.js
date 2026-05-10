const db = require('../config/db');

exports.getAll = async (req, res) => {
  try {
    const { origin, destination, date } = req.query;
    let query = `SELECT s.*, f.name as fleet_name, f.type as fleet_type
                 FROM schedules s
                 JOIN fleets f ON s.fleet_id = f.id
                 WHERE s.status = 'active'`;
    const params = [];

    if (origin) { query += ' AND s.origin LIKE ?'; params.push(`%${origin}%`); }
    if (destination) { query += ' AND s.destination LIKE ?'; params.push(`%${destination}%`); }
    if (date) { query += ' AND DATE(s.departure_time) = ?'; params.push(date); }

    query += ' ORDER BY s.departure_time ASC';
    const [rows] = await db.query(query, params);
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

exports.getById = async (req, res) => {
  try {
    const [rows] = await db.query(
      `SELECT s.*, f.name as fleet_name, f.type as fleet_type, f.facilities
       FROM schedules s
       JOIN fleets f ON s.fleet_id = f.id
       WHERE s.id = ?`,
      [req.params.id]
    );
    if (rows.length === 0) return res.status(404).json({ error: 'Schedule not found' });
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};