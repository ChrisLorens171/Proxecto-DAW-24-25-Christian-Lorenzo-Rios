import db from '../config/database.js';

class Usuario {
    constructor(data) {
        this.id_usuario = data.id_usuario;
        this.nome = data.nome;
        this.correo = data.correo;
        this.contrasinal = data.contrasinal;
        this.tipo = data.tipo;
        this.estado = data.estado;
        this.cif_nif = data.cif_nif;
    }

    // Crear un nuevo usuario
    static async crear(data) {
        try {
            const [rows] = await db.query(
                `INSERT INTO usuarios (nome, correo, contrasinal, tipo, estado, cif_nif) 
                 VALUES ($1, $2, $3, $4, $5, $6) RETURNING id_usuario`,
                [data.nome, data.correo, data.contrasinal, data.tipo, data.estado || 'activo', data.cif_nif]
            );
            return rows[0].id_usuario;
        } catch (error) {
            throw new Error(`Error al crear usuario: ${error.message}`);
        }
    }

    // Obtener usuario por correo
    static async obtenerPorCorreo(correo) {
        try {
            const [rows] = await db.query(
                'SELECT * FROM usuarios WHERE correo = $1',
                [correo]
            );
            return rows.length > 0 ? new Usuario(rows[0]) : null;
        } catch (error) {
            throw new Error(`Error al obtener usuario por correo: ${error.message}`);
        }
    }
}

export default Usuario;
