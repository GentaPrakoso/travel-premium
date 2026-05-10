// routes/fleets.js
const router = require('express').Router();
const fleetController = require('../controllers/fleetController');
router.get('/', fleetController.getAll);
router.get('/:id', fleetController.getById);
// Admin routes handled in admin.js
module.exports = router;