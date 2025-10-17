# Requerimientos do sistema

- [Requerimientos do sistema](#requerimientos-do-sistema)
  - [1- Descrición Xeral](#1--descrición-xeral)
  - [2- Funcionalidades](#2--funcionalidades)
  - [3- Tipos de usuarios](#3--tipos-de-usuarios)
  - [4- Contorno operacional](#4--contorno-operacional)
  - [5- Normativa](#5--normativa)
  - [6- Melloras futuras](#6--melloras-futuras)

## 1- Descrición Xeral

Mariscamar é unha plataforma web orientada a lonxas e compradores profesionais do sector marisqueiro que permite realizar subastas en tempo real de produtos do mar, garantindo rapidez e trazabilidade no proceso de venda.

O obxectivo principal é modernizar o sistema tradicional de poxas das lonxas, ofrecendo unha ferramenta dixital que mellore a comunicación entre vendedores e compradores, reduza intermediarios e facilite o acceso a un mercado máis amplo e competitivo.

A plataforma funcionará baixo un modelo B2B (Business to Business), no que as lonxas rexistradas poden publicar os seus lotes de marisco e os compradores autorizados participan nas subastas en tempo real a través dun sistema baseado en WebSockets, que asegura actualizacións instantáneas de prezos e estado das poxas.

## 2- Funcionalidades

| **Acción / Funcionalidade**     | **Descrición**                                                         | **Actor principal**         | **Datos de entrada**                                        | **Proceso interno**                                                 | **Datos de saída**                                           |
| ------------------------------- | ---------------------------------------------------------------------- | --------------------------- | ----------------------------------------------------------- | ------------------------------------------------------------------- | ------------------------------------------------------------ |
| **Rexistro de usuario**         | Permite crear unha conta de lonxa ou comprador.                        | Usuario anónimo             | Nome, correo, contrasinal, tipo de conta, CIF/NIF           | Validación de datos e creación do perfil na base de datos           | Confirmación por correo electrónico e acceso á conta         |
| **Inicio de sesión**            | Acceso ao panel persoal da conta rexistrada.                           | Usuario rexistrado          | Correo e contrasinal                                        | Autenticación e comprobación de permisos                            | Acceso ao panel correspondente                               |
| **Creación de subasta**         | Permite á lonxa crear unha nova poxa.                                  | Lonxa vendedora             | Tipo de marisco, cantidade, prezo inicial, imaxes           | Rexistro na base de datos e activación do evento en tempo real      | Subasta visible para compradores                             |
| **Participación en subasta**    | O comprador realiza ofertas en tempo real.                             | Comprador rexistrado        | ID de subasta, importe da oferta                            | Envío da oferta mediante WebSocket e actualización global de prezos | Oferta actualizada visible para todos os usuarios conectados |
| **Peche de subasta**            | Finaliza a poxa e determina o gañador.                                 | Sistema / Lonxa             | ID de subasta, tempo final                                  | Comparación de ofertas e determinación automática do mellor postor  | Notificación de venda e actualización do historial           |
| **Xestión de usuarios**         | Administración de contas (activar, bloquear, eliminar).                | Administrador               | ID de usuario, acción a realizar                            | Actualización do estado do usuario na base de datos                 | Confirmación da acción e rexistro no log de administración   |
| **Consulta de histórico**       | Permite ver subastas finalizadas e resultados.                         | Lonxa / Comprador           | Filtros (data, produto, estado)                             | Consulta SQL sobre o historial de vendas e compras                  | Listaxe de resultados filtrados                              |
| **Xestión de facturas e pagos** | Control de transaccións e xeración de facturas automáticas.            | Sistema / Lonxa / Comprador | Datos de operación e importes                               | Procesamento de pagamento e almacenamento seguro                    | Factura descargable en PDF                                   |
| **Notificacións en tempo real** | Avisos automáticos sobre poxas, vendas e incidencias.                  | Sistema                     | Evento desencadeante (nova oferta, fin de subasta, mensaxe) | Envío por WebSocket ou correo electrónico                           | Mensaxe instantánea ou email ao usuario                      |
| **Servizos de fidelización**    | Bonificacións por volume ou uso continuado da plataforma.              | Lonxa / Comprador           | Historial de operacións                                     | Cálculo automático de bonificacións e descontos                     | Aplicación de desconto ou crédito na seguinte operación      |
| **Panel de administración**     | Control global de configuracións, estatísticas e copias de seguridade. | Administrador               | Parámetros do sistema                                       | Execución de tarefas de mantemento e análise                        | Informes e rexistros de actividade                           |


## 3- Tipos de usuarios

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

A plataforma **Mariscamar** cumpre coa normativa vixente en materia de protección de datos, comercio electrónico e trazabilidade alimentaria, conforme á lexislación nacional e europea aplicable.

### Leis aplicables

- **Ley Orgánica 3/2018**, de Protección de Datos Personales y garantía de los derechos digitales (LOPDPGDD)  
- **Regulamento (UE) 2016/679 (GDPR)**  
- **Lei 34/2002**, de Servizos da Sociedade da Información e do Comercio Electrónico (LSSI-CE)  
- **Regulamento (CE) 178/2002**, sobre trazabilidade alimentaria  
- **Real Decreto 1376/2003**, sobre condicións sanitarias de produtos pesqueiros  
- **Lei 16/1987**, de Ordenación dos Transportes Terrestres  

---

### Aviso Legal

O sitio web **www.mariscamar.es** é un proxecto educativo desenvolvido para fins demostrativos.

**Propietario do proxecto:** Mariscamar
**Identificador fiscal:** CIF DEMO-000000  
**Domicilio ficticio:** Rúa das Lonxas, 14 - 15960 Rianxo (A Coruña), Galicia, España  
**Correo de contacto:** info@mariscamar.es

O acceso a este sitio web implica a aceptación das condicións de uso.  
Queda prohibida a reprodución ou distribución non autorizada dos contidos.  
Os dereitos de propiedade intelectual pertencen ao autor do proxecto.

---

### Política de Privacidade

**Responsable do tratamento:** Mariscamar  
**Correo de contacto:** privacidade@mariscamar.es  

**Finalidade:**  
- Rexistro e autenticación de usuarios  
- Participación en subastas  
- Facturación simulada e xestión de operacións  
- Comunicacións e avisos automatizados  
- Control de trazabilidade e servizos de transporte

**Base xurídica:** consentimento do usuario e simulación de execución contractual.  
**Cesión de datos:** non se realiza cesión real de datos a terceiros.  
**Dereitos:** acceso, rectificación, supresión e oposición.  

As medidas de seguridade seguen as boas prácticas recomendadas: cifrado SSL, copias de seguridade e restrición de acceso.

---

### Política de Cookies

Este sitio emprega **cookies propias e de terceiros**, co obxectivo de mellorar a experiencia de navegación.

**Tipos de cookies utilizadas:**
- Técnicas: necesarias para o funcionamento da plataforma.  
- De preferencias: gardan opcións de usuario.  
- De análise: permiten medir o rendemento da aplicación (exemplo: Google Analytics).

O usuario pode aceptar, configurar ou rexeitar as cookies mediante o banner inicial ou a configuración do navegador.

## 6- Melloras futuras

O proxecto **Mariscamar** está deseñado inicialmente para xestionar subastas de marisco en tempo real entre lonxas e compradores. No futuro, poderían implementarse diversas melloras para ampliar a funcionalidade e o valor engadido da plataforma, presentamos como posibles melloras as seguintes propostas:

- **Alertas e notificacións en tempo real**: Para avisar aos compradores de novas subastas ou lotes de interese.  
- **Sistema de fidelización avanzado**: Descontos por volume, maiores recompensas por participación continuada, programas de suscrición e servizos premium.  
- **Aplicación móbil**: Para facilitar o acceso e participación nas subastas desde calquer dispositivo.  
- **Análise de datos e estatísticas**: Informes sobre vendas, prezos medios e comportamento do mercado para apoiar a toma de decisións.  
- **Melloras na experiencia de usuario**: Interfaces máis intuitivas, personalización de notificacións e filtros avanzados de subastas.

[**<-Anterior**](../README.md)
