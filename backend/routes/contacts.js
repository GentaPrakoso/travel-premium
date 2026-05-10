// routes/contacts.js
const router = require('express').Router();
const contactController = require('../controllers/contactController');
router.post('/', contactController.create);
module.exports = router;