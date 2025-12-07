import db from '../config/database.js';

class Subasta {
    constructor(data) {
        this.id_subasta = data.id_subasta;
        this.id_produto = data.id_produto;
        this.id_usuario_lonxa = data.id_usuario_lonxa;
        this.data_inicio = data.data_inicio;
        this.data_fin = data.data_fin;
        this.estado = data.estado;
    }

    
}

export default Subasta;
