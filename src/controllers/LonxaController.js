import Lonxa from '../models/Lonxa.js';

class LonxaController {
    // Obtener todas las lonxas
    static async index(req, res) {
        try {
            const lonxas = await Lonxa.obtenerTodas();
            res.json({
                success: true,
                data: lonxas
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message
            });
        }
    }

    // Obtener una lonxa por ID
    static async show(req, res) {
        try {
            const { id } = req.params;
            const lonxa = await Lonxa.obtenerPorId(id);
            
            if (!lonxa) {
                return res.status(404).json({
                    success: false,
                    message: 'Lonxa no encontrada'
                });
            }

            res.json({
                success: true,
                data: lonxa
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message
            });
        }
    }

    // Crear una nueva lonxa
    static async create(req, res) {
        try {
            const { id_usuario, nome_comercial, CIF, telefono_contacto, endereco_envio } = req.body;

            // Validaciones básicas
            if (!id_usuario || !nome_comercial) {
                return res.status(400).json({
                    success: false,
                    message: 'Faltan campos requeridos'
                });
            }

            await Lonxa.crear({
                id_usuario,
                nome_comercial,
                CIF,
                telefono_contacto,
                endereco_envio
            });

            res.status(201).json({
                success: true,
                message: 'Lonxa creada correctamente'
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message
            });
        }
    }

    // Actualizar una lonxa
    static async update(req, res) {
        try {
            const { id } = req.params;
            const data = req.body;

            const actualizado = await Lonxa.actualizar(id, data);

            if (!actualizado) {
                return res.status(404).json({
                    success: false,
                    message: 'Lonxa no encontrada'
                });
            }

            res.json({
                success: true,
                message: 'Lonxa actualizada correctamente'
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message
            });
        }
    }

    // Eliminar una lonxa
    static async delete(req, res) {
        try {
            const { id } = req.params;
            const eliminado = await Lonxa.eliminar(id);

            if (!eliminado) {
                return res.status(404).json({
                    success: false,
                    message: 'Lonxa no encontrada'
                });
            }

            res.json({
                success: true,
                message: 'Lonxa eliminada correctamente'
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message
            });
        }
    }

    // Obtener lonxa por CIF
    static async getByCIF(req, res) {
        try {
            const { cif } = req.params;
            const lonxa = await Lonxa.obtenerPorCIF(cif);

            if (!lonxa) {
                return res.status(404).json({
                    success: false,
                    message: 'Lonxa no encontrada'
                });
            }

            res.json({
                success: true,
                data: lonxa
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message
            });
        }
    }

    // Obtener lonxas verificadas
    static async getVerificadas(req, res) {
        try {
            const lonxas = await Lonxa.obtenerVerificadas();

            res.json({
                success: true,
                data: lonxas
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message
            });
        }
    }
}

export default LonxaController;
