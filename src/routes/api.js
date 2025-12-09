import express from 'express';
const router = express.Router();

// Importar controladores
import UsuarioController from '../controllers/UsuarioController.js';
import SubastaController from '../controllers/SubastaController.js';
import OfertaController from '../controllers/OfertaController.js';

// Importar middlewares de validación
import { validateUsuario } from '../middlewares/validation.js';

// ==================== AUTENTICACIÓN ====================

// Login de usuario
router.post('/login', UsuarioController.login);

// Logout de usuario
router.post('/logout', UsuarioController.logout);

// ==================== RUTAS DE USUARIOS ====================

// Crear usuario (con validación)
router.post('/usuarios', validateUsuario, UsuarioController.create);

// Obtener usuario por correo
router.get('/usuarios/correo/:correo', UsuarioController.getByCorreo);

// ==================== RUTAS DE SUBASTAS ====================

// Obtener todas las subastas
router.get('/subastas', SubastaController.getAll);

// Crear nueva subasta
router.post('/subastas/crear', SubastaController.create);

// Obtener subasta por ID
router.get('/subastas/:id', SubastaController.getById);

// Actualizar subasta
router.put('/subastas/:id', SubastaController.update);

// Eliminar subasta
router.delete('/subastas/:id', SubastaController.delete);

// ==================== RUTAS DE OFERTAS ====================

// Crear oferta (puja)
router.post('/ofertas', OfertaController.crear);

// Obtener ofertas de una subasta
router.get('/ofertas/subasta/:id', OfertaController.obtenerPorSubasta);

export default router;
