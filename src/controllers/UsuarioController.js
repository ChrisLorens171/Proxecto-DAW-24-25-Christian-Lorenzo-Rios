import Usuario from '../models/Usuario.js';
import bcrypt from 'bcrypt';

class UsuarioController {
    // Login de usuario
    static async login(req, res) {
        try {
            const { correo, contrasinal } = req.body;

            if (!correo || !contrasinal) {
                return res.status(400).json({
                    success: false,
                    message: 'Correo y contraseña son requeridos'
                });
            }

            // Buscar usuario por correo
            const usuario = await Usuario.obtenerPorCorreo(correo);
            
            if (!usuario) {
                return res.status(401).json({
                    success: false,
                    message: 'Correo o contraseña incorrectos'
                });
            }

            // Verificar contraseña con bcrypt
            const isMatch = await bcrypt.compare(contrasinal, usuario.contrasinal);
            if (!isMatch) {
                return res.status(401).json({
                    success: false,
                    message: 'Correo o contraseña incorrectos'
                });
            }

            // Verificar que el usuario esté activo
            if (usuario.estado !== 'activo') {
                return res.status(403).json({
                    success: false,
                    message: 'Usuario inactivo. Contacta al administrador.'
                });
            }

            // Datos del usuario sin la contraseña
            const datosUsuario = {
                id_usuario: usuario.id_usuario,
                nome: usuario.nome,
                correo: usuario.correo,
                tipo: usuario.tipo,
                estado: usuario.estado,
                cif_nif: usuario.cif_nif
            };

            // Guardar en sesión del servidor
            req.session.usuario = datosUsuario;

            // Login exitoso - retornar datos del usuario con redirección
            res.json({
                success: true,
                message: 'Login exitoso',
                data: datosUsuario,
                redirect: '/subastas'
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message
            });
        }
    }

    // Logout de usuario
    static async logout(req, res) {
        try {
            // Destruir la sesión
            req.session.destroy((err) => {
                if (err) {
                    return res.status(500).json({
                        success: false,
                        message: 'Error al cerrar sesión'
                    });
                }

                // Limpiar cookie
                res.clearCookie('connect.sid');
                
                res.json({
                    success: true,
                    message: 'Sesión cerrada correctamente'
                });
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message
            });
        }
    }

    // Crear un nuevo usuario
    static async create(req, res) {
        try {            
            const { correo, contrasinal, nome, tipo, estado, cif_nif } = req.body;

            // Validaciones básicas
            if (!correo || !contrasinal || !nome || !tipo) {
                return res.status(400).json({
                    success: false,
                    message: 'Faltan campos requeridos: correo, contrasinal, nome y tipo son obligatorios'
                });
            }

            // Verificar si el correo ya existe
            const usuarioExistente = await Usuario.obtenerPorCorreo(correo);
            if (usuarioExistente) {
                return res.status(409).json({
                    success: false,
                    message: 'El correo ya está registrado'
                });
            }

            // Hash de la contraseña
            const hashedPassword = await bcrypt.hash(contrasinal, 10);

            const id = await Usuario.crear({
                correo,
                contrasinal: hashedPassword,
                nome,
                tipo,
                estado: estado || 'activo',
                cif_nif
            });

            res.status(201).json({
                success: true,
                message: 'Usuario creado correctamente',
                data: { id_usuario: id }
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message
            });
        }
    }

    // Buscar usuario por correo
    static async getByCorreo(req, res) {
        try {
            const { correo } = req.params;
            const usuario = await Usuario.obtenerPorCorreo(correo);

            if (!usuario) {
                return res.status(404).json({
                    success: false,
                    message: 'Usuario no encontrado'
                });
            }

            res.json({
                success: true,
                data: usuario
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message
            });
        }
    }
}

export default UsuarioController;
