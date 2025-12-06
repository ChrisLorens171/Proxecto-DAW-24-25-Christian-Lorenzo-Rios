import Factura from '../models/Factura.js';

class FacturaController {
    // Obtener todas las facturas
    static async index(req, res) {
        try {
            const facturas = await Factura.obtenerTodas();
            res.json({
                success: true,
                data: facturas
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message
            });
        }
    }

    // Obtener una factura por ID
    static async show(req, res) {
        try {
            const { id } = req.params;
            const factura = await Factura.obtenerPorId(id);
            
            if (!factura) {
                return res.status(404).json({
                    success: false,
                    message: 'Factura no encontrada'
                });
            }

            res.json({
                success: true,
                data: factura
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message
            });
        }
    }

    // Crear una nueva factura
    static async create(req, res) {
        try {
            const { id_subasta, id_comprador, importe_total, cantidade_comprada } = req.body;

            // Validaciones básicas
            if (!id_subasta || !id_comprador || !importe_total || !cantidade_comprada) {
                return res.status(400).json({
                    success: false,
                    message: 'Faltan campos requeridos'
                });
            }

            const id = await Factura.crear({
                id_subasta,
                id_comprador,
                importe_total,
                cantidade_comprada
            });

            res.status(201).json({
                success: true,
                message: 'Factura creada correctamente',
                data: { id_factura: id }
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message
            });
        }
    }

    // Eliminar una factura
    static async delete(req, res) {
        try {
            const { id } = req.params;
            const eliminado = await Factura.eliminar(id);

            if (!eliminado) {
                return res.status(404).json({
                    success: false,
                    message: 'Factura no encontrada'
                });
            }

            res.json({
                success: true,
                message: 'Factura eliminada correctamente'
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message
            });
        }
    }

    // Obtener facturas por comprador
    static async getByComprador(req, res) {
        try {
            const { id_comprador } = req.params;
            const facturas = await Factura.obtenerPorComprador(id_comprador);

            res.json({
                success: true,
                data: facturas
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message
            });
        }
    }

    // Obtener facturas por subasta
    static async getBySubasta(req, res) {
        try {
            const { id_subasta } = req.params;
            const facturas = await Factura.obtenerPorSubasta(id_subasta);

            res.json({
                success: true,
                data: facturas
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message
            });
        }
    }

    // Obtener facturas por lonxa
    static async getByLonxa(req, res) {
        try {
            const { id_lonxa } = req.params;
            const facturas = await Factura.obtenerPorLonxa(id_lonxa);

            res.json({
                success: true,
                data: facturas
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message
            });
        }
    }

    // Obtener total de ventas de una lonxa
    static async getTotalVentasLonxa(req, res) {
        try {
            const { id_lonxa } = req.params;
            const totales = await Factura.obtenerTotalVentasLonxa(id_lonxa);

            res.json({
                success: true,
                data: totales
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message
            });
        }
    }

    // Obtener total de compras de un comprador
    static async getTotalComprasComprador(req, res) {
        try {
            const { id_comprador } = req.params;
            const totales = await Factura.obtenerTotalComprasComprador(id_comprador);

            res.json({
                success: true,
                data: totales
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message
            });
        }
    }
}

export default FacturaController;
