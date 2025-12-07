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

    
}

export default Oferta;
