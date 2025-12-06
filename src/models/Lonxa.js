import db from '../config/database.js';

class Lonxa {
    constructor(data) {
        this.id_usuario = data.id_usuario;
        this.nome_comercial = data.nome_comercial;
        this.CIF = data.CIF;
        this.telefono_contacto = data.telefono_contacto;
        this.endereco_envio = data.endereco_envio;
    }

    // Crear una nueva lonxa
    static async crear(data) {
        try {
            const [result] = await db.execute(
                `INSERT INTO Lonxas (id_usuario, nome_comercial, CIF, telefono_contacto, endereco_envio) 
                 VALUES (?, ?, ?, ?, ?)`,
                [data.id_usuario, data.nome_comercial, data.CIF, data.telefono_contacto, data.endereco_envio]
            );
            return result.affectedRows > 0;
        } catch (error) {
            throw new Error(`Error al crear lonxa: ${error.message}`);
        }
    }

    // Obtener todas las lonxas con datos de usuario
    static async obtenerTodas() {
        try {
            const [rows] = await db.execute(`
                SELECT l.*, u.correo, u.nome_completo, u.estado, u.data_rexistro
                FROM Lonxas l
                JOIN Usuarios u ON l.id_usuario = u.id_usuario
            `);
            return rows;
        } catch (error) {
            throw new Error(`Error al obtener lonxas: ${error.message}`);
        }
    }

    // Obtener lonxa por ID
    static async obtenerPorId(id) {
        try {
            const [rows] = await db.execute(`
                SELECT l.*, u.correo, u.nome_completo, u.estado, u.data_rexistro
                FROM Lonxas l
                JOIN Usuarios u ON l.id_usuario = u.id_usuario
                WHERE l.id_usuario = ?
            `, [id]);
            return rows.length > 0 ? rows[0] : null;
        } catch (error) {
            throw new Error(`Error al obtener lonxa: ${error.message}`);
        }
    }

    // Obtener lonxa por CIF
    static async obtenerPorCIF(cif) {
        try {
            const [rows] = await db.execute(`
                SELECT l.*, u.correo, u.nome_completo, u.estado, u.data_rexistro
                FROM Lonxas l
                JOIN Usuarios u ON l.id_usuario = u.id_usuario
                WHERE l.CIF = ?
            `, [cif]);
            return rows.length > 0 ? rows[0] : null;
        } catch (error) {
            throw new Error(`Error al obtener lonxa por CIF: ${error.message}`);
        }
    }

    // Actualizar lonxa
    static async actualizar(id, data) {
        try {
            const campos = [];
            const valores = [];

            if (data.nome_comercial) {
                campos.push('nome_comercial = ?');
                valores.push(data.nome_comercial);
            }
            if (data.CIF !== undefined) {
                campos.push('CIF = ?');
                valores.push(data.CIF);
            }
            if (data.telefono_contacto !== undefined) {
                campos.push('telefono_contacto = ?');
                valores.push(data.telefono_contacto);
            }
            if (data.endereco_envio !== undefined) {
                campos.push('endereco_envio = ?');
                valores.push(data.endereco_envio);
            }

            if (campos.length === 0) {
                throw new Error('No hay campos para actualizar');
            }

            valores.push(id);
            const [result] = await db.execute(
                `UPDATE Lonxas SET ${campos.join(', ')} WHERE id_usuario = ?`,
                valores
            );
            return result.affectedRows > 0;
        } catch (error) {
            throw new Error(`Error al actualizar lonxa: ${error.message}`);
        }
    }

    // Eliminar lonxa
    static async eliminar(id) {
        try {
            const [result] = await db.execute(
                'DELETE FROM Lonxas WHERE id_usuario = ?',
                [id]
            );
            return result.affectedRows > 0;
        } catch (error) {
            throw new Error(`Error al eliminar lonxa: ${error.message}`);
        }
    }

    // Obtener lonxas verificadas
    static async obtenerVerificadas() {
        try {
            const [rows] = await db.execute(`
                SELECT l.*, u.correo, u.nome_completo, u.estado, u.data_rexistro
                FROM Lonxas l
                JOIN Usuarios u ON l.id_usuario = u.id_usuario
                WHERE u.estado = 'Verificado'
            `);
            return rows;
        } catch (error) {
            throw new Error(`Error al obtener lonxas verificadas: ${error.message}`);
        }
    }
}

export default Lonxa;
