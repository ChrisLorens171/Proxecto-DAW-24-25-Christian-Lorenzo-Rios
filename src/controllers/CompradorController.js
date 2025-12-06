import Comprador from '../models/Comprador.js';

class CompradorController {
    // Obtener todos los compradores
    static async index(req, res) {
        try {
            const compradores = await Comprador.obtenerTodos();
            res.json({
                success: true,
                data: compradores
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message
            });
        }
    }

    // Obtener un comprador por ID
    static async show(req, res) {
        try {
            const { id } = req.params;
            const comprador = await Comprador.obtenerPorId(id);
            
            if (!comprador) {
                return res.status(404).json({
                    success: false,
                    message: 'Comprador no encontrado'
                });
            }

            res.json({
                success: true,
                data: comprador
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message
            });
        }
    }

    // Crear un nuevo comprador
    static async create(req, res) {
        try {
            const { id_usuario, DNI, telefono_contacto, endereco_envio_predeterminado } = req.body;

            // Validaciones básicas
            if (!id_usuario) {
                return res.status(400).json({
                    success: false,
                    message: 'El id_usuario es requerido'
                });
            }

            await Comprador.crear({
                id_usuario,
                DNI,
                telefono_contacto,
                endereco_envio_predeterminado
            });

            res.status(201).json({
                success: true,
                message: 'Comprador creado correctamente'
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message
            });
        }
    }

    // Actualizar un comprador
    static async update(req, res) {
        try {
            const { id } = req.params;
            const data = req.body;

            const actualizado = await Comprador.actualizar(id, data);

            if (!actualizado) {
                return res.status(404).json({
                    success: false,
                    message: 'Comprador no encontrado'
                });
            }

            res.json({
                success: true,
                message: 'Comprador actualizado correctamente'
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message
            });
        }
    }

    // Eliminar un comprador
    static async delete(req, res) {
        try {
            const { id } = req.params;
            const eliminado = await Comprador.eliminar(id);

            if (!eliminado) {
                return res.status(404).json({
                    success: false,
                    message: 'Comprador no encontrado'
                });
            }

            res.json({
                success: true,
                message: 'Comprador eliminado correctamente'
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message
            });
        }
    }

    // Obtener comprador por DNI
    static async getByDNI(req, res) {
        try {
            const { dni } = req.params;
            const comprador = await Comprador.obtenerPorDNI(dni);

            if (!comprador) {
                return res.status(404).json({
                    success: false,
                    message: 'Comprador no encontrado'
                });
            }

            res.json({
                success: true,
                data: comprador
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message
            });
        }
    }

    // Obtener compradores verificados
    static async getVerificados(req, res) {
        try {
            const compradores = await Comprador.obtenerVerificados();

            res.json({
                success: true,
                data: compradores
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message
            });
        }
    }
}

export default CompradorController;
