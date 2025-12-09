import db from '../config/database.js';

class Produto {
    constructor(data) {
        this.id_produto = data.id_produto;
        this.nome = data.nome;
        this.tipo = data.tipo;
        this.cantidade = data.cantidade;
        this.prezo_inicial = data.prezo_inicial;
        this.id_usuario_propietario = data.id_usuario_propietario;
        this.imagen = data.imagen;
    }

    /**
     * Crear un nuevo producto
     */
    static async crear(productoData) {
        try {
            const query = `
                INSERT INTO produtos (nome, tipo, cantidade, prezo_inicial, id_usuario_propietario, imagen)
                VALUES ($1, $2, $3, $4, $5, $6)
                RETURNING id_produto
            `;
            
            console.log('Query Produto:', query);
            console.log('Params:', [
                productoData.nome,
                productoData.tipo,
                productoData.cantidade,
                productoData.prezo_inicial,
                productoData.id_usuario_propietario,
                productoData.imagen
            ]);
            
            const [result] = await db.query(query, [
                productoData.nome,
                productoData.tipo,
                productoData.cantidade,
                productoData.prezo_inicial,
                productoData.id_usuario_propietario,
                productoData.imagen
            ]);
            
            console.log('Result Produto:', result);
            return result[0].id_produto;
        } catch (error) {
            console.error('Error al crear producto:', error);
            throw error;
        }
    }

    /**
     * Actualizar producto
     */
    static async actualizar(id_produto, productoData) {
        try {
            const query = `
                UPDATE produtos
                SET nome = $1,
                    tipo = $2,
                    cantidade = $3,
                    prezo_inicial = $4,
                    imagen = $5
                WHERE id_produto = $6
            `;
            
            await db.query(query, [
                productoData.nome,
                productoData.tipo,
                productoData.cantidade,
                productoData.prezo_inicial,
                productoData.imagen,
                id_produto
            ]);
        } catch (error) {
            console.error('Error al actualizar producto:', error);
            throw error;
        }
    }

    /**
     * Eliminar producto por ID
     */
    static async eliminar(id_produto) {
        try {
            const query = `
                DELETE FROM produtos
                WHERE id_produto = $1
            `;
            
            await db.query(query, [id_produto]);
        } catch (error) {
            console.error('Error al eliminar producto:', error);
            throw error;
        }
    }
}

export default Produto;
