const express = require('express');
const router = express.Router();
const HomeController = require('../controllers/HomeController');

// Rutas de vistas
router.get('/', HomeController.index);

module.exports = router;
