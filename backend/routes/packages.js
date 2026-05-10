// routes/packages.js
const router = require('express').Router();
const packageController = require('../controllers/packageController');
router.get('/', packageController.getAll);
router.get('/:id', packageController.getById);
module.exports = router;