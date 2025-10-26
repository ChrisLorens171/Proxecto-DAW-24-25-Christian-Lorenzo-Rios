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
sequenceDiagram
    title Arquitectura Mariscamar
    
    participant L as Lonxa
    participant C as Comprador
    participant WS as Servidor WebSocket
    participant App as Servidor Mariscamar
    
    L->>App: Crear poxa
    App-->>L: Poxa creada
    
    Note over C,WS: Compradores e lonxas conéctanse o WS
    C->>WS: Conexión WebSocket
    L->>WS: Conexión WebSocket

    loop Proceso da poxa
        C->>WS: Mandar poxa (WebSockets)
        WS->>App: Validar e procesar poxa
        
        Note over App: Almacenar nova poxa e actualizar precio
        App->>WS: Actualización de poxa
        WS-->>C: Notificación de nova poxa
        WS-->>L: Notificación de nova poxa
    end
    
    App->>WS: Finalizar poxa (Tempo Límite)
    WS-->>C: Notificar resultado
    WS-->>L: Notificar resultado
```
    
## 2- Casos de uso

### Diagrama de casos para a xestión de Mariscamar

<p align="center">
  <img src="https://github.com/ChrisLorens171/Proxecto-DAW-24-25-Christian-Lorenzo-Rios/blob/b7b8863e27725bbac07bf1ae1cb14da5488603d7/doc/img/CasosdeUso.png" alt="Diagrama casos de uso">
</p>

## 3- Diagrama de Base de Datos

### Modelo Entidade/relación

<p align="center">
  <img src="https://github.com/ChrisLorens171/Proxecto-DAW-24-25-Christian-Lorenzo-Rios/blob/f1c32f010321aa23d7d1cc7de4a1edd2d8d6bef2/doc/img/Modelo_Entidad_Relacion.png" alt="Modelo Entidade/Relación">
</p>

### Modelo Relacional

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
