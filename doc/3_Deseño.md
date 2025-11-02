# FASE DE DESEÑO

- [FASE DE DESEÑO](#fase-de-deseño)
  - [1- Diagrama da arquitectura](#1--diagrama-da-arquitectura)
  - [2- Casos de uso](#2--casos-de-uso)
  - [3- Diagrama de Base de Datos](#3--diagrama-de-base-de-datos)
  - [4- Deseño de interface de usuarios](#4--deseño-de-interface-de-usuarios)

> *EXPLICACIÓN:* Este documento inclúe os diferentes diagramas, esquemas e deseños que axuden a describir mellor o [nome do proxecto] detallando os seus compoñentes, funcionalidades, bases de datos e interface.

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
      DB[("Base de Datos MySQL/MariaDB")]
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
  <img src="https://github.com/ChrisLorens171/Proxecto-DAW-24-25-Christian-Lorenzo-Rios/blob/f1c32f010321aa23d7d1cc7de4a1edd2d8d6bef2/doc/img/Modelo_Entidad_Relacion.png" alt="Modelo Entidade/Relación">
</p>

### Modelo Relacional
Modelo relacional realizado coa plataforma ChartDB.io.  

<p align="center">
  <img src="https://github.com/ChrisLorens171/Proxecto-DAW-24-25-Christian-Lorenzo-Rios/blob/0eb21eb0a8745e8b44ad1ffadb0c065854d82fa8/doc/img/Modelo_Relacional.png" alt="Modelo Relacional">
</p>

## 4- Deseño de interface de usuarios

> *EXPLICACIÓN:* Neste apartado deben incluírse unha mostra representativan dos mockups da aplicación. Estes mockups deben incluír todas as vistas da aplicación, é dicir, todas as páxinas diferentes que unha persoa usuaria (de calquera tipo) vai poder ver. Tamén se debe incluír información de como navegar dunha ventá a outra.
>
> Os mockups axudan no deseño da aplicación. Poden facerse á man, cunha aplicación ou a través dunha web do estilo: diagrams Un mockup permite ver como se verá unha páxina concreta dunha aplicación web. O deseño de mockups axuda a:
>
> - Avanzar moi rápido na parte frontend: ao ter os mockups realizados, permite saber que elementos vai ter cada vista e onde colocalos.
> - Visualizar a información que vai a ser necesaria mostrar. Sabendo con que información imos traballar e sabendo a información que necesitamos mostrar, podemos organizar os datos dunha forma axeitada para gardalos na base de datos.
>
> Se temos as ideas máis claras do noso proxecto podemos sustituir os mockups por prototipos.
>
[**<-Anterior**](../../README.md)
