import express from 'express';
import HomeController from '../controllers/HomeController.js';
import { requireAuth, requireVendedor } from '../middlewares/security.js';

const router = express.Router();

// Rutas de vistas

// Ruta de inicio (pública)
router.get('/', HomeController.index);

// Ruta de página de contacto (pública)
router.get('/contact', HomeController.contact);

// Ruta de página sobre nosotros (pública)
router.get('/about', HomeController.about);

// Ruta de página de subastas (protegida)
router.get('/subastas', requireAuth, HomeController.subastas);

// Ruta de página crear subasta (protegida - solo vendedor o admin)
router.get('/subastas/crear', requireVendedor, HomeController.crearSubasta);

// Ruta de página editar subasta (protegida - solo vendedor o admin)
router.get('/subastas/editar/:id', requireVendedor, HomeController.editarSubasta);

export default router;
