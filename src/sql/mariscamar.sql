-- Script de Creación da Base de Datos 'mariscamar'
USE mariscamar_db;

-- TÁBOA BASE: USUARIOS
CREATE TABLE Usuarios (
    id_usuario INT AUTO_INCREMENT PRIMARY KEY,
    correo VARCHAR(100) NOT NULL UNIQUE,
    contrasinal_hash VARCHAR(255) NOT NULL,
    nome_completo VARCHAR(150) NOT NULL,
    tipo ENUM('Comprador', 'Lonxa', 'Administrador') NOT NULL,
    estado ENUM('Pendente_de_Verificación', 'Verificado', 'Suspendido') NOT NULL DEFAULT 'Pendente_de_Verificación',
    data_rexistro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- TÁBOAS SUBCLASE (Relación 1:1 coa táboa Usuarios)

CREATE TABLE Administradores (
    id_usuario INT PRIMARY KEY,
    nivel_acceso ENUM('Superadmin', 'Moderador', 'Soporte') NOT NULL,
    departamento VARCHAR(50),
    data_incorporacion DATE,
    FOREIGN KEY (id_usuario) REFERENCES Usuarios(id_usuario) ON DELETE CASCADE
);

CREATE TABLE Lonxas (
    id_usuario INT PRIMARY KEY,
    nome_comercial VARCHAR(100) NOT NULL,
    CIF VARCHAR(20) UNIQUE,
    telefono_contacto VARCHAR(20),
    endereco_envio VARCHAR(255),
    FOREIGN KEY (id_usuario) REFERENCES Usuarios(id_usuario) ON DELETE CASCADE
);

CREATE TABLE Compradores (
    id_usuario INT PRIMARY KEY,
    DNI VARCHAR(20) UNIQUE,
    telefono_contacto VARCHAR(20),
    endereco_envio_predeterminado VARCHAR(255),
    FOREIGN KEY (id_usuario) REFERENCES Usuarios(id_usuario) ON DELETE CASCADE
);


-- TÁBOA PRODUTOS
CREATE TABLE Produtos (
    id_produto INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    tipo VARCHAR(50),
    cantidade_total DECIMAL(10, 2) NOT NULL,
    unidade_medida VARCHAR(10) NOT NULL DEFAULT 'kg',
    id_lonxa INT NOT NULL,
    data_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (id_lonxa) REFERENCES Lonxas(id_usuario) ON DELETE RESTRICT -- Un produto sempre debe ter unha Lonxa
);

-- TÁBOA SUBASTAS
CREATE TABLE Subastas (
    id_subasta INT AUTO_INCREMENT PRIMARY KEY,
    id_produto INT NOT NULL UNIQUE, -- CHAVE FORÁNEA ÚNICA (Forza a relación 1:1 con Produtos)
    prezo_inicial DECIMAL(10, 2) NOT NULL,
    cantidade_actual_restante DECIMAL(10, 2) NOT NULL,
    data_inicio TIMESTAMP NOT NULL,
    data_fin TIMESTAMP NOT NULL,
    estado ENUM('Activa', 'Pechada', 'Cancelada') NOT NULL DEFAULT 'Activa',
    
    FOREIGN KEY (id_produto) REFERENCES Produtos(id_produto) ON DELETE CASCADE
);


-- TÁBOA OFERTAS
CREATE TABLE Ofertas (
    id_oferta INT AUTO_INCREMENT PRIMARY KEY,
    id_subasta INT NOT NULL,
    id_comprador INT NOT NULL, -- Chave Foránea a Compradores
    importe DECIMAL(10, 2) NOT NULL,
    cantidade_poxada DECIMAL(10, 2) NOT NULL,
    data_hora TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (id_subasta) REFERENCES Subastas(id_subasta) ON DELETE CASCADE,
    FOREIGN KEY (id_comprador) REFERENCES Compradores(id_usuario) ON DELETE RESTRICT
);

-- TÁBOA FACTURAS
CREATE TABLE Facturas (
    id_factura INT AUTO_INCREMENT PRIMARY KEY,
    id_subasta INT NOT NULL, -- Permite varias facturas por poxa
    id_comprador INT NOT NULL, -- Comprador que recibirá a factura
    importe_total DECIMAL(10, 2) NOT NULL,
    cantidade_comprada DECIMAL(10, 2) NOT NULL,
    data_emision TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (id_subasta) REFERENCES Subastas(id_subasta) ON DELETE RESTRICT,
    FOREIGN KEY (id_comprador) REFERENCES Compradores(id_usuario) ON DELETE RESTRICT
);