# FASE DE IMPLANTACIÓN

- [FASE DE IMPLANTACIÓN](#fase-de-implantación)
  - [1- Manual técnico](#1--manual-técnico)
    - [1.1- Instalación](#11--instalación)
    - [1.2- Administración do sistema](#12--administración-do-sistema)
  - [2- Manual de usuario](#2--manual-de-usuario)
  - [3- Melloras futuras](#3--melloras-futuras)

## 1- Manual técnico

### 1.1- Instalación

Os pasos e requisitos necesarios para a descarga e continuación do desenvolvemento deste proxecto son os seguintes:

1. Requerimentos:

    - Hardware recomendado:
        - Sobre 4GB de RAM.
        - Espazo suficiente no disco duro.
        - Conexión a internet estable.
        
    - Sofware:
        - Node.js.
        - Cliente SQL PgAdmin4 (recomendado) ou usar psql (liña de comandos).
        - Calquer editor de código compatible con Node.js.

2. Descarga os arquivos da carpeta src do repositorio
    
3. Instalación de dependencias e arranque

    - Descargar Node.js (no caso de non telo no equipo).
    - Comprobar con "<strong>npm -v</strong>" que este instalado correctamente.
    - Instalar as dependecias desde a raíz do proxecto co comando "<strong>npm install</strong>".
    - Integrar Socket.io no proxecto con "<strong>npm install socket.io</strong>"
    - Lanzamos o servidor con "<strong>npm start</strong>" ou "<strong>npm run dev</strong>" e deberíamos ver algo como o seguinte:

    <p align="center" style="margin: 30px;">
      <img width="362" height="99" alt="image" src="https://github.com/user-attachments/assets/a0869aff-4290-4037-9867-67aca16e0a6f" />
    </p>
    
4. Configuración de base de datos

    - Dentro da carpeta src atopamos o directorio sql donde esta aloxado o arquivo mariscamar.sql, que conten o script para a creación da base de datos.

5. Usuarios iniciais

    - Existen 3 tipos de usuarios, que son: 
    
        - **Administrador**: Acceso completo o sistema
        
        - **Lonxa**: Xestión de produtos e poxas
        
        - **Comprador**: Participación en poxas

    Terase que crear manualmente usuarios de proba para o desarrollo.

6. Diagrama de despregamento final

   Logo de decidir o sistema de despregramento que se vai utilizar, actualizamos o diagrama coa versión final.

```mermaid

graph TB
    subgraph "Clientes"
        C1[Navegador Web]
    end

    subgraph "Railway Platform"
        LB[Load Balancer<br/>Railway Router]
        
        subgraph "Aplicación Principal"
            subgraph "Container Node.js"
                APP[App Express.js]
                WS[WebSocket Server<br/>Socket.io]
                ADAPTER[Redis Adapter<br/>opcional]
            end
        end
        
        subgraph "Base de Datos"
            DB[(PostgreSQL<br/>Railway Managed)]
        end
        
        subgraph "Servicios Auxiliares"
            REDIS[(Redis Cache<br/>opcional)]
            VOL[Volumen<br/>para uploads]
        end
        
        subgraph "Monitoring"
            LOGS[Logs & Metrics]
            DEPLOY[Deploy Automático]
        end
    end

    C1 -- HTTP/HTTPS --> LB
    C1 -- WebSocket ----> WS
    
    LB --> APP
    APP --> DB
    WS --> ADAPTER
    ADAPTER --> REDIS
    APP --> VOL
    
    DB --> LOGS
    APP --> LOGS
```

### 1.2- Administración do sistema

En este apartado indicaremos a información relativa a administración do sistema, e dicir, as tarefas que teremos que realizar unha vez o sistema este funcionando.  

> [!IMPORTANT]
> Cabe destacar que para varias das tarefas estamos utilizando Railway, unha plataforma de desarollo e despregue en nube que simplifica moitas destas.

#### <ins>Copias de seguridade</ins>

**Base de datos**

Railway realiza copias de seguridade automáticas diariamente da base de datos PostgreSQL.
As copias consérvanse durante 7 días e poden restaurarse desde o panel de Railway cando sexa necesario.

**Código fonte**

Todo o código está gardado en GitHub, funcionando como copia de seguridade principal.

#### <ins>Xestión de usuarios</ins>

A xestión de usuarios realízase desde o panel de administración da aplicación. Entre as accións dispoñibles están:

   - Rexistro de novos usuarios (lonxas e compradores).

   - Edición de permisos e información de usuarios existentes.

   - Eliminación de contas inactivas durante mais de 6 meses.

#### <ins>Xestión de seguridade</ins>

**Infraestrutura (Railway)**

   - Certificados SSL/TLS automáticos.

   - Variables de contorno almacenadas de forma segura.

   - Acceso controlado mediante roles e permisos de equipo.

**Aplicación**

   - Contraseñas almacenadas como hash na base de datos.

   - Control de sesións e tempo de inactividade.

   - Validación de datos.

#### <ins>Xestión de incidencias</ins>

Railway xestiona automaticamente problemas de servidor notificando automáticamente os administradores en cuestión.

**Aplicación**

   - Comprobar periodicamente o estado e integridade dos datos gardados.
   
   - Informes de usuarios: atender as incidencias dos usuarios dende a aplicación.


## 2- Manual de usuario

> *EXPLICACIÓN:* Neste apartado fara
>
> - Indicar se será necesario formar ós usuarios. En caso afirmativo planificar.
> - Manual de usuario, FAQ ou outro xeito que sexa o máis adecuado para que os usuarios saiban usar a nosa aplicación informática.
>
> Todo esto se a aplicación require de manual de usuario.

Mariscamar diseñouse coa sinxeleza como principio fundamental. A plataforma funciona de forma intuitiva. Non se precisa formación nin instrucións demasiado complexas. Cada pantalla guía visualmente os usuarios para que cos botóns e opcións que ofrecemos poidas navegar comoda e rápidamente. 

Se sabes usar un navegador web e facer clics, xa sabes usar Mariscamar. A interface é limpa, directa e libre de complicacións innecesarias.

## 3- Melloras futuras

> *EXPLICACIÓN:* Neste apartado incluiranse as posibilidades de mellora da aplicación no futuro.
>
[**<-Anterior**](../../README.md)
