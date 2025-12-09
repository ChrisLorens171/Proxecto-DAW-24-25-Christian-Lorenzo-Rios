import Subasta from '../models/Subasta.js';
import Produto from '../models/Produto.js';

class SubastaController {
    /**
     * Obtener todas las subastas
     */
    static async getAll(req, res) {
        try {
            const subastas = await Subasta.obtenerTodas();
            
            res.json({
                success: true,
                data: subastas
            });
        } catch (error) {
            console.error('❌ Error en SubastaController.getAll:', error);
            res.status(500).json({
                success: false,
                message: error.message
            });
        }
    }

    /**
     * Crear una nueva subasta con su producto
     */
    static async create(req, res) {
        try {
            const { producto, subasta } = req.body;
            const usuario = req.session.usuario;

            // Validar que el usuario esté autenticado
            if (!usuario) {
                return res.status(401).json({
                    success: false,
                    message: 'Usuario no autenticado'
                });
            }

            // Validar que sea vendedor o admin
            if (usuario.tipo !== 'lonxa' && usuario.tipo !== 'admin') {
                return res.status(403).json({
                    success: false,
                    message: 'No tienes permisos para crear subastas'
                });
            }

            // Validar datos del producto
            if (!producto || !producto.nome || !producto.tipo || !producto.cantidade || !producto.prezo_inicial) {
                return res.status(400).json({
                    success: false,
                    message: 'Faltan datos del producto'
                });
            }

            // Validar datos de la subasta
            if (!subasta || !subasta.hora_inicio || !subasta.hora_fin || !subasta.estado) {
                return res.status(400).json({
                    success: false,
                    message: 'Faltan datos de la subasta'
                });
            }

            // Validar fechas
            const fechaInicio = new Date(subasta.hora_inicio);
            const fechaFin = new Date(subasta.hora_fin);
            
            if (fechaFin <= fechaInicio) {
                return res.status(400).json({
                    success: false,
                    message: 'La fecha de fin debe ser posterior a la de inicio'
                });
            }

            // Asignar imagen según el tipo de producto
            const imagenesProductos = {
                'Percebes': '/img/tipos/percebes.jpg',
                'Mejillón': '/img/tipos/mejillon.jpg',
                'Almeja': '/img/tipos/almeja.jpg',
                'Vieira': '/img/tipos/vieira.jpg',
                'Berberecho': '/img/tipos/berberecho.jpg',
                'Navajas': '/img/tipos/navajas.jpg',
                'Pulpo': '/img/tipos/pulpo.png',
                'Zamburiñas': '/img/tipos/zamburinas.jpg',
                'Centollo': '/img/tipos/centollo.jpg',
                'Bogavante': '/img/tipos/bogavante.jpg'
            };

            const imagenProducto = imagenesProductos[producto.tipo] || null;

            // Crear el producto
            const productoData = {
                ...producto,
                id_usuario_propietario: usuario.id_usuario,
                imagen: imagenProducto
            };
            
            const idProducto = await Produto.crear(productoData);

            // Crear la subasta
            const subastaData = {
                id_produto: idProducto,
                id_usuario_lonxa: usuario.id_usuario,
                hora_inicio: subasta.hora_inicio,
                hora_fin: subasta.hora_fin,
                estado: subasta.estado
            };

            const idSubasta = await Subasta.crear(subastaData);

            res.json({
                success: true,
                message: 'Subasta creada correctamente',
                data: {
                    id_subasta: idSubasta,
                    id_produto: idProducto
                }
            });

        } catch (error) {
            console.error('❌ Error en SubastaController.create:', error);
            res.status(500).json({
                success: false,
                message: 'Error al crear la subasta: ' + error.message
            });
        }
    }

    /**
     * Obtener subasta por ID con datos completos
     */
    static async getById(req, res) {
        try {
            const { id } = req.params;
            const usuario = req.session.usuario;

            // Validar que el usuario esté autenticado
            if (!usuario) {
                return res.status(401).json({
                    success: false,
                    message: 'Usuario no autenticado'
                });
            }

            const subasta = await Subasta.obtenerPorIdCompleto(id);

            if (!subasta) {
                return res.status(404).json({
                    success: false,
                    message: 'Subasta no encontrada'
                });
            }

            // Validar permisos
            if (subasta.id_usuario_lonxa !== usuario.id_usuario && usuario.tipo !== 'admin') {
                return res.status(403).json({
                    success: false,
                    message: 'No tienes permisos para ver esta subasta'
                });
            }

            res.json({
                success: true,
                data: subasta
            });

        } catch (error) {
            console.error('❌ Error en SubastaController.getById:', error);
            res.status(500).json({
                success: false,
                message: 'Error al obtener la subasta: ' + error.message
            });
        }
    }

