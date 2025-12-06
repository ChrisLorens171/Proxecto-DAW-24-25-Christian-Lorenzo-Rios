import Oferta from '../models/Oferta.js';

class OfertaController {
    // Obtener todas las ofertas
    static async index(req, res) {
        try {
            const ofertas = await Oferta.obtenerTodas();
            res.json({
                success: true,
                data: ofertas
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message
            });
        }
    }

    // Obtener una oferta por ID
    static async show(req, res) {
        try {
            const { id } = req.params;
            const oferta = await Oferta.obtenerPorId(id);
            
            if (!oferta) {
                return res.status(404).json({
                    success: false,
                    message: 'Oferta no encontrada'
                });
            }

            res.json({
                success: true,
                data: oferta
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message
            });
        }
    }

    // Crear una nueva oferta
    static async create(req, res) {
        try {
            const { id_subasta, id_comprador, importe, cantidade_poxada } = req.body;

            // Validaciones básicas
            if (!id_subasta || !id_comprador || !importe || !cantidade_poxada) {
                return res.status(400).json({
                    success: false,
                    message: 'Faltan campos requeridos'
                });
            }

            const id = await Oferta.crear({
                id_subasta,
                id_comprador,
                importe,
                cantidade_poxada
            });

            res.status(201).json({
                success: true,
                message: 'Oferta creada correctamente',
                data: { id_oferta: id }
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message
            });
        }
    }

    // Eliminar una oferta
    static async delete(req, res) {
        try {
            const { id } = req.params;
            const eliminado = await Oferta.eliminar(id);

            if (!eliminado) {
                return res.status(404).json({
                    success: false,
                    message: 'Oferta no encontrada'
                });
            }

            res.json({
                success: true,
                message: 'Oferta eliminada correctamente'
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message
            });
        }
    }

    // Obtener ofertas por subasta
    static async getBySubasta(req, res) {
        try {
            const { id_subasta } = req.params;
            const ofertas = await Oferta.obtenerPorSubasta(id_subasta);

            res.json({
                success: true,
                data: ofertas
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message
            });
        }
    }

    // Obtener ofertas por comprador
    static async getByComprador(req, res) {
        try {
            const { id_comprador } = req.params;
            const ofertas = await Oferta.obtenerPorComprador(id_comprador);

            res.json({
                success: true,
                data: ofertas
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message
            });
        }
    }

    // Obtener la oferta más alta de una subasta
    static async getMaisAlta(req, res) {
        try {
            const { id_subasta } = req.params;
            const oferta = await Oferta.obtenerMaisAltaPorSubasta(id_subasta);

            if (!oferta) {
                return res.status(404).json({
                    success: false,
                    message: 'No hay ofertas para esta subasta'
                });
            }

            res.json({
                success: true,
                data: oferta
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message
            });
        }
    }

    // Obtener historial de ofertas de una subasta
    static async getHistorial(req, res) {
        try {
            const { id_subasta } = req.params;
            const ofertas = await Oferta.obtenerHistorialSubasta(id_subasta);

            res.json({
                success: true,
                data: ofertas
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message
            });
        }
    }
}

export default OfertaController;
