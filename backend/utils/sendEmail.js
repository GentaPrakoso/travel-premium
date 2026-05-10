const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

const sendBookingEmail = async (to, code, name, total) => {
  const mailOptions = {
    from: `"Travel Premium" <${process.env.SMTP_USER}>`,
    to,
    subject: 'Konfirmasi Booking - Travel Premium',
    html: `<h2>Halo ${name},</h2><p>Booking Anda berhasil dengan kode <strong>${code}</strong>.</p><p>Total: Rp${total.toLocaleString()}</p><p>Silakan upload bukti pembayaran untuk konfirmasi.</p>`
  };
  return transporter.sendMail(mailOptions);
};

const sendPaymentConfirmation = async (to, name, code) => {
  const mailOptions = {
    from: `"Travel Premium" <${process.env.SMTP_USER}>`,
    to,
    subject: 'Pembayaran Diterima - Travel Premium',
    html: `<h2>Halo ${name},</h2><p>Pembayaran untuk booking <strong>${code}</strong> telah kami terima.</p><p>Tiket digital dapat diunduh melalui link di website.</p>`
  };
  return transporter.sendMail(mailOptions);
};

module.exports = { sendBookingEmail, sendPaymentConfirmation };