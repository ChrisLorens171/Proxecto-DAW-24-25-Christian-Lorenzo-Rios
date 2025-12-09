import db from '../config/database.js';

class Oferta {
    constructor(data) {
        this.id_oferta = data.id_oferta;
        this.id_subasta = data.id_subasta;
        this.id_usuario = data.id_usuario;
        this.importe = data.importe;
        this.cantidades = data.cantidades;
        this.data_hora = data.data_hora;
    }

    /**
     * Crear una nueva oferta
     */
    static async crear(ofertaData) {
        try {
            const query = `
                INSERT INTO ofertas (id_subasta, id_usuario, importe, cantidades)
                VALUES ($1, $2, $3, $4)
                RETURNING id_oferta, data_hora
            `;
            
            const [result] = await db.query(query, [
                ofertaData.id_subasta,
                ofertaData.id_usuario,
                ofertaData.importe,
                ofertaData.cantidades
            ]);
            
            return result[0];
        } catch (error) {
            console.error('Error al crear oferta:', error);
            throw error;
        }
    }

    /**
     * Obtener ofertas de una subasta
     */
    static async obtenerPorSubasta(id_subasta) {
        try {
            const query = `
                SELECT 
                    o.id_oferta,
                    o.id_subasta,
                    o.id_usuario,
                    o.importe,
                    o.cantidades,
                    o.data_hora,
                    u.nome AS usuario_nome,
                    u.correo AS usuario_correo
                FROM ofertas o
                INNER JOIN usuarios u ON o.id_usuario = u.id_usuario
                WHERE o.id_subasta = $1
                ORDER BY o.data_hora DESC
            `;
            
            const [rows] = await db.query(query, [id_subasta]);
            return rows;
        } catch (error) {
            console.error('Error al obtener ofertas:', error);
            throw error;
        }
    }
}

export default Oferta;
