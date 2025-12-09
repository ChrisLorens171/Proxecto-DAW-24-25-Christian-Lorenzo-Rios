import db from '../config/database.js';

class Subasta {
    constructor(data) {
        this.id_subasta = data.id_subasta;
        this.id_produto = data.id_produto;
        this.id_usuario_lonxa = data.id_usuario_lonxa;
        this.hora_inicio = data.hora_inicio;
        this.hora_fin = data.hora_fin;
        this.estado = data.estado;
    }

    /**
     * Obtener todas las subastas con información del producto y vendedor
     */
    static async obtenerTodas() {
        try {
            const query = `
                SELECT 
                    s.id_subasta,
                    s.hora_inicio,
                    s.hora_fin,
                    s.estado,
                    p.id_produto,
                    p.nome AS produto_nome,
                    p.tipo AS produto_tipo,
                    p.cantidade,
                    p.prezo_inicial,
                    p.imagen,
                    u.id_usuario AS vendedor_id,
                    u.nome AS vendedor_nome,
                    u.correo AS vendedor_correo
                FROM subastas s
                INNER JOIN produtos p ON s.id_produto = p.id_produto
                INNER JOIN usuarios u ON s.id_usuario_lonxa = u.id_usuario
                WHERE s.estado = 'activa' OR s.estado = 'pendiente'
                ORDER BY s.hora_inicio DESC
            `;
            
            const [rows] = await db.query(query);
            return rows;
        } catch (error) {
            console.error('Error al obtener subastas:', error);
            throw error;
        }
    }

    /**
     * Crear una nueva subasta
     */
    static async crear(subastaData) {
        try {
            const query = `
                INSERT INTO subastas (id_produto, id_usuario_lonxa, hora_inicio, hora_fin, estado)
                VALUES ($1, $2, $3, $4, $5)
                RETURNING id_subasta
            `;
            
            const [result] = await db.query(query, [
                subastaData.id_produto,
                subastaData.id_usuario_lonxa,
                subastaData.hora_inicio,
                subastaData.hora_fin,
                subastaData.estado
            ]);
            
            return result[0].id_subasta;
        } catch (error) {
            console.error('Error al crear subasta:', error);
            throw error;
        }
    }

    /**
     * Obtener subasta por ID
     */
    static async obtenerPorId(id_subasta) {
        try {
            const query = `
                SELECT 
                    s.id_subasta,
                    s.id_produto,
                    s.id_usuario_lonxa,
                    s.hora_inicio,
                    s.hora_fin,
                    s.estado
                FROM subastas s
                WHERE s.id_subasta = $1
            `;
            
            const [rows] = await db.query(query, [id_subasta]);
            return rows[0] || null;
        } catch (error) {
            console.error('Error al obtener subasta:', error);
            throw error;
        }
    }

    /**
     * Obtener subasta por ID con datos completos del producto
     */
    static async obtenerPorIdCompleto(id_subasta) {
        try {
            const query = `
                SELECT 
                    s.id_subasta,
                    s.id_produto,
                    s.id_usuario_lonxa,
                    s.hora_inicio,
                    s.hora_fin,
                    s.estado,
                    p.nome AS produto_nome,
                    p.tipo AS produto_tipo,
                    p.cantidade,
                    p.prezo_inicial
                FROM subastas s
                INNER JOIN produtos p ON s.id_produto = p.id_produto
                WHERE s.id_subasta = $1
            `;
            
            const [rows] = await db.query(query, [id_subasta]);
            return rows[0] || null;
        } catch (error) {
            console.error('Error al obtener subasta completa:', error);
            throw error;
        }
    }

    /**
     * Actualizar subasta
     */
    static async actualizar(id_subasta, subastaData) {
        try {
            const query = `
                UPDATE subastas
                SET hora_inicio = $1,
                    hora_fin = $2,
                    estado = $3
                WHERE id_subasta = $4
            `;
            
            await db.query(query, [
                subastaData.hora_inicio,
                subastaData.hora_fin,
                subastaData.estado,
                id_subasta
            ]);
        } catch (error) {
            console.error('Error al actualizar subasta:', error);
            throw error;
        }
    }

    /**
     * Eliminar subasta por ID
     */
    static async eliminar(id_subasta) {
        try {
            const query = `
                DELETE FROM subastas
                WHERE id_subasta = $1
            `;
            
            await db.query(query, [id_subasta]);
        } catch (error) {
            console.error('Error al eliminar subasta:', error);
            throw error;
        }
    }
}

export default Subasta;
