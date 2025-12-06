import Administrador from '../models/Administrador.js';

class AdministradorController {
    // Obtener todos los administradores
    static async index(req, res) {
        try {
            const administradores = await Administrador.obtenerTodos();
            res.json({
                success: true,
                data: administradores
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message
            });
        }
    }

    // Obtener un administrador por ID
    static async show(req, res) {
        try {
            const { id } = req.params;
            const administrador = await Administrador.obtenerPorId(id);
            
            if (!administrador) {
                return res.status(404).json({
                    success: false,
                    message: 'Administrador no encontrado'
                });
            }

            res.json({
                success: true,
                data: administrador
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message
            });
        }
    }

    // Crear un nuevo administrador
    static async create(req, res) {
        try {
            const { id_usuario, nivel_acceso, departamento, data_incorporacion } = req.body;

            // Validaciones básicas
            if (!id_usuario || !nivel_acceso) {
                return res.status(400).json({
                    success: false,
                    message: 'Faltan campos requeridos'
                });
            }

            await Administrador.crear({
                id_usuario,
                nivel_acceso,
                departamento,
                data_incorporacion
            });

            res.status(201).json({
                success: true,
                message: 'Administrador creado correctamente'
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message
            });
        }
    }

    // Actualizar un administrador
    static async update(req, res) {
        try {
            const { id } = req.params;
            const data = req.body;

            const actualizado = await Administrador.actualizar(id, data);

            if (!actualizado) {
                return res.status(404).json({
                    success: false,
                    message: 'Administrador no encontrado'
                });
            }

            res.json({
                success: true,
                message: 'Administrador actualizado correctamente'
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message
            });
        }
    }

    // Eliminar un administrador
    static async delete(req, res) {
        try {
            const { id } = req.params;
            const eliminado = await Administrador.eliminar(id);

            if (!eliminado) {
                return res.status(404).json({
                    success: false,
                    message: 'Administrador no encontrado'
                });
            }

            res.json({
                success: true,
                message: 'Administrador eliminado correctamente'
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message
            });
        }
    }

    // Obtener administradores por nivel de acceso
    static async getByNivel(req, res) {
        try {
            const { nivel } = req.params;
            const administradores = await Administrador.obtenerPorNivel(nivel);

            res.json({
                success: true,
                data: administradores
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message
            });
        }
    }
}

export default AdministradorController;
