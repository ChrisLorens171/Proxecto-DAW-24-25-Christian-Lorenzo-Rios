import db from '../config/database.js';

class Factura {
    constructor(data) {
        this.id_factura = data.id_factura;
        this.id_subasta = data.id_subasta;
        this.id_comprador = data.id_comprador;
        this.importe_total = data.importe_total;
        this.cantidade_comprada = data.cantidade_comprada;
        this.data_emision = data.data_emision;
    }

    // Crear una nueva factura
    static async crear(data) {
        try {
            const [result] = await db.execute(
                `INSERT INTO Facturas (id_subasta, id_comprador, importe_total, cantidade_comprada) 
                 VALUES (?, ?, ?, ?)`,
                [data.id_subasta, data.id_comprador, data.importe_total, data.cantidade_comprada]
            );
            return result.insertId;
        } catch (error) {
            throw new Error(`Error al crear factura: ${error.message}`);
        }
    }

    // Obtener todas las facturas
    static async obtenerTodas() {
        try {
            const [rows] = await db.execute(`
                SELECT f.*, 
                       u.nome_completo as nome_comprador, u.correo,
                       c.DNI, c.endereco_envio_predeterminado,
                       s.id_produto, p.nome as nome_produto, p.tipo as tipo_produto,
                       l.nome_comercial, l.CIF
                FROM Facturas f
                JOIN Compradores c ON f.id_comprador = c.id_usuario
                JOIN Usuarios u ON c.id_usuario = u.id_usuario
                JOIN Subastas s ON f.id_subasta = s.id_subasta
                JOIN Produtos p ON s.id_produto = p.id_produto
                JOIN Lonxas l ON p.id_lonxa = l.id_usuario
                ORDER BY f.data_emision DESC
            `);
            return rows;
        } catch (error) {
            throw new Error(`Error al obtener facturas: ${error.message}`);
        }
    }

    // Obtener factura por ID
    static async obtenerPorId(id) {
        try {
            const [rows] = await db.execute(`
                SELECT f.*, 
                       u.nome_completo as nome_comprador, u.correo,
                       c.DNI, c.telefono_contacto, c.endereco_envio_predeterminado,
                       s.id_produto, p.nome as nome_produto, p.tipo as tipo_produto, p.unidade_medida,
                       l.nome_comercial, l.CIF, l.telefono_contacto as telefono_lonxa, l.endereco_envio as endereco_lonxa
                FROM Facturas f
                JOIN Compradores c ON f.id_comprador = c.id_usuario
                JOIN Usuarios u ON c.id_usuario = u.id_usuario
                JOIN Subastas s ON f.id_subasta = s.id_subasta
                JOIN Produtos p ON s.id_produto = p.id_produto
                JOIN Lonxas l ON p.id_lonxa = l.id_usuario
                WHERE f.id_factura = ?
            `, [id]);
            return rows.length > 0 ? rows[0] : null;
        } catch (error) {
            throw new Error(`Error al obtener factura: ${error.message}`);
        }
    }

    // Obtener facturas por comprador
    static async obtenerPorComprador(id_comprador) {
        try {
            const [rows] = await db.execute(`
                SELECT f.*, 
                       s.id_produto, p.nome as nome_produto, p.tipo as tipo_produto, p.unidade_medida,
                       l.nome_comercial
                FROM Facturas f
                JOIN Subastas s ON f.id_subasta = s.id_subasta
                JOIN Produtos p ON s.id_produto = p.id_produto
                JOIN Lonxas l ON p.id_lonxa = l.id_usuario
                WHERE f.id_comprador = ?
                ORDER BY f.data_emision DESC
            `, [id_comprador]);
            return rows;
        } catch (error) {
            throw new Error(`Error al obtener facturas por comprador: ${error.message}`);
        }
    }

    // Obtener facturas por subasta
    static async obtenerPorSubasta(id_subasta) {
        try {
            const [rows] = await db.execute(`
                SELECT f.*, 
                       u.nome_completo as nome_comprador, u.correo,
                       c.DNI, c.telefono_contacto
                FROM Facturas f
                JOIN Compradores c ON f.id_comprador = c.id_usuario
                JOIN Usuarios u ON c.id_usuario = u.id_usuario
                WHERE f.id_subasta = ?
                ORDER BY f.data_emision DESC
            `, [id_subasta]);
            return rows;
        } catch (error) {
            throw new Error(`Error al obtener facturas por subasta: ${error.message}`);
        }
    }

    // Obtener facturas por lonxa
    static async obtenerPorLonxa(id_lonxa) {
        try {
            const [rows] = await db.execute(`
                SELECT f.*, 
                       u.nome_completo as nome_comprador, u.correo,
                       p.nome as nome_produto, p.tipo as tipo_produto, p.unidade_medida
                FROM Facturas f
                JOIN Subastas s ON f.id_subasta = s.id_subasta
                JOIN Produtos p ON s.id_produto = p.id_produto
                JOIN Compradores c ON f.id_comprador = c.id_usuario
                JOIN Usuarios u ON c.id_usuario = u.id_usuario
                WHERE p.id_lonxa = ?
                ORDER BY f.data_emision DESC
            `, [id_lonxa]);
            return rows;
        } catch (error) {
            throw new Error(`Error al obtener facturas por lonxa: ${error.message}`);
        }
    }

    // Eliminar factura
    static async eliminar(id) {
        try {
            const [result] = await db.execute(
                'DELETE FROM Facturas WHERE id_factura = ?',
                [id]
            );
            return result.affectedRows > 0;
        } catch (error) {
            throw new Error(`Error al eliminar factura: ${error.message}`);
        }
    }

    // Obtener total de ventas de una lonxa
    static async obtenerTotalVentasLonxa(id_lonxa) {
        try {
            const [rows] = await db.execute(`
                SELECT COUNT(*) as total_facturas, 
                       SUM(f.importe_total) as total_ingresos,
                       SUM(f.cantidade_comprada) as total_cantidade_vendida
                FROM Facturas f
                JOIN Subastas s ON f.id_subasta = s.id_subasta
                JOIN Produtos p ON s.id_produto = p.id_produto
                WHERE p.id_lonxa = ?
            `, [id_lonxa]);
            return rows[0];
        } catch (error) {
            throw new Error(`Error al obtener total de ventas: ${error.message}`);
        }
    }

    // Obtener total de compras de un comprador
    static async obtenerTotalComprasComprador(id_comprador) {
        try {
            const [rows] = await db.execute(`
                SELECT COUNT(*) as total_facturas, 
                       SUM(f.importe_total) as total_gastado,
                       SUM(f.cantidade_comprada) as total_cantidade_comprada
                FROM Facturas f
                WHERE f.id_comprador = ?
            `, [id_comprador]);
            return rows[0];
        } catch (error) {
            throw new Error(`Error al obtener total de compras: ${error.message}`);
        }
    }
}

export default Factura;
