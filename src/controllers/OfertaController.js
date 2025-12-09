import Oferta from '../models/Oferta.js';
import Produto from '../models/Produto.js';
import Subasta from '../models/Subasta.js';

class OfertaController {
    /**
     * Crear una nueva oferta
     */
    static async crear(req, res) {
        try {
            const { id_subasta, cantidad } = req.body;
            const usuario = req.session.usuario;

            // Validar autenticación
            if (!usuario) {
                return res.status(401).json({
                    success: false,
                    message: 'Usuario no autenticado'
                });
            }

            // Validar datos
            if (!id_subasta || !cantidad || cantidad <= 0) {
                return res.status(400).json({
                    success: false,
                    message: 'Datos de puja inválidos'
                });
            }

            // Obtener la subasta
            const subasta = await Subasta.obtenerPorIdCompleto(id_subasta);
            
            if (!subasta) {
                return res.status(404).json({
                    success: false,
                    message: 'Subasta no encontrada'
                });
            }

            // Validar que la subasta esté activa
            if (subasta.estado !== 'activa') {
                return res.status(400).json({
                    success: false,
                    message: 'La subasta no está activa'
                });
            }

            // Validar que no sea el vendedor pujando en su propia subasta
            if (subasta.id_usuario_lonxa === usuario.id_usuario) {
                return res.status(400).json({
                    success: false,
                    message: 'No puedes pujar en tu propia subasta'
                });
            }

            // Validar que haya suficiente cantidad
            const producto = await Produto.obtenerPorId(subasta.id_produto);
            
            if (!producto || producto.cantidade < cantidad) {
                return res.status(400).json({
                    success: false,
                    message: `Cantidad insuficiente. Disponible: ${producto?.cantidade || 0} kg`
                });
            }

            // Calcular importe total
            const importe = parseFloat(producto.prezo_inicial) * parseFloat(cantidad);

            // Crear la oferta
            const oferta = await Oferta.crear({
                id_subasta: id_subasta,
                id_usuario: usuario.id_usuario,
                importe: importe,
                cantidades: cantidad
            });

            // Reducir la cantidad del producto
            const nuevaCantidad = await Produto.reducirCantidad(producto.id_produto, cantidad);

            res.json({
                success: true,
                message: 'Puja realizada correctamente',
                data: {
                    id_oferta: oferta.id_oferta,
                    importe: importe,
                    cantidad: cantidad,
                    cantidad_restante: nuevaCantidad
                }
            });

        } catch (error) {
            console.error('Error en OfertaController.crear:', error);
            res.status(500).json({
                success: false,
                message: 'Error al realizar la puja: ' + error.message
            });
        }
    }

    /**
     * Obtener ofertas de una subasta
     */
    static async obtenerPorSubasta(req, res) {
        try {
            const { id } = req.params;
            
            const ofertas = await Oferta.obtenerPorSubasta(id);
            
            res.json({
                success: true,
                data: ofertas
            });

        } catch (error) {
            console.error('Error en OfertaController.obtenerPorSubasta:', error);
            res.status(500).json({
                success: false,
                message: 'Error al obtener ofertas: ' + error.message
            });
        }
    }
}

export default OfertaController;
