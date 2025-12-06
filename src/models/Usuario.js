import db from '../config/database.js';

class Usuario {
    constructor(data) {
        this.id_usuario = data.id_usuario;
        this.correo = data.correo;
        this.contrasinal_hash = data.contrasinal_hash;
        this.nome_completo = data.nome_completo;
        this.tipo = data.tipo;
        this.estado = data.estado;
        this.data_rexistro = data.data_rexistro;
    }

    // Crear un nuevo usuario
    static async crear(data) {
        try {
            const [result] = await db.execute(
                `INSERT INTO Usuarios (correo, contrasinal_hash, nome_completo, tipo, estado) 
                 VALUES (?, ?, ?, ?, ?)`,
                [data.correo, data.contrasinal_hash, data.nome_completo, data.tipo, data.estado || 'Pendente_de_Verificación']
            );
            return result.insertId;
        } catch (error) {
            throw new Error(`Error al crear usuario: ${error.message}`);
        }
    }

    // Obtener todos los usuarios
    static async obtenerTodos() {
        try {
            const [rows] = await db.execute('SELECT * FROM Usuarios');
            return rows.map(row => new Usuario(row));
        } catch (error) {
            throw new Error(`Error al obtener usuarios: ${error.message}`);
        }
    }

    // Obtener usuario por ID
    static async obtenerPorId(id) {
        try {
            const [rows] = await db.execute(
                'SELECT * FROM Usuarios WHERE id_usuario = ?',
                [id]
            );
            return rows.length > 0 ? new Usuario(rows[0]) : null;
        } catch (error) {
            throw new Error(`Error al obtener usuario: ${error.message}`);
        }
    }

    // Actualizar usuario
    static async actualizar(id, data) {
        try {
            const campos = [];
            const valores = [];

            if (data.correo) {
                campos.push('correo = ?');
                valores.push(data.correo);
            }
            if (data.contrasinal_hash) {
                campos.push('contrasinal_hash = ?');
                valores.push(data.contrasinal_hash);
            }
            if (data.nome_completo) {
                campos.push('nome_completo = ?');
                valores.push(data.nome_completo);
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
                `UPDATE Usuarios SET ${campos.join(', ')} WHERE id_usuario = ?`,
                valores
            );
            return result.affectedRows > 0;
        } catch (error) {
            throw new Error(`Error al actualizar usuario: ${error.message}`);
        }
    }

    // Eliminar usuario
    static async eliminar(id) {
        try {
            const [result] = await db.execute(
                'DELETE FROM Usuarios WHERE id_usuario = ?',
                [id]
            );
            return result.affectedRows > 0;
        } catch (error) {
            throw new Error(`Error al eliminar usuario: ${error.message}`);
        }
    }

    // Obtener usuarios por tipo
    static async obtenerPorTipo(tipo) {
        try {
            const [rows] = await db.execute(
                'SELECT * FROM Usuarios WHERE tipo = ?',
                [tipo]
            );
            return rows.map(row => new Usuario(row));
        } catch (error) {
            throw new Error(`Error al obtener usuarios por tipo: ${error.message}`);
        }
    }

    // Obtener usuarios por estado
    static async obtenerPorEstado(estado) {
        try {
            const [rows] = await db.execute(
                'SELECT * FROM Usuarios WHERE estado = ?',
                [estado]
            );
            return rows.map(row => new Usuario(row));
        } catch (error) {
            throw new Error(`Error al obtener usuarios por estado: ${error.message}`);
        }
    }
}

export default Usuario;
