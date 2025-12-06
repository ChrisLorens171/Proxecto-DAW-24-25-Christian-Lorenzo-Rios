import db from '../config/database.js';

class Administrador {
    constructor(data) {
        this.id_usuario = data.id_usuario;
        this.nivel_acceso = data.nivel_acceso;
        this.departamento = data.departamento;
        this.data_incorporacion = data.data_incorporacion;
    }

    // Crear un nuevo administrador
    static async crear(data) {
        try {
            const [result] = await db.execute(
                `INSERT INTO Administradores (nivel_acceso, departamento, data_incorporacion) 
                 VALUES (?, ?, ?)`,
                [data.nivel_acceso, data.departamento, data.data_incorporacion]
            );
            return result.affectedRows > 0;
        } catch (error) {
            throw new Error(`Error al crear administrador: ${error.message}`);
        }
    }

    // Obtener todos los administradores con datos de usuario
    static async obtenerTodos() {
        try {
            const [rows] = await db.execute(`
                SELECT a.*, u.correo, u.nome_completo, u.estado, u.data_rexistro
                FROM Administradores a
                JOIN Usuarios u ON a.id_usuario = u.id_usuario
            `);
            return rows;
        } catch (error) {
            throw new Error(`Error al obtener administradores: ${error.message}`);
        }
    }

    // Obtener administrador por ID
    static async obtenerPorId(id) {
        try {
            const [rows] = await db.execute(`
                SELECT a.*, u.correo, u.nome_completo, u.estado, u.data_rexistro
                FROM Administradores a
                JOIN Usuarios u ON a.id_usuario = u.id_usuario
                WHERE a.id_usuario = ?
            `, [id]);
            return rows.length > 0 ? rows[0] : null;
        } catch (error) {
            throw new Error(`Error al obtener administrador: ${error.message}`);
        }
    }

    // Actualizar administrador
    static async actualizar(id, data) {
        try {
            const campos = [];
            const valores = [];

            if (data.nivel_acceso) {
                campos.push('nivel_acceso = ?');
                valores.push(data.nivel_acceso);
            }
            if (data.departamento !== undefined) {
                campos.push('departamento = ?');
                valores.push(data.departamento);
            }
            if (data.data_incorporacion !== undefined) {
                campos.push('data_incorporacion = ?');
                valores.push(data.data_incorporacion);
            }

            if (campos.length === 0) {
                throw new Error('No hay campos para actualizar');
            }

            valores.push(id);
            const [result] = await db.execute(
                `UPDATE Administradores SET ${campos.join(', ')} WHERE id_usuario = ?`,
                valores
            );
            return result.affectedRows > 0;
        } catch (error) {
            throw new Error(`Error al actualizar administrador: ${error.message}`);
        }
    }

    // Eliminar administrador
    static async eliminar(id) {
        try {
            const [result] = await db.execute(
                'DELETE FROM Administradores WHERE id_usuario = ?',
                [id]
            );
            return result.affectedRows > 0;
        } catch (error) {
            throw new Error(`Error al eliminar administrador: ${error.message}`);
        }
    }

    // Obtener administradores por nivel de acceso
    static async obtenerPorNivel(nivel_acceso) {
        try {
            const [rows] = await db.execute(`
                SELECT a.*, u.correo, u.nome_completo, u.estado, u.data_rexistro
                FROM Administradores a
                JOIN Usuarios u ON a.id_usuario = u.id_usuario
                WHERE a.nivel_acceso = ?
            `, [nivel_acceso]);
            return rows;
        } catch (error) {
            throw new Error(`Error al obtener administradores por nivel: ${error.message}`);
        }
    }
}

export default Administrador;
