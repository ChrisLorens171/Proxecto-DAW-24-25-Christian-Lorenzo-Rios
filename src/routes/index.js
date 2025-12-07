import express from 'express';
import HomeController from '../controllers/HomeController.js';

const router = express.Router();

// Rutas de vistas

// Ruta de inicio
router.get('/', HomeController.index);

// Ruta de página de contacto
router.get('/contact', HomeController.contact);

// Ruta de página sobre nosotros
router.get('/about', HomeController.about);

// Ruta de página de subastas
router.get('/subastas', HomeController.subastas);

// Ruta de página crear subasta
router.get('/subastas/crear', HomeController.crearSubasta);

export default router;
