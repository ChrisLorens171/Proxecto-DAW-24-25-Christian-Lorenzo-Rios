import db from '../config/database.js';

class Produto {
    constructor(data) {
        this.id_produto = data.id_produto;
        this.nome = data.nome;
        this.tipo = data.tipo;
        this.cantidade_total = data.cantidade_total;
        this.unidade_medida = data.unidade_medida;
        this.id_lonxa = data.id_lonxa;
        this.data_creacion = data.data_creacion;
    }

    // Crear un nuevo produto
    static async crear(data) {
        try {
            const [result] = await db.execute(
                `INSERT INTO Produtos (nome, tipo, cantidade_total, unidade_medida, id_lonxa) 
                 VALUES (?, ?, ?, ?, ?)`,
                [data.nome, data.tipo, data.cantidade_total, data.unidade_medida || 'kg', data.id_lonxa]
            );
            return result.insertId;
        } catch (error) {
            throw new Error(`Error al crear produto: ${error.message}`);
        }
    }

    // Obtener todos los produtos
    static async obtenerTodos() {
        try {
            const [rows] = await db.execute(`
                SELECT p.*, l.nome_comercial, u.nome_completo as nome_lonxa
                FROM Produtos p
                JOIN Lonxas l ON p.id_lonxa = l.id_usuario
                JOIN Usuarios u ON l.id_usuario = u.id_usuario
            `);
            return rows;
        } catch (error) {
            throw new Error(`Error al obtener produtos: ${error.message}`);
        }
    }

    // Obtener produto por ID
    static async obtenerPorId(id) {
        try {
            const [rows] = await db.execute(`
                SELECT p.*, l.nome_comercial, u.nome_completo as nome_lonxa
                FROM Produtos p
                JOIN Lonxas l ON p.id_lonxa = l.id_usuario
                JOIN Usuarios u ON l.id_usuario = u.id_usuario
                WHERE p.id_produto = ?
            `, [id]);
            return rows.length > 0 ? rows[0] : null;
        } catch (error) {
            throw new Error(`Error al obtener produto: ${error.message}`);
        }
    }

    // Obtener produtos por lonxa
    static async obtenerPorLonxa(id_lonxa) {
        try {
            const [rows] = await db.execute(`
                SELECT p.*, l.nome_comercial
                FROM Produtos p
                JOIN Lonxas l ON p.id_lonxa = l.id_usuario
                WHERE p.id_lonxa = ?
            `, [id_lonxa]);
            return rows;
        } catch (error) {
            throw new Error(`Error al obtener produtos por lonxa: ${error.message}`);
        }
    }

    // Obtener produtos por tipo
    static async obtenerPorTipo(tipo) {
        try {
            const [rows] = await db.execute(`
                SELECT p.*, l.nome_comercial, u.nome_completo as nome_lonxa
                FROM Produtos p
                JOIN Lonxas l ON p.id_lonxa = l.id_usuario
                JOIN Usuarios u ON l.id_usuario = u.id_usuario
                WHERE p.tipo = ?
            `, [tipo]);
            return rows;
        } catch (error) {
            throw new Error(`Error al obtener produtos por tipo: ${error.message}`);
        }
    }

    // Actualizar produto
    static async actualizar(id, data) {
        try {
            const campos = [];
            const valores = [];

            if (data.nome) {
                campos.push('nome = ?');
                valores.push(data.nome);
            }
            if (data.tipo !== undefined) {
                campos.push('tipo = ?');
                valores.push(data.tipo);
            }
            if (data.cantidade_total !== undefined) {
                campos.push('cantidade_total = ?');
                valores.push(data.cantidade_total);
            }
            if (data.unidade_medida) {
                campos.push('unidade_medida = ?');
                valores.push(data.unidade_medida);
            }

            if (campos.length === 0) {
                throw new Error('No hay campos para actualizar');
            }

            valores.push(id);
            const [result] = await db.execute(
                `UPDATE Produtos SET ${campos.join(', ')} WHERE id_produto = ?`,
                valores
            );
            return result.affectedRows > 0;
        } catch (error) {
            throw new Error(`Error al actualizar produto: ${error.message}`);
        }
    }

    // Eliminar produto
    static async eliminar(id) {
        try {
            const [result] = await db.execute(
                'DELETE FROM Produtos WHERE id_produto = ?',
                [id]
            );
            return result.affectedRows > 0;
        } catch (error) {
            throw new Error(`Error al eliminar produto: ${error.message}`);
        }
    }
}

export default Produto;
