// backend/controllers/adminController.js
const db = require('../config/db');
const PDFDocument = require('pdfkit');

// Dashboard statistik
exports.dashboard = async (req, res) => {
  try {
    const [[{ total_bookings }]] = await db.query('SELECT COUNT(*) as total_bookings FROM bookings');
    const [[{ total_revenue }]] = await db.query('SELECT SUM(total_price) as total_revenue FROM bookings WHERE status IN ("paid","processed","completed")');
    const [[{ total_customers }]] = await db.query('SELECT COUNT(DISTINCT email) as total_customers FROM bookings');
    const [[{ active_schedules }]] = await db.query('SELECT COUNT(*) as active_schedules FROM schedules WHERE status="active"');

    const [monthly] = await db.query(`
      SELECT DATE_FORMAT(created_at, '%Y-%m') as month, COUNT(*) as count, SUM(total_price) as revenue
      FROM bookings
      WHERE status != 'cancelled'
      GROUP BY month ORDER BY month DESC LIMIT 6
    `);

    res.json({
      total_bookings,
      total_revenue: total_revenue || 0,
      total_customers,
      active_schedules,
      monthly
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ==================== SCHEDULES ====================
exports.getSchedules = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT s.*, f.name as fleet_name FROM schedules s JOIN fleets f ON s.fleet_id = f.id');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createSchedule = async (req, res) => {
  try {
    const { origin, destination, departure_time, arrival_time, price, available_seats, fleet_id } = req.body;
    await db.query(
      'INSERT INTO schedules (origin, destination, departure_time, arrival_time, price, available_seats, fleet_id) VALUES (?,?,?,?,?,?,?)',
      [origin, destination, departure_time, arrival_time, price, available_seats, fleet_id]
    );
    res.status(201).json({ message: 'Schedule created' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateSchedule = async (req, res) => {
  try {
    const { id } = req.params;
    const { origin, destination, departure_time, arrival_time, price, available_seats, fleet_id, status } = req.body;
    await db.query(
      'UPDATE schedules SET origin=?, destination=?, departure_time=?, arrival_time=?, price=?, available_seats=?, fleet_id=?, status=? WHERE id=?',
      [origin, destination, departure_time, arrival_time, price, available_seats, fleet_id, status, id]
    );
    res.json({ message: 'Schedule updated' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteSchedule = async (req, res) => {
  try {
    await db.query('DELETE FROM schedules WHERE id=?', [req.params.id]);
    res.json({ message: 'Schedule deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ==================== FLEETS ====================
exports.getFleets = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM fleets');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createFleet = async (req, res) => {
  try {
    const { name, type, capacity, facilities } = req.body;
    const image = req.file ? `/uploads/${req.file.filename}` : '';
    await db.query(
      'INSERT INTO fleets (name, type, capacity, facilities, image) VALUES (?,?,?,?,?)',
      [name, type, capacity, facilities, image]
    );
    res.status(201).json({ message: 'Fleet created' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateFleet = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, type, capacity, facilities, status } = req.body;
    const image = req.file ? `/uploads/${req.file.filename}` : req.body.existing_image || '';
    await db.query(
      'UPDATE fleets SET name=?, type=?, capacity=?, facilities=?, image=?, status=? WHERE id=?',
      [name, type, capacity, facilities, image, status, id]
    );
    res.json({ message: 'Fleet updated' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteFleet = async (req, res) => {
  try {
    await db.query('DELETE FROM fleets WHERE id=?', [req.params.id]);
    res.json({ message: 'Fleet deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ==================== PACKAGES ====================
exports.getPackages = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM packages');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createPackage = async (req, res) => {
  try {
    const { name, destination, duration, price, itinerary } = req.body;
    const image = req.file ? `/uploads/${req.file.filename}` : '';
    await db.query(
      'INSERT INTO packages (name, destination, duration, price, itinerary, image) VALUES (?,?,?,?,?,?)',
      [name, destination, duration, price, itinerary, image]
    );
    res.status(201).json({ message: 'Package created' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updatePackage = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, destination, duration, price, itinerary } = req.body;
    const image = req.file ? `/uploads/${req.file.filename}` : req.body.existing_image || '';
    await db.query(
      'UPDATE packages SET name=?, destination=?, duration=?, price=?, itinerary=?, image=? WHERE id=?',
      [name, destination, duration, price, itinerary, image, id]
    );
    res.json({ message: 'Package updated' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deletePackage = async (req, res) => {
  try {
    await db.query('DELETE FROM packages WHERE id=?', [req.params.id]);
    res.json({ message: 'Package deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ==================== BOOKINGS ====================
exports.getBookings = async (req, res) => {
  try {
    const [rows] = await db.query(
      'SELECT b.*, s.departure_time, s.origin, s.destination FROM bookings b JOIN schedules s ON b.schedule_id = s.id ORDER BY b.created_at DESC'
    );
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.verifyPayment = async (req, res) => {
  try {
    await db.query('UPDATE bookings SET status="processed" WHERE id=?', [req.params.id]);
    res.json({ message: 'Payment verified, status updated to processed' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateBookingStatus = async (req, res) => {
  try {
    const { status } = req.body;
    await db.query('UPDATE bookings SET status=? WHERE id=?', [status, req.params.id]);
    res.json({ message: 'Booking status updated' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ==================== EXPORT ====================
exports.exportBookings = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM bookings');
    if (req.query.format === 'excel') {
      const csv = 'id,booking_code,customer_name,phone,email,total_price,status\n' +
        rows.map(r => `${r.id},${r.booking_code},${r.customer_name},${r.phone},${r.email},${r.total_price},${r.status}`).join('\n');
      res.header('Content-Type', 'text/csv');
      res.attachment('bookings.csv');
      return res.send(csv);
    }
    // PDF
    const doc = new PDFDocument();
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename=bookings.pdf');
    doc.pipe(res);
    doc.fontSize(16).text('Laporan Booking', { align: 'center' });
    rows.forEach(r => {
      doc.fontSize(12).text(`${r.booking_code} - ${r.customer_name} - Rp${r.total_price} - ${r.status}`);
    });
    doc.end();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};