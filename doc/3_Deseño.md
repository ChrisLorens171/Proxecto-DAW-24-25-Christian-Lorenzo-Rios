# FASE DE DESEÑO

- [FASE DE DESEÑO](#fase-de-deseño)
  - [1- Diagrama da arquitectura](#1--diagrama-da-arquitectura)
  - [2- Casos de uso](#2--casos-de-uso)
  - [3- Diagrama de Base de Datos](#3--diagrama-de-base-de-datos)
  - [4- Deseño de interface de usuarios](#4--deseño-de-interface-de-usuarios)

## 1- Diagrama da arquitectura

No seguinte diagrama mostramos o funcionamento de forma gráfica e sinxela entre as diferentes partes e a súa interrelación.

```mermaid
---
config:
  layout: dagre
---
flowchart LR
  %% Frontend
  subgraph Frontend["Cliente"]
      A["Navegador Web"]
  end

  %% Backend
  subgraph Backend["Lóxica de Negocio"]
      B["Balanceador de Carga (LB)"]
      subgraph API["Servidores API REST"]
          API1["Servidor Express API"]
      end
      subgraph WS["Servidores WebSockets"]
          WS1["Servidor Socket.io"]
      end
      Redis[("Redis Caché / PubSub")]
  end

  %% Almacenamento
  subgraph Almacenamento["Datos e Arquivos"]
      DB[("Base de Datos PostgreSQL")]
      FS["Almacenamento de Arquivos"]
  end

  %% Conexións
  A -- "1. Login / CRUD (HTTPS)" --> B
  A -- "2. Conexión en tempo real (WSS)" --> B

  B -- "1a. Accións Admin" --> API1
  B -- "2a. Notificacións en tempo real" --> WS1

  API1 -- "Consultas SQL" --> DB
  WS1 -- "Consultas de estado" --> DB
  API1 -- "Gardar imaxes" --> FS
  API1 -- "Lectura/Escritura de sesión" --> Redis
  WS1 -- "Eventos" --> Redis

  style A fill:#ADD8E6,stroke:#333,color:#FFFFFF,stroke-width:1px
  style B fill:#FFCCE6,stroke:#333,color:#FFFFFF,stroke-width:1px
  style Redis fill:#FFE680,stroke:#333,stroke-width:1px

```
    
## 2- Casos de uso

### Diagrama de casos para a xestión de Mariscamar

<p align="center">
  <img src="https://github.com/ChrisLorens171/Proxecto-DAW-24-25-Christian-Lorenzo-Rios/blob/7864b1e3782034d93ee6c1a3327137218663d263/doc/img/CasosUsoMariscamar.png" alt="Diagrama casos de uso">
</p>

## 3- Diagrama de Base de Datos

### Modelo Entidade/relación

<p align="center">
  <img src="https://github.com/ChrisLorens171/Proxecto-DAW-24-25-Christian-Lorenzo-Rios/blob/f1e53fa701f3328d0a3e4080abdc5a4a1e15cfc0/doc/img/ModeloEntidaRelacion.png">
</p>

### Modelo Relacional
Modelo relacional realizado coa plataforma ChartDB.io.  

<p align="center">
  <img src="https://github.com/ChrisLorens171/Proxecto-DAW-24-25-Christian-Lorenzo-Rios/blob/3c5e5f9e5277560cad4223ef2acfca0fa9702fa7/doc/img/Modelo_Relacional.png" alt="Modelo Relacional">
</p>

## 4- Deseño de interface de usuarios
Prototipos compartidos por Figma [Enlace a proxecto](https://www.figma.com/design/2939dhrpvAX3bEHqzN4ft7/Prototipo-Mariscamar?node-id=0-1&p=f&t=BhOonfjNNnImdByy-0)

[**<-Anterior**](../../README.md)
