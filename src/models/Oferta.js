import db from '../config/database.js';

class Oferta {
    constructor(data) {
        this.id_oferta = data.id_oferta;
        this.id_subasta = data.id_subasta;
        this.id_comprador = data.id_comprador;
        this.importe = data.importe;
        this.cantidade_poxada = data.cantidade_poxada;
        this.data_hora = data.data_hora;
    }

    // Crear una nueva oferta
    static async crear(data) {
        try {
            const [result] = await db.execute(
                `INSERT INTO Ofertas (id_subasta, id_comprador, importe, cantidade_poxada) 
                 VALUES (?, ?, ?, ?)`,
                [data.id_subasta, data.id_comprador, data.importe, data.cantidade_poxada]
            );
            return result.insertId;
        } catch (error) {
            throw new Error(`Error al crear oferta: ${error.message}`);
        }
    }

    // Obtener todas las ofertas
    static async obtenerTodas() {
        try {
            const [rows] = await db.execute(`
                SELECT o.*, u.nome_completo as nome_comprador, u.correo,
                       s.id_produto, p.nome as nome_produto
                FROM Ofertas o
                JOIN Compradores c ON o.id_comprador = c.id_usuario
                JOIN Usuarios u ON c.id_usuario = u.id_usuario
                JOIN Subastas s ON o.id_subasta = s.id_subasta
                JOIN Produtos p ON s.id_produto = p.id_produto
                ORDER BY o.data_hora DESC
            `);
            return rows;
        } catch (error) {
            throw new Error(`Error al obtener ofertas: ${error.message}`);
        }
    }

    // Obtener oferta por ID
    static async obtenerPorId(id) {
        try {
            const [rows] = await db.execute(`
                SELECT o.*, u.nome_completo as nome_comprador, u.correo,
                       s.id_produto, p.nome as nome_produto
                FROM Ofertas o
                JOIN Compradores c ON o.id_comprador = c.id_usuario
                JOIN Usuarios u ON c.id_usuario = u.id_usuario
                JOIN Subastas s ON o.id_subasta = s.id_subasta
                JOIN Produtos p ON s.id_produto = p.id_produto
                WHERE o.id_oferta = ?
            `, [id]);
            return rows.length > 0 ? rows[0] : null;
        } catch (error) {
            throw new Error(`Error al obtener oferta: ${error.message}`);
        }
    }

    // Obtener ofertas por subasta
    static async obtenerPorSubasta(id_subasta) {
        try {
            const [rows] = await db.execute(`
                SELECT o.*, u.nome_completo as nome_comprador, u.correo
                FROM Ofertas o
                JOIN Compradores c ON o.id_comprador = c.id_usuario
                JOIN Usuarios u ON c.id_usuario = u.id_usuario
                WHERE o.id_subasta = ?
                ORDER BY o.data_hora DESC
            `, [id_subasta]);
            return rows;
        } catch (error) {
            throw new Error(`Error al obtener ofertas por subasta: ${error.message}`);
        }
    }

    // Obtener ofertas por comprador
    static async obtenerPorComprador(id_comprador) {
        try {
            const [rows] = await db.execute(`
                SELECT o.*, s.id_produto, p.nome as nome_produto, 
                       s.estado as estado_subasta
                FROM Ofertas o
                JOIN Subastas s ON o.id_subasta = s.id_subasta
                JOIN Produtos p ON s.id_produto = p.id_produto
                WHERE o.id_comprador = ?
                ORDER BY o.data_hora DESC
            `, [id_comprador]);
            return rows;
        } catch (error) {
            throw new Error(`Error al obtener ofertas por comprador: ${error.message}`);
        }
    }

    // Obtener la oferta más alta de una subasta
    static async obtenerMaisAltaPorSubasta(id_subasta) {
        try {
            const [rows] = await db.execute(`
                SELECT o.*, u.nome_completo as nome_comprador
                FROM Ofertas o
                JOIN Compradores c ON o.id_comprador = c.id_usuario
                JOIN Usuarios u ON c.id_usuario = u.id_usuario
                WHERE o.id_subasta = ?
                ORDER BY o.importe DESC, o.data_hora ASC
                LIMIT 1
            `, [id_subasta]);
            return rows.length > 0 ? rows[0] : null;
        } catch (error) {
            throw new Error(`Error al obtener oferta más alta: ${error.message}`);
        }
    }

    // Eliminar oferta
    static async eliminar(id) {
        try {
            const [result] = await db.execute(
                'DELETE FROM Ofertas WHERE id_oferta = ?',
                [id]
            );
            return result.affectedRows > 0;
        } catch (error) {
            throw new Error(`Error al eliminar oferta: ${error.message}`);
        }
    }

    // Obtener historial de ofertas de una subasta (ordenadas cronológicamente)
    static async obtenerHistorialSubasta(id_subasta) {
        try {
            const [rows] = await db.execute(`
                SELECT o.*, u.nome_completo as nome_comprador
                FROM Ofertas o
                JOIN Compradores c ON o.id_comprador = c.id_usuario
                JOIN Usuarios u ON c.id_usuario = u.id_usuario
                WHERE o.id_subasta = ?
                ORDER BY o.importe DESC, o.data_hora ASC
            `, [id_subasta]);
            return rows;
        } catch (error) {
            throw new Error(`Error al obtener historial de ofertas: ${error.message}`);
        }
    }
}

export default Oferta;