    /**
     * Actualizar subasta
     */
    static async update(req, res) {
        try {
            const { id } = req.params;
            const { producto, subasta } = req.body;
            const usuario = req.session.usuario;

            // Validar que el usuario esté autenticado
            if (!usuario) {
                return res.status(401).json({
                    success: false,
                    message: 'Usuario no autenticado'
                });
            }

            // Obtener subasta actual
            const subastaActual = await Subasta.obtenerPorId(id);

            if (!subastaActual) {
                return res.status(404).json({
                    success: false,
                    message: 'Subasta no encontrada'
                });
            }

            // Validar permisos
            if (subastaActual.id_usuario_lonxa !== usuario.id_usuario && usuario.tipo !== 'admin') {
                return res.status(403).json({
                    success: false,
                    message: 'No tienes permisos para editar esta subasta'
                });
            }

            // Validar datos del producto
            if (!producto || !producto.nome || !producto.tipo || !producto.cantidade || !producto.prezo_inicial) {
                return res.status(400).json({
                    success: false,
                    message: 'Faltan datos del producto'
                });
            }

            // Validar datos de la subasta
            if (!subasta || !subasta.hora_inicio || !subasta.hora_fin || !subasta.estado) {
                return res.status(400).json({
                    success: false,
                    message: 'Faltan datos de la subasta'
                });
            }

            // Validar fechas
            const fechaInicio = new Date(subasta.hora_inicio);
            const fechaFin = new Date(subasta.hora_fin);
            
            if (fechaFin <= fechaInicio) {
                return res.status(400).json({
                    success: false,
                    message: 'La fecha de fin debe ser posterior a la de inicio'
                });
            }

            // Asignar imagen según el tipo de producto
            const imagenesProductos = {
                'Percebes': '/img/tipos/percebes.jpg',
                'Mejillón': '/img/tipos/mejillon.jpg',
                'Almeja': '/img/tipos/almeja.jpg',
                'Vieira': '/img/tipos/vieira.jpg',
                'Berberecho': '/img/tipos/berberecho.jpg',
                'Navajas': '/img/tipos/navajas.jpg',
                'Pulpo': '/img/tipos/pulpo.png',
                'Zamburiñas': '/img/tipos/zamburinas.jpg',
                'Centollo': '/img/tipos/centollo.jpg',
                'Bogavante': '/img/tipos/bogavante.jpg'
            };

            const imagenProducto = imagenesProductos[producto.tipo] || null;

            // Actualizar el producto
            const productoData = {
                ...producto,
                imagen: imagenProducto
            };
            
            await Produto.actualizar(subastaActual.id_produto, productoData);

            // Actualizar la subasta
            const subastaData = {
                hora_inicio: subasta.hora_inicio,
                hora_fin: subasta.hora_fin,
                estado: subasta.estado
            };

            await Subasta.actualizar(id, subastaData);

            res.json({
                success: true,
                message: 'Subasta actualizada correctamente'
            });

        } catch (error) {
            console.error('❌ Error en SubastaController.update:', error);
            res.status(500).json({
                success: false,
                message: 'Error al actualizar la subasta: ' + error.message
            });
        }
    }

    /**
     * Eliminar subasta
     */
    static async delete(req, res) {
        try {
            const { id } = req.params;
            const usuario = req.session.usuario;
            
            // Validar que el usuario esté autenticado
            if (!usuario) {
                return res.status(401).json({
                    success: false,
                    message: 'Usuario no autenticado'
                });
            }
            
            // Validar que sea el creador de la subasta o admin
            const subasta = await Subasta.obtenerPorId(id);
            
            if (!subasta) {
                return res.status(404).json({
                    success: false,
                    message: 'Subasta no encontrada'
                });
            }

            if (subasta.id_usuario_lonxa !== usuario.id_usuario && usuario.tipo !== 'admin') {
                return res.status(403).json({
                    success: false,
                    message: 'No tienes permisos para eliminar esta subasta'
                });
            }
            
            // Eliminar subasta
            await Subasta.eliminar(id);
            
            // Eliminar producto asociado
            await Produto.eliminar(subasta.id_produto);
            
            res.json({
                success: true,
                message: 'Subasta eliminada correctamente'
            });

        } catch (error) {
            console.error('❌ Error en SubastaController.delete:', error);
            res.status(500).json({
                success: false,
                message: 'Error al eliminar la subasta: ' + error.message
            });
        }
    }

}

export default SubastaController;

