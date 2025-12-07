import db from '../config/database.js';

class Produto {
    constructor(data) {
        this.id_produto = data.id_produto;
        this.nome = data.nome;
        this.tipo = data.tipo;
        this.cantidade = data.cantidade;
        this.prezo_inicial = data.prezo_inicial;
        this.id_usuario_propietario = data.id_usuario_propietario;
    }

    
}

export default Produto;
