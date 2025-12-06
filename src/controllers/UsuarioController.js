import Usuario from '../models/Usuario.js';

class UsuarioController {
    // Obtener todos los usuarios
    static async index(req, res) {
        try {
            const usuarios = await Usuario.obtenerTodos();
            res.json({
                success: true,
                data: usuarios
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message
            });
        }
    }

    // Obtener un usuario por ID
    static async show(req, res) {
        try {
            const { id } = req.params;
            const usuario = await Usuario.obtenerPorId(id);
            
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

    // Crear un nuevo usuario
    static async create(req, res) {
        try {
            const { correo, contrasinal_hash, nome_completo, tipo, estado } = req.body;

            // Validaciones básicas
            if (!correo || !contrasinal_hash || !nome_completo || !tipo) {
                return res.status(400).json({
                    success: false,
                    message: 'Faltan campos requeridos'
                });
            }

            const id = await Usuario.crear({
                correo,
                contrasinal_hash,
                nome_completo,
                tipo,
                estado
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

    // Actualizar un usuario
    static async update(req, res) {
        try {
            const { id } = req.params;
            const data = req.body;

            const actualizado = await Usuario.actualizar(id, data);

            if (!actualizado) {
                return res.status(404).json({
                    success: false,
                    message: 'Usuario no encontrado'
                });
            }

            res.json({
                success: true,
                message: 'Usuario actualizado correctamente'
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message
            });
        }
    }

    // Eliminar un usuario
    static async delete(req, res) {
        try {
            const { id } = req.params;
            const eliminado = await Usuario.eliminar(id);

            if (!eliminado) {
                return res.status(404).json({
                    success: false,
                    message: 'Usuario no encontrado'
                });
            }

            res.json({
                success: true,
                message: 'Usuario eliminado correctamente'
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message
            });
        }
    }

    // Obtener usuarios por tipo
    static async getByTipo(req, res) {
        try {
            const { tipo } = req.params;
            const usuarios = await Usuario.obtenerPorTipo(tipo);

            res.json({
                success: true,
                data: usuarios
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message
            });
        }
    }

    // Obtener usuarios por estado
    static async getByEstado(req, res) {
        try {
            const { estado } = req.params;
            const usuarios = await Usuario.obtenerPorEstado(estado);

            res.json({
                success: true,
                data: usuarios
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
