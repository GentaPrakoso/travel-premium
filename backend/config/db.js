const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'travel_premium',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// TEST KONEKSI DATABASE
async function testConnection() {
  try {
    const connection = await pool.getConnection();
    console.log('Database berhasil terhubung!');
    connection.release();
  } catch (error) {
    console.log('Database gagal terhubung!');
    console.log(error);
  }
}

testConnection();

module.exports = pool;