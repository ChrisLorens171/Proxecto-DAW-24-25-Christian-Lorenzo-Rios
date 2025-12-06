import Produto from '../models/Produto.js';

class ProdutoController {
    // Obtener todos los produtos
    static async index(req, res) {
        try {
            const produtos = await Produto.obtenerTodos();
            res.json({
                success: true,
                data: produtos
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message
            });
        }
    }

    // Obtener un produto por ID
    static async show(req, res) {
        try {
            const { id } = req.params;
            const produto = await Produto.obtenerPorId(id);
            
            if (!produto) {
                return res.status(404).json({
                    success: false,
                    message: 'Produto no encontrado'
                });
            }

            res.json({
                success: true,
                data: produto
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message
            });
        }
    }

    // Crear un nuevo produto
    static async create(req, res) {
        try {
            const { nome, tipo, cantidade_total, unidade_medida, id_lonxa } = req.body;

            // Validaciones básicas
            if (!nome || !cantidade_total || !id_lonxa) {
                return res.status(400).json({
                    success: false,
                    message: 'Faltan campos requeridos'
                });
            }

            const id = await Produto.crear({
                nome,
                tipo,
                cantidade_total,
                unidade_medida,
                id_lonxa
            });

            res.status(201).json({
                success: true,
                message: 'Produto creado correctamente',
                data: { id_produto: id }
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message
            });
        }
    }

    // Actualizar un produto
    static async update(req, res) {
        try {
            const { id } = req.params;
            const data = req.body;

            const actualizado = await Produto.actualizar(id, data);

            if (!actualizado) {
                return res.status(404).json({
                    success: false,
                    message: 'Produto no encontrado'
                });
            }

            res.json({
                success: true,
                message: 'Produto actualizado correctamente'
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message
            });
        }
    }

    // Eliminar un produto
    static async delete(req, res) {
        try {
            const { id } = req.params;
            const eliminado = await Produto.eliminar(id);

            if (!eliminado) {
                return res.status(404).json({
                    success: false,
                    message: 'Produto no encontrado'
                });
            }

            res.json({
                success: true,
                message: 'Produto eliminado correctamente'
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message
            });
        }
    }

    // Obtener produtos por lonxa
    static async getByLonxa(req, res) {
        try {
            const { id_lonxa } = req.params;
            const produtos = await Produto.obtenerPorLonxa(id_lonxa);

            res.json({
                success: true,
                data: produtos
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message
            });
        }
    }

    // Obtener produtos por tipo
    static async getByTipo(req, res) {
        try {
            const { tipo } = req.params;
            const produtos = await Produto.obtenerPorTipo(tipo);

            res.json({
                success: true,
                data: produtos
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message
            });
        }
    }
}

export default ProdutoController;
