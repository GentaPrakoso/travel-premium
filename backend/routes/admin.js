// backend/routes/admin.js
const router = require('express').Router();
const adminController = require('../controllers/adminController');
const auth = require('../middleware/auth');
const upload = require('../middleware/upload');

// Semua route admin butuh login (middleware auth)
// Dashboard
router.get('/dashboard', auth, adminController.dashboard);

// Schedules CRUD
router.get('/schedules', auth, adminController.getSchedules);
router.post('/schedules', auth, adminController.createSchedule);
router.put('/schedules/:id', auth, adminController.updateSchedule);
router.delete('/schedules/:id', auth, adminController.deleteSchedule);

// Fleets CRUD
router.get('/fleets', auth, adminController.getFleets);
router.post('/fleets', auth, upload.single('image'), adminController.createFleet);
router.put('/fleets/:id', auth, upload.single('image'), adminController.updateFleet);
router.delete('/fleets/:id', auth, adminController.deleteFleet);

// Packages CRUD
router.get('/packages', auth, adminController.getPackages);
router.post('/packages', auth, upload.single('image'), adminController.createPackage);
router.put('/packages/:id', auth, upload.single('image'), adminController.updatePackage);
router.delete('/packages/:id', auth, adminController.deletePackage);

// Bookings management
router.get('/bookings', auth, adminController.getBookings);
router.put('/bookings/:id/verify', auth, adminController.verifyPayment);
router.put('/bookings/:id/status', auth, adminController.updateBookingStatus);

// Export
router.get('/export-bookings', auth, adminController.exportBookings);

module.exports = router;