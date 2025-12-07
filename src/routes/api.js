import express from 'express';
const router = express.Router();

// Importar controladores
import UsuarioController from '../controllers/UsuarioController.js';

// Importar middlewares de validación
import { validateUsuario } from '../middlewares/validation.js';

// ==================== AUTENTICACIÓN ====================

// Login de usuario
router.post('/login', UsuarioController.login);

// ==================== RUTAS DE USUARIOS ====================

// Crear usuario (con validación)
router.post('/usuarios', 
    validateUsuario,
    UsuarioController.create
);

// Obtener usuario por correo
router.get('/usuarios/correo/:correo', UsuarioController.getByCorreo);

export default router;
