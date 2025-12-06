import db from '../config/database.js';

class Comprador {
    constructor(data) {
        this.id_usuario = data.id_usuario;
        this.DNI = data.DNI;
        this.telefono_contacto = data.telefono_contacto;
        this.endereco_envio_predeterminado = data.endereco_envio_predeterminado;
    }

    // Crear un nuevo comprador
    static async crear(data) {
        try {
            const [result] = await db.execute(
                `INSERT INTO Compradores (id_usuario, DNI, telefono_contacto, endereco_envio_predeterminado) 
                 VALUES (?, ?, ?, ?)`,
                [data.id_usuario, data.DNI, data.telefono_contacto, data.endereco_envio_predeterminado]
            );
            return result.affectedRows > 0;
        } catch (error) {
            throw new Error(`Error al crear comprador: ${error.message}`);
        }
    }

    // Obtener todos los compradores con datos de usuario
    static async obtenerTodos() {
        try {
            const [rows] = await db.execute(`
                SELECT c.*, u.correo, u.nome_completo, u.estado, u.data_rexistro
                FROM Compradores c
                JOIN Usuarios u ON c.id_usuario = u.id_usuario
            `);
            return rows;
        } catch (error) {
            throw new Error(`Error al obtener compradores: ${error.message}`);
        }
    }

    // Obtener comprador por ID
    static async obtenerPorId(id) {
        try {
            const [rows] = await db.execute(`
                SELECT c.*, u.correo, u.nome_completo, u.estado, u.data_rexistro
                FROM Compradores c
                JOIN Usuarios u ON c.id_usuario = u.id_usuario
                WHERE c.id_usuario = ?
            `, [id]);
            return rows.length > 0 ? rows[0] : null;
        } catch (error) {
            throw new Error(`Error al obtener comprador: ${error.message}`);
        }
    }

    // Obtener comprador por DNI
    static async obtenerPorDNI(dni) {
        try {
            const [rows] = await db.execute(`
                SELECT c.*, u.correo, u.nome_completo, u.estado, u.data_rexistro
                FROM Compradores c
                JOIN Usuarios u ON c.id_usuario = u.id_usuario
                WHERE c.DNI = ?
            `, [dni]);
            return rows.length > 0 ? rows[0] : null;
        } catch (error) {
            throw new Error(`Error al obtener comprador por DNI: ${error.message}`);
        }
    }

    // Actualizar comprador
    static async actualizar(id, data) {
        try {
            const campos = [];
            const valores = [];

            if (data.DNI !== undefined) {
                campos.push('DNI = ?');
                valores.push(data.DNI);
            }
            if (data.telefono_contacto !== undefined) {
                campos.push('telefono_contacto = ?');
                valores.push(data.telefono_contacto);
            }
            if (data.endereco_envio_predeterminado !== undefined) {
                campos.push('endereco_envio_predeterminado = ?');
                valores.push(data.endereco_envio_predeterminado);
            }

            if (campos.length === 0) {
                throw new Error('No hay campos para actualizar');
            }

            valores.push(id);
            const [result] = await db.execute(
                `UPDATE Compradores SET ${campos.join(', ')} WHERE id_usuario = ?`,
                valores
            );
            return result.affectedRows > 0;
        } catch (error) {
            throw new Error(`Error al actualizar comprador: ${error.message}`);
        }
    }

    // Eliminar comprador
    static async eliminar(id) {
        try {
            const [result] = await db.execute(
                'DELETE FROM Compradores WHERE id_usuario = ?',
                [id]
            );
            return result.affectedRows > 0;
        } catch (error) {
            throw new Error(`Error al eliminar comprador: ${error.message}`);
        }
    }

    // Obtener compradores verificados
    static async obtenerVerificados() {
        try {
            const [rows] = await db.execute(`
                SELECT c.*, u.correo, u.nome_completo, u.estado, u.data_rexistro
                FROM Compradores c
                JOIN Usuarios u ON c.id_usuario = u.id_usuario
                WHERE u.estado = 'Verificado'
            `);
            return rows;
        } catch (error) {
            throw new Error(`Error al obtener compradores verificados: ${error.message}`);
        }
    }
}

export default Comprador;
