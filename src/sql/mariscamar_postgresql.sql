-- Script de Creación da Base de Datos 'mariscamar' para PostgreSQL

-- TÁBOA BASE: USUARIOS
CREATE TABLE IF NOT EXISTS Usuarios (
    id_usuario SERIAL PRIMARY KEY,
    correo VARCHAR(100) NOT NULL UNIQUE,
    contrasinal_hash VARCHAR(255) NOT NULL,
    nome_completo VARCHAR(150) NOT NULL,
    tipo VARCHAR(20) NOT NULL CHECK (tipo IN ('Comprador', 'Lonxa', 'Administrador')),
    estado VARCHAR(30) NOT NULL DEFAULT 'Pendente_de_Verificación' CHECK (estado IN ('Pendente_de_Verificación', 'Verificado', 'Suspendido')),
    data_rexistro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- TÁBOAS SUBCLASE (Relación 1:1 coa táboa Usuarios)

CREATE TABLE IF NOT EXISTS Administradores (
    id_usuario INTEGER PRIMARY KEY,
    nivel_acceso VARCHAR(20) NOT NULL CHECK (nivel_acceso IN ('Superadmin', 'Moderador', 'Soporte')),
    departamento VARCHAR(50),
    data_incorporacion DATE,
    FOREIGN KEY (id_usuario) REFERENCES Usuarios(id_usuario) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS Lonxas (
    id_usuario INTEGER PRIMARY KEY,
    nome_comercial VARCHAR(100) NOT NULL,
    CIF VARCHAR(20) UNIQUE,
    telefono_contacto VARCHAR(20),
    endereco_envio VARCHAR(255),
    FOREIGN KEY (id_usuario) REFERENCES Usuarios(id_usuario) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS Compradores (
    id_usuario INTEGER PRIMARY KEY,
    DNI VARCHAR(20) UNIQUE,
    telefono_contacto VARCHAR(20),
    endereco_envio_predeterminado VARCHAR(255),
    FOREIGN KEY (id_usuario) REFERENCES Usuarios(id_usuario) ON DELETE CASCADE
);

-- TÁBOA PRODUTOS
CREATE TABLE IF NOT EXISTS Produtos (
    id_produto SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    tipo VARCHAR(50),
    cantidade_total DECIMAL(10, 2) NOT NULL,
    unidade_medida VARCHAR(10) NOT NULL DEFAULT 'kg',
    id_lonxa INTEGER NOT NULL,
    data_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (id_lonxa) REFERENCES Lonxas(id_usuario) ON DELETE RESTRICT
);

-- TÁBOA SUBASTAS
CREATE TABLE IF NOT EXISTS Subastas (
    id_subasta SERIAL PRIMARY KEY,
    id_produto INTEGER NOT NULL UNIQUE,
    prezo_inicial DECIMAL(10, 2) NOT NULL,
    cantidade_actual_restante DECIMAL(10, 2) NOT NULL,
    data_inicio TIMESTAMP NOT NULL,
    data_fin TIMESTAMP NOT NULL,
    estado VARCHAR(20) NOT NULL DEFAULT 'Activa' CHECK (estado IN ('Activa', 'Pechada', 'Cancelada')),
    
    FOREIGN KEY (id_produto) REFERENCES Produtos(id_produto) ON DELETE CASCADE
);

-- TÁBOA OFERTAS
CREATE TABLE IF NOT EXISTS Ofertas (
    id_oferta SERIAL PRIMARY KEY,
    id_subasta INTEGER NOT NULL,
    id_comprador INTEGER NOT NULL,
    importe DECIMAL(10, 2) NOT NULL,
    cantidade_poxada DECIMAL(10, 2) NOT NULL,
    data_hora TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (id_subasta) REFERENCES Subastas(id_subasta) ON DELETE CASCADE,
    FOREIGN KEY (id_comprador) REFERENCES Compradores(id_usuario) ON DELETE RESTRICT
);

-- TÁBOA FACTURAS
CREATE TABLE IF NOT EXISTS Facturas (
    id_factura SERIAL PRIMARY KEY,
    id_subasta INTEGER NOT NULL,
    id_comprador INTEGER NOT NULL,
    importe_total DECIMAL(10, 2) NOT NULL,
    cantidade_comprada DECIMAL(10, 2) NOT NULL,
    data_emision TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (id_subasta) REFERENCES Subastas(id_subasta) ON DELETE RESTRICT,
    FOREIGN KEY (id_comprador) REFERENCES Compradores(id_usuario) ON DELETE RESTRICT
);

-- Crear índices para mejorar el rendimiento
CREATE INDEX IF NOT EXISTS idx_usuarios_tipo ON Usuarios(tipo);
CREATE INDEX IF NOT EXISTS idx_usuarios_estado ON Usuarios(estado);
CREATE INDEX IF NOT EXISTS idx_produtos_lonxa ON Produtos(id_lonxa);
CREATE INDEX IF NOT EXISTS idx_subastas_estado ON Subastas(estado);
CREATE INDEX IF NOT EXISTS idx_ofertas_subasta ON Ofertas(id_subasta);
CREATE INDEX IF NOT EXISTS idx_ofertas_comprador ON Ofertas(id_comprador);
CREATE INDEX IF NOT EXISTS idx_facturas_subasta ON Facturas(id_subasta);
CREATE INDEX IF NOT EXISTS idx_facturas_comprador ON Facturas(id_comprador);
