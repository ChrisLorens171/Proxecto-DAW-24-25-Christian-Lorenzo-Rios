import db from '../config/database.js';

class Subasta {
    constructor(data) {
        this.id_subasta = data.id_subasta;
        this.id_produto = data.id_produto;
        this.prezo_inicial = data.prezo_inicial;
        this.cantidade_actual_restante = data.cantidade_actual_restante;
        this.data_inicio = data.data_inicio;
        this.data_fin = data.data_fin;
        this.estado = data.estado;
    }

    // Crear una nueva subasta
    static async crear(data) {
        try {
            const [result] = await db.execute(
                `INSERT INTO Subastas (id_produto, prezo_inicial, cantidade_actual_restante, data_inicio, data_fin, estado) 
                 VALUES (?, ?, ?, ?, ?, ?)`,
                [data.id_produto, data.prezo_inicial, data.cantidade_actual_restante, data.data_inicio, data.data_fin, data.estado || 'Activa']
            );
            return result.insertId;
        } catch (error) {
            throw new Error(`Error al crear subasta: ${error.message}`);
        }
    }

    // Obtener todas las subastas
    static async obtenerTodas() {
        try {
            const [rows] = await db.execute(`
                SELECT s.*, p.nome as nome_produto, p.tipo as tipo_produto, 
                       l.nome_comercial, p.unidade_medida
                FROM Subastas s
                JOIN Produtos p ON s.id_produto = p.id_produto
                JOIN Lonxas l ON p.id_lonxa = l.id_usuario
            `);
            return rows;
        } catch (error) {
            throw new Error(`Error al obtener subastas: ${error.message}`);
        }
    }

    // Obtener subasta por ID
    static async obtenerPorId(id) {
        try {
            const [rows] = await db.execute(`
                SELECT s.*, p.nome as nome_produto, p.tipo as tipo_produto, 
                       p.cantidade_total, p.unidade_medida,
                       l.nome_comercial, l.id_usuario as id_lonxa
                FROM Subastas s
                JOIN Produtos p ON s.id_produto = p.id_produto
                JOIN Lonxas l ON p.id_lonxa = l.id_usuario
                WHERE s.id_subasta = ?
            `, [id]);
            return rows.length > 0 ? rows[0] : null;
        } catch (error) {
            throw new Error(`Error al obtener subasta: ${error.message}`);
        }
    }

    // Obtener subastas activas
    static async obtenerActivas() {
        try {
            const [rows] = await db.execute(`
                SELECT s.*, p.nome as nome_produto, p.tipo as tipo_produto, 
                       l.nome_comercial, p.unidade_medida
                FROM Subastas s
                JOIN Produtos p ON s.id_produto = p.id_produto
                JOIN Lonxas l ON p.id_lonxa = l.id_usuario
                WHERE s.estado = 'Activa' AND s.data_fin > NOW()
            `);
            return rows;
        } catch (error) {
            throw new Error(`Error al obtener subastas activas: ${error.message}`);
        }
    }

    // Obtener subastas por estado
    static async obtenerPorEstado(estado) {
        try {
            const [rows] = await db.execute(`
                SELECT s.*, p.nome as nome_produto, p.tipo as tipo_produto, 
                       l.nome_comercial, p.unidade_medida
                FROM Subastas s
                JOIN Produtos p ON s.id_produto = p.id_produto
                JOIN Lonxas l ON p.id_lonxa = l.id_usuario
                WHERE s.estado = ?
            `, [estado]);
            return rows;
        } catch (error) {
            throw new Error(`Error al obtener subastas por estado: ${error.message}`);
        }
    }

    // Obtener subastas por lonxa
    static async obtenerPorLonxa(id_lonxa) {
        try {
            const [rows] = await db.execute(`
                SELECT s.*, p.nome as nome_produto, p.tipo as tipo_produto, 
                       p.unidade_medida
                FROM Subastas s
                JOIN Produtos p ON s.id_produto = p.id_produto
                WHERE p.id_lonxa = ?
            `, [id_lonxa]);
            return rows;
        } catch (error) {
            throw new Error(`Error al obtener subastas por lonxa: ${error.message}`);
        }
    }

    // Actualizar subasta
    static async actualizar(id, data) {
        try {
            const campos = [];
            const valores = [];

            if (data.prezo_inicial !== undefined) {
                campos.push('prezo_inicial = ?');
                valores.push(data.prezo_inicial);
            }
            if (data.cantidade_actual_restante !== undefined) {
                campos.push('cantidade_actual_restante = ?');
                valores.push(data.cantidade_actual_restante);
            }
            if (data.data_inicio) {
                campos.push('data_inicio = ?');
                valores.push(data.data_inicio);
            }
            if (data.data_fin) {
                campos.push('data_fin = ?');
                valores.push(data.data_fin);
            }
            if (data.estado) {
                campos.push('estado = ?');
                valores.push(data.estado);
            }

            if (campos.length === 0) {
                throw new Error('No hay campos para actualizar');
            }

            valores.push(id);
            const [result] = await db.execute(
                `UPDATE Subastas SET ${campos.join(', ')} WHERE id_subasta = ?`,
                valores
            );
            return result.affectedRows > 0;
        } catch (error) {
            throw new Error(`Error al actualizar subasta: ${error.message}`);
        }
    }

    // Eliminar subasta
    static async eliminar(id) {
        try {
            const [result] = await db.execute(
                'DELETE FROM Subastas WHERE id_subasta = ?',
                [id]
            );
            return result.affectedRows > 0;
        } catch (error) {
            throw new Error(`Error al eliminar subasta: ${error.message}`);
        }
    }

    // Cerrar subasta
    static async cerrar(id) {
        try {
            const [result] = await db.execute(
                `UPDATE Subastas SET estado = 'Pechada' WHERE id_subasta = ?`,
                [id]
            );
            return result.affectedRows > 0;
        } catch (error) {
            throw new Error(`Error al cerrar subasta: ${error.message}`);
        }
    }

    // Cancelar subasta
    static async cancelar(id) {
        try {
            const [result] = await db.execute(
                `UPDATE Subastas SET estado = 'Cancelada' WHERE id_subasta = ?`,
                [id]
            );
            return result.affectedRows > 0;
        } catch (error) {
            throw new Error(`Error al cancelar subasta: ${error.message}`);
        }
    }
}

export default Subasta;
