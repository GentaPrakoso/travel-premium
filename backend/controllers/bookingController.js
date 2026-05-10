const db = require('../config/db');
const qrcode = require('qrcode');
const { sendBookingEmail, sendPaymentConfirmation } = require('../utils/sendEmail');
const { v4: uuidv4 } = require('uuid'); // nanti install
// Karena tanpa uuid, kita gunakan random code sederhana
function generateBookingCode() {
  return 'TRV-' + Math.random().toString(36).substring(2, 8).toUpperCase();
}

exports.create = async (req, res) => {
  const { customer_name, phone, email, origin, destination, pickup_point, passengers, seat_numbers, schedule_id, payment_method } = req.body;
  const conn = await db.getConnection();
  try {
    await conn.beginTransaction();

    // Get schedule price
    const [schedules] = await conn.query('SELECT price, available_seats FROM schedules WHERE id = ? AND status = "active"', [schedule_id]);
    if (schedules.length === 0) throw new Error('Schedule not available');
    const schedule = schedules[0];

    const total_price = schedule.price * passengers;

    // Check seat availability
    if (schedule.available_seats < passengers) throw new Error('Not enough seats');

    const booking_code = generateBookingCode();

    await conn.query(
      `INSERT INTO bookings (booking_code, customer_name, phone, email, origin, destination, pickup_point, passengers, seat_numbers, schedule_id, total_price, payment_method, status)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'pending')`,
      [booking_code, customer_name, phone, email, origin, destination, pickup_point, passengers, seat_numbers, schedule_id, total_price, payment_method]
    );

    // Decrease available seats
    await conn.query('UPDATE schedules SET available_seats = available_seats - ? WHERE id = ?', [passengers, schedule_id]);

    await conn.commit();

    // Send notification email
    try {
      await sendBookingEmail(email, booking_code, customer_name, total_price);
    } catch (emailErr) {
      console.error('Email sending failed:', emailErr);
    }

    // Generate QR code data URL (for later use)
    const qrData = `${process.env.BASE_URL}/ticket/${booking_code}`; // kita bisa buat route untuk itu tetapi tidak wajib
    const qr = await qrcode.toDataURL(qrData);

    res.status(201).json({ booking_code, total_price, qr_code: qr });
  } catch (err) {
    await conn.rollback();
    res.status(400).json({ error: err.message });
  } finally {
    conn.release();
  }
};

exports.uploadPayment = async (req, res) => {
  const { code } = req.params;
  try {
    if (!req.file) return res.status(400).json({ error: 'No file uploaded' });

    const payment_proof = `/uploads/${req.file.filename}`;
    await db.query('UPDATE bookings SET payment_proof = ?, status = "paid" WHERE booking_code = ?', [payment_proof, code]);

    // Send confirmation
    const [booking] = await db.query('SELECT email, customer_name FROM bookings WHERE booking_code = ?', [code]);
    if (booking.length > 0) {
      await sendPaymentConfirmation(booking[0].email, booking[0].customer_name, code);
    }

    res.json({ message: 'Payment proof uploaded successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.lookup = async (req, res) => {
  try {
    const [rows] = await db.query(
      `SELECT b.*, s.departure_time, s.arrival_time, f.name as fleet_name
       FROM bookings b
       JOIN schedules s ON b.schedule_id = s.id
       JOIN fleets f ON s.fleet_id = f.id
       WHERE b.booking_code = ?`,
      [req.params.code]
    );
    if (rows.length === 0) return res.status(404).json({ error: 'Booking not found' });
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getTicket = async (req, res) => {
  try {
    const booking = await exports.lookupByCode(req.params.code);
    const qrData = `${process.env.BASE_URL}/ticket/${booking.booking_code}`;
    const qr = await qrcode.toDataURL(qrData);
    res.json({ ...booking, qr_code: qr });
  } catch (err) {
    res.status(404).json({ error: 'Ticket not found' });
  }
};

// helper
exports.lookupByCode = async (code) => {
  const [rows] = await db.query(
    `SELECT b.*, s.departure_time, s.arrival_time, s.origin, s.destination, f.name as fleet_name
     FROM bookings b
     JOIN schedules s ON b.schedule_id = s.id
     JOIN fleets f ON s.fleet_id = f.id
     WHERE b.booking_code = ?`,
    [code]
  );
  if (rows.length === 0) throw new Error('Booking not found');
  return rows[0];
};