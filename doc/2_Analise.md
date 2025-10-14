# Requerimientos do sistema

- [Requerimientos do sistema](#requerimientos-do-sistema)
  - [1- Descrición Xeral](#1--descrición-xeral)
  - [2- Funcionalidades](#2--funcionalidades)
  - [3- Tipos de usuarios](#3--tipos-de-usuarios)
  - [4- Contorno operacional](#4--contorno-operacional)
  - [5- Normativa](#5--normativa)
  - [6- Melloras futuras](#6--melloras-futuras)

> *EXPLICACION*: Este documento describe os requirimentos para "nome do proxecto" especificando que funcionalidade ofrecerá e de que xeito.

## 1- Descrición Xeral

>*EXPLICACION*: Descrición Xeral do proxecto

Mariscamar é unha plataforma web orientada a lonxas e compradores profesionais do sector marisqueiro que permite realizar subastas en tempo real de produtos do mar, garantindo rapidez e trazabilidade no proceso de venda.

O obxectivo principal é modernizar o sistema tradicional de poxas das lonxas, ofrecendo unha ferramenta dixital que mellore a comunicación entre vendedores e compradores, reduza intermediarios e facilite o acceso a un mercado máis amplo e competitivo.

A plataforma funcionará baixo un modelo B2B (Business to Business), no que as lonxas rexistradas poden publicar os seus lotes de marisco e os compradores autorizados participan nas subastas en tempo real a través dun sistema baseado en WebSockets, que asegura actualizacións instantáneas de prezos e estado das poxas.

## 2- Funcionalidades

>*EXPLICACION* Describir que servizos ou operacións se van poder realizar por medio do noso proxecto, indicando que actores interveñen en cada caso.
>
> Enumeradas, de maneira que na fase de deseño poidamos definir o diagrama ou configuración correspondente a cada funcionalidade.
> Cada función ten uns datos de entrada e uns datos de saída. Entre os datos de entrada e de saída, realízase un proceso, que debe ser explicado.

Exemplo:

| Acción   |  Descrición        |
|----------|--------------------|
| Alta de productos   | Dar de alta os productos na base de datos|
| Modificar productos | Modificación de productos na base de datos|
| Presentación dos productos  | Mostra dos productos por medio da páxina web |

## 3- Tipos de usuarios

> *EXPLICACION* Describir os tipos de usuario que poderán acceder ao noso sistema. Habitualmente os tipos de usuario veñen definidos polas funcionalidades ás cales teñen acceso. En termos xerais existen moitos grupos de usuarios: anónimos, novos, rexistrados, bloqueados, confirmados, verificados, administradores, etc.
>
> Exemplo:
>
> - Usuario xenérico, que terá acceso a ...
> - Usuario técnico, que poderá...

Na plataforma **Mariscamar** existirán diferentes tipos de usuarios, cada un con permisos e funcionalidades específicas segundo o seu papel dentro do sistema. O obxectivo é garantir unha xestión eficiente, segura e adaptada ás necesidades de cada perfil.

### 1. Usuario anónimo
- Pode acceder á páxina principal e ver información xeral sobre as lonxas e o funcionamento da plataforma.
- Non pode participar en subastas nin visualizar datos detallados de produtos.
- Pode rexistrarse para crear unha conta de comprador ou lonxa.

### 2. Comprador rexistrado
- Pode visualizar as subastas activas en tempo real.
- Participa nas poxas e realiza ofertas sobre lotes dispoñibles.
- Accede ao historial das súas compras e descargas de facturas.

### 3. Lonxa vendedora
- Pode crear e xestionar subastas (rexistro de lotes, prezos iniciais, imaxes e descricións).
- Accede a estatísticas de vendas e informes de actividade.
- Pode solicitar servizos adicionais (loxística, transporte, promoción).

### 4. Administrador do sistema
- Xestiona todos os usuarios (activación, bloqueo, permisos).
- Supervisa as subastas e resolve incidencias técnicas ou comerciais.
- Controla os rexistros de actividade e garante o cumprimento das normas.
- Administra a configuración global da plataforma (comisións, tarifas, backups, etc.).
- Ten acceso completo á base de datos e ás ferramentas de mantemento.

---

### Estados de conta e control de acceso

Ademais dos tipos de usuario anteriores, existirán dous estados de conta:

- **Usuario verificado:** conta confirmada mediante correo electrónico e validación fiscal.  
- **Usuario bloqueado:** acceso suspendido temporal ou permanentemente por incumprimento das normas ou actividade sospeitosa.  

Estes estados poden aplicarse a calquera usuario rexistrado (comprador ou lonxa).

---

## 4- Contorno operacional

> *EXPLICACION* Neste apartado deben describirse os recursos necesarios, dende o punto de vista do usuario, para poder operar coa aplicación web. Habitualmente consiste nun navegador web actualizado e unha conexión a internet.
Se é necesario algún hardware ou software adicional, deberá indicarse.

O funcionamento de **Mariscamar** está deseñado para ser sinxelo, accesible e compatible cos medios dispoñibles tanto nas lonxas como nos compradores profesionais.

### Requisitos do usuario final
- **Navegador web actualizado**:  
  - Compatible con Google Chrome, Mozilla Firefox, Microsoft Edge ou Safari (con soporte para JavaScript e WebSockets).
  
- **Conexión a Internet estable**:
  - Requírese unha velocidade mínima de **10 Mbps** para garantir unha comunicación fluída durante as poxas en tempo real.
  
- **Dispositivo compatible:**  
  - Ordenador de sobremesa ou portátil (recomendado para xestión de lotes).  
  - Tablet ou smartphone.

### Requisitos adicionais para lonxas
- **Hardware recomendado:**
  - Procesador Intel i3 ou superior.  
  - 8 GB de memoria RAM.  
  - Cámara opcional para capturar imaxes dos lotes.  
  - Acceso a impresora para xerar informes e comprobantes.
  
- **Software necesario:**
  - Sistema operativo Windows, macOS ou Linux actualizado.  
  - Navegador compatible (non se require software adicional).  
  - Acceso á plataforma mediante protocolo **HTTPS**.


## 5- Normativa

> *EXPLICACION* Investigarase que normativa vixente afecta ao desenvolvemento do proxecto e de que maneira. O proxecto debe adaptarse ás esixencias legais dos territorios onde vai operar.
> 
> Pola natureza dos sistema de información, unha lei que se vai a ter que mencionar de forma obrigatoria é la [Ley Orgánica 3/2018, de 5 de diciembre, de Protección de Datos Personales y garantía de los derechos digitales (LOPDPGDD)](https://www.boe.es/buscar/act.php?id=BOE-A-2018-16673). O ámbito da LOPDPGDD é nacional. Se a aplicación está pensada para operar a nivel europeo, tamén se debe facer referencia á [General Data Protection Regulation (GDPR)](https://eur-lex.europa.eu/eli/reg/2016/679/oj). Na documentación debe afirmarse que o proxecto cumpre coa normativa vixente.
>
> Para cumplir a LOPDPGDD e/ou GDPR debe ter un apartado na web onde se indique quen é a persoa responsable do tratamento dos datos e para que fins se van utilizar. Habitualmente esta información estructúrase nos seguintes apartados:
>
> - Aviso legal.
> - Política de privacidade.
> - Política de cookies.
>
> É acosenllable ver [exemplos de webs](https://www.spotify.com/es/legal/privacy-policy/) que conteñan textos legais referenciando a LOPDPGDD ou GDPR.

## 6- Melloras futuras

> *EXPLICACION* É posible que o noso proxecto se centre en resolver un problema concreto que se poderá ampliar no futuro con novas funcionalidades, novas interfaces, etc.

[**<-Anterior**](../../README.md)
