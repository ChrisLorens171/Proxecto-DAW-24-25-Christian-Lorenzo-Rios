import Subasta from '../models/Subasta.js';

class SubastaController {
    // Obtener todas las subastas
    static async index(req, res) {
        try {
            const subastas = await Subasta.obtenerTodas();
            res.json({
                success: true,
                data: subastas
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message
            });
        }
    }

    // Obtener una subasta por ID
    static async show(req, res) {
        try {
            const { id } = req.params;
            const subasta = await Subasta.obtenerPorId(id);
            
            if (!subasta) {
                return res.status(404).json({
                    success: false,
                    message: 'Subasta no encontrada'
                });
            }

            res.json({
                success: true,
                data: subasta
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message
            });
        }
    }

    // Crear una nueva subasta
    static async create(req, res) {
        try {
            const { id_produto, prezo_inicial, cantidade_actual_restante, data_inicio, data_fin, estado } = req.body;

            // Validaciones básicas
            if (!id_produto || !prezo_inicial || !cantidade_actual_restante || !data_inicio || !data_fin) {
                return res.status(400).json({
                    success: false,
                    message: 'Faltan campos requeridos'
                });
            }

            const id = await Subasta.crear({
                id_produto,
                prezo_inicial,
                cantidade_actual_restante,
                data_inicio,
                data_fin,
                estado
            });

            res.status(201).json({
                success: true,
                message: 'Subasta creada correctamente',
                data: { id_subasta: id }
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message
            });
        }
    }

    // Actualizar una subasta
    static async update(req, res) {
        try {
            const { id } = req.params;
            const data = req.body;

            const actualizado = await Subasta.actualizar(id, data);

            if (!actualizado) {
                return res.status(404).json({
                    success: false,
                    message: 'Subasta no encontrada'
                });
            }

            res.json({
                success: true,
                message: 'Subasta actualizada correctamente'
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message
            });
        }
    }

    // Eliminar una subasta
    static async delete(req, res) {
        try {
            const { id } = req.params;
            const eliminado = await Subasta.eliminar(id);

            if (!eliminado) {
                return res.status(404).json({
                    success: false,
                    message: 'Subasta no encontrada'
                });
            }

            res.json({
                success: true,
                message: 'Subasta eliminada correctamente'
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message
            });
        }
    }

    // Obtener subastas activas
    static async getActivas(req, res) {
        try {
            const subastas = await Subasta.obtenerActivas();

            res.json({
                success: true,
                data: subastas
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message
            });
        }
    }

    // Obtener subastas por estado
    static async getByEstado(req, res) {
        try {
            const { estado } = req.params;
            const subastas = await Subasta.obtenerPorEstado(estado);

            res.json({
                success: true,
                data: subastas
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message
            });
        }
    }

    // Obtener subastas por lonxa
    static async getByLonxa(req, res) {
        try {
            const { id_lonxa } = req.params;
            const subastas = await Subasta.obtenerPorLonxa(id_lonxa);

            res.json({
                success: true,
                data: subastas
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message
            });
        }
    }

    // Cerrar una subasta
    static async cerrar(req, res) {
        try {
            const { id } = req.params;
            const cerrado = await Subasta.cerrar(id);

            if (!cerrado) {
                return res.status(404).json({
                    success: false,
                    message: 'Subasta no encontrada'
                });
            }

            res.json({
                success: true,
                message: 'Subasta cerrada correctamente'
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message
            });
        }
    }

    // Cancelar una subasta
    static async cancelar(req, res) {
        try {
            const { id } = req.params;
            const cancelado = await Subasta.cancelar(id);

            if (!cancelado) {
                return res.status(404).json({
                    success: false,
                    message: 'Subasta no encontrada'
                });
            }

            res.json({
                success: true,
                message: 'Subasta cancelada correctamente'
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message
            });
        }
    }
}

export default SubastaController;
