# Requerimientos do sistema

- [Requerimientos do sistema](#requerimientos-do-sistema)
  - [1- Descrición Xeral](#1--descrición-xeral)
  - [2- Funcionalidades](#2--funcionalidades)
  - [3- Tipos de usuarios](#3--tipos-de-usuarios)
  - [4- Contorno operacional](#4--contorno-operacional)
  - [5- Normativa](#5--normativa)
  - [6- Melloras futuras](#6--melloras-futuras)

## 1- Descrición Xeral

Mariscamar é un sitio web deseñado para as lonxas e os compradores profesionais do sector do marisco, onde poden realizarse poxas de produtos do mar en tempo real.

O obxetivo da páxina é modernizar o xeito tradicional de poxar nas lonxas. Para iso, poñemos a disposición unha ferramenta dixital que axuda a que vendedores e compradores se comuniquen mellor, diminúe os intermediarios e simplifica a entrada a un mercado máis extenso e con máis competencia.

A plataforma operará seguindo un esquema B2B (Business to Business), no que as lonxas que se dean de alta poderán anunciar os seus lotes de marisco, e os compradores que teñan permiso poderán participar nas poxas mediante un sistema baseado en WebSockets.

## 2- Funcionalidades

| **Funcionalidade** | **Descrición** |
|---------------------|----------------|
| **Rexistro de usuario** | O usuario pode facer unha conta nova para entrar na plataforma, poñendo os seus datos básicos. Hai que indicar tamén se é comprador ou lonxa. O sistema comproba que todo estea correcto e despois xa se pode usar a conta sen problema. |
| **Inicio de sesión** | Serve para acceder á conta xa creada. O usuario entra co seu correo e contrasinal, e segundo o tipo de perfil vé diferente información, no caso de que algo non coincide, o sistema impídelle o acceso. |
| **Creación de subasta** | As lonxas poden publicar as súas poxas xunto coa cantidade e prezo que consideren axeitado. Pódense subir imaxes que se consideren relevantes, despois disto a subasta estaría lista para comenzar. |
| **Participación en subasta** | Os compradores poden facer ofertas sobre os lotes en tempo real. Cando alguén oferta máis, o sistema cambia o prezo automaticamente e mándalle unha mensaxe aos demáis. Así todos os compradores poden saber a poxa actual. |
| **Peche de subasta** | Cando se acaba o tempo, o sistema elixe ao gañador da poxa, que será quen fixo a mellor oferta. Tanto o comprador coma a lonxa reciben unha mensaxe co resultado final e queda gardado no historial. |
| **Xestión de usuarios** | O administrador pode controlar as contas: activalas, bloquealas ou borralas se fan algo raro. Tamén pode ver un rexistro coas accións que se fixeron. Deste xeito o sistema mantense “limpo”. |
| **Consulta de histórico** | Tanto lonxas como compradores poden mirar as súas poxas anteriores, as compras feitas e outros datos. Pódese buscar por datas ou por tipo de marisco, o que facilita atopar os datos necesarios. |
| **Xestión de facturas e pagos** | A plataforma fai as facturas de forma automática cando se vende algo. Os pagos fanse por medios seguros e queda todo gardado. Despois cada usuario pode descargar a súa factura en PDF. |
| **Panel de administración** | É a parte onde o administrador controla todo o que pasa na plataforma. |

## 3- Tipos de usuarios

Dentro de Mariscamar, haberá varios tipos de usuarios, cada un con accesos e funcións distintos según o seu rol. A idea é asegurar que todo funcione correctamente, de forma segura e a medida do que cada usuario precise. 

### 1. Usuario anónimo
- Pode entrar na web e ver á información básica das lonxas e do funcionamento na plataforma. 
- Non pode entrar nas poxas nin ver os detalles dos produtos. 
- Ten a opción de darse de alta como comprador ou como lonxa. 

### 2. Comprador rexistrado
- Pode ver as poxas que están abertas nese momento. 
- Entra nas poxas e fai ofertas polos lotes dispoñibles. 
- Pode consultar o seu historial de compras e baixar as facturas. 

### 3. Lonxa vendedora
- Pode crear e organizar poxas (poñer os lotes, os prezos de saída, fotos e explicacións). 
- Consulta datos das vendas e informes da súa actividade. 
- Pode solicitar outros servizos (transporte, loxística, publicidade). 

### 4. Xestor da plataforma 
- Leva o control de todos os usuarios (dar de alta, bloquear, dar permisos). 
- Está atento ás poxas e arranxa problemas técnicos ou de vendas. 
- Revisa os rexistros de actividade e mira que se cumpra o regulamento. 
- Organiza a configuración xeral da web (comisións, prezos, copias de seguridade, etc.). 
- Ten acceso total á base de datos e ás ferramentas para mantela. 

--- 

### Situación das contas e control de acceso 

A parte dos usuarios anteriores, teremos dous tipos de estado da conta: 

- **Usuario verificado:** conta confirmada por correo e comprobación fiscal. 
- **Usuario bloqueado:** acceso bloqueado temporal ou permanentemente por saltarse as normas ou por actividade sospeitosa. 

Estes estados pódense aplicar a calquera usuario que se rexistrou (comprador ou lonxa).

## 4- Contorno operacional

A forma na que Mariscamar está feita é para que sexa fácil, dispoñible e funcione coas ferramentas que hai tanto nas lonxas coma para os que compran ao por maior. 

### 🧔 Requisitos que precisa o usuario 
- **Navegador de internet actualizado**
    - Funciona con Google Chrome, Mozilla Firefox, Microsoft Edge ou Safari (que poidan usar JavaScript e WebSockets). 

- **Internet estable**
    - Unha velocidade mínima de 10 Mbps para que poida transcurrir sen problemas as poxas. 

- **Dispositivo compatible**. 
    - Preferiblemente un ordenador de mesa ou portátil (para traballar cos lotes). 
    - Tablet ou smartphone. 

### 💻 Requisitos adicionais para as lonxas
- **Hardware recomendado**: 
    - Procesador Intel i3 ou mellor. 
    - 8 GB de memoria RAM. 
    - Cámara para sacar fotos dos lotes (opcional). 
    - Poder imprimir para ter informes e probas de compra. 

- **Software necesario**: 
    - Sistema operativo Windows, macOS ou Linux ao día. 
    - Un navegador que funcione (non fai falta máis programas). 
    - Acceder a plataforma con HTTPS.

## 5- Normativa

Mariscamar adáptase ás regras actuais sobre a protección dos datos, as compras en liña e a trazabilidade alimentaria, seguindo a lexislación nacional e Europea.

### Leis aplicables

- **Lei Orgánica 3/2018**, de Protección de Datos Personales e garantía dos dereitos dixitales (LOPDPGDD)
- **Regulamento (UE) 2016/679 (GDPR)**
- **Lei 34/2002**, de Servizos da Sociedade da Información e do Comercio Electrónico (LSSI-CE)
- **Regulamento (CE) 178/2002**, sobre trazabilidade alimentaria
- **Real Decreto 1376/2003**, sobre condicións sanitarias de produtos pesqueiros
- **Lei 16/1987**, de Ordenación dos Transportes Terrestres

---

### Aviso Legal

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

O proxecto Mariscamar naceu coa idea de manexar subastas de marisco en tempo real entre lonxas e compradores. De aquí en diante, daríanse máis cambios para que a plataforma fose mellor e máis útil. Presentamos como posibles melloras as seguintes propostas: 

  - Alertas e notificacións en tempo real: Para que os compradores poidan saber se hai poxas novas ou temas de interés. 
  - Sistemas de fidelización avanzado: Aforro por mercar maior volume, maiores recompensas por participación continuada e servizos premium. 
  - App móbil: Para facilitar o acceso e participación desde calquera dispositivo. 
  - Análise de datos e estatísticas: Explicacións de vendas, prezos e como se move o mercado para axudar a toma de decisións. 
  - Mellora na experiencia do usuario: Pantallas sinxelas, personalización e filtros avanzados para as subastas.

[**<-Anterior**](../README.md)
