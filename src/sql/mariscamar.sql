-- =============================================================
-- DROP previo para reiniciar entorno (opcional)
-- =============================================================
DROP TABLE IF EXISTS Facturas CASCADE;
DROP TABLE IF EXISTS Ofertas CASCADE;
DROP TABLE IF EXISTS Subastas CASCADE;
DROP TABLE IF EXISTS Produtos CASCADE;
DROP TABLE IF EXISTS Usuarios CASCADE;

-- =============================================================
-- TABLA USUARIOS
-- =============================================================
CREATE TABLE Usuarios (
    id_usuario SERIAL PRIMARY KEY,
    nome VARCHAR(100),
    correo VARCHAR(150) UNIQUE,
    contrasinal VARCHAR(150),
    tipo VARCHAR(20) CHECK (tipo IN ('admin', 'comprador', 'lonxa')),
    estado VARCHAR(50),
    CIF_NIF VARCHAR(30)
);

-- =============================================================
-- TABLA PRODUCTOS
-- =============================================================
CREATE TABLE Produtos (
    id_produto SERIAL PRIMARY KEY,
    nome VARCHAR(100),
    tipo VARCHAR(50),
    cantidade INT CHECK (cantidade >= 0),
    prezo_inicial NUMERIC(10,2),
    id_usuario_propietario INT NOT NULL,
    imagen VARCHAR(255),
    FOREIGN KEY (id_usuario_propietario) REFERENCES Usuarios(id_usuario)
);

-- =============================================================
-- TABLA SUBASTAS
-- =============================================================
CREATE TABLE Subastas (
    id_subasta SERIAL PRIMARY KEY,
    id_produto INT UNIQUE NOT NULL,
    id_usuario_lonxa INT NOT NULL,
    hora_inicio TIMESTAMP NOT NULL,
    hora_fin TIMESTAMP NOT NULL,
    estado VARCHAR(20) CHECK (estado IN ('pendiente', 'activa', 'cerrada')),
    FOREIGN KEY (id_produto) REFERENCES Produtos(id_produto),
    FOREIGN KEY (id_usuario_lonxa) REFERENCES Usuarios(id_usuario)
);

-- =============================================================
-- TABLA OFERTAS
-- =============================================================
CREATE TABLE Ofertas (
    id_oferta SERIAL PRIMARY KEY,
    id_subasta INT NOT NULL,
    id_usuario INT NOT NULL,
    importe NUMERIC(10,2) NOT NULL,
    cantidades INT CHECK (cantidades > 0),
    data_hora TIMESTAMP DEFAULT NOW(),
    FOREIGN KEY (id_subasta) REFERENCES Subastas(id_subasta),
    FOREIGN KEY (id_usuario) REFERENCES Usuarios(id_usuario)
);

-- =============================================================
-- TABLA FACTURAS
-- =============================================================
CREATE TABLE Facturas (
    id_factura SERIAL PRIMARY KEY,
    id_usuario INT NOT NULL,
    id_subasta INT NOT NULL,
    importe_total NUMERIC(10,2),
    cantidad INT NOT NULL,
    data_emision TIMESTAMP DEFAULT NOW(),
    FOREIGN KEY (id_usuario) REFERENCES Usuarios(id_usuario),
    FOREIGN KEY (id_subasta) REFERENCES Subastas(id_subasta)
);

-- =============================================================
-- TRIGGER PARA CERRAR SUBASTA CUANDO SE AGOTA EL STOCK
-- =============================================================
CREATE OR REPLACE FUNCTION cerrar_subasta_si_agotado()
RETURNS TRIGGER AS $$
DECLARE
    producto_id INT;
BEGIN
    producto_id := NEW.id_produto;

    IF NEW.cantidade <= 0 THEN
        UPDATE Subastas
        SET estado = 'cerrada',
            data_fin = NOW()
        WHERE id_produto = producto_id;
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_cerrar_subasta
AFTER UPDATE ON Produtos
FOR EACH ROW
WHEN (OLD.cantidade <> NEW.cantidade)
EXECUTE FUNCTION cerrar_subasta_si_agotado();
