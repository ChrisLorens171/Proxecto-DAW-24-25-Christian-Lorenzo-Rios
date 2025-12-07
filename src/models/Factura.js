import db from '../config/database.js';

class Factura {
    constructor(data) {
        this.id_factura = data.id_factura;
        this.id_usuario = data.id_usuario;
        this.id_subasta = data.id_subasta;
        this.importe_total = data.importe_total;
        this.cantidad = data.cantidad;
        this.data_emision = data.data_emision;
    }

    
}

export default Factura;
