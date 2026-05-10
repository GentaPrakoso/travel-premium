const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookingController');
const upload = require('../middleware/upload');

router.post('/', bookingController.create);
router.post('/upload-payment/:code', upload.single('payment_proof'), bookingController.uploadPayment);
router.get('/lookup/:code', bookingController.lookup);
router.get('/ticket/:code', bookingController.getTicket);

module.exports = router;