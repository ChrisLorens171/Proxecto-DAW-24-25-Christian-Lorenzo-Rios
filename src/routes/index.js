const express = require('express');
const router = express.Router();
const HomeController = require('../controllers/HomeController');

// Rutas de vistas

// Ruta de inicio
router.get('/', HomeController.index);

// Ruta de página de contacto
router.get('/contact', HomeController.contact);

// Ruta de página sobre nosotros
router.get('/about', HomeController.about);

module.exports = router;
