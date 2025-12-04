# FASE DE IMPLANTACIÓN

- [FASE DE IMPLANTACIÓN](#fase-de-implantación)
  - [1- Manual técnico](#1--manual-técnico)
    - [1.1- Instalación](#11--instalación)
    - [1.2- Administración do sistema](#12--administración-do-sistema)
  - [2- Manual de usuario](#2--manual-de-usuario)
  - [3- Melloras futuras](#3--melloras-futuras)

## 1- Manual técnico

### 1.1- Instalación

> *EXPLICACIÓN:* Neste apartado describiranse todos os pasos necesarios para que calquera persoa poida descargar o código do proxecto e continuar o seu desenvolvemento.
>
> Como:
> 
> - Requirimentos de hardware, servidores na nube, etc.
> - Software necesario: servidores (Exemplo servidor Web), software externo co que interaciona a nosa aplicación, contenedores, etc.
> - Carga inicial de datos na base de datos. Migración de datos xa existentes noutros formatos.
> - Usuarios da aplicación.
> - Diagrama final de despregue (se hai variacións con respecto ó realizado na anterior fase).

Os pasos e requisitos necesarios para a descarga e continuación do desenvolvemento deste proxecto son os seguintes:

1. Requerimentos:

    - Hardware recomendado:
        - Sobre 4GB de RAM.
        - Espazo suficiente no disco duro.
        - Conexión a internet estable.
        
    - Sofware:
        - Node.js.
        - Cliente SQL PgAdmin4 (recomendado) ou cualquer xestor de bases de datos PostgreSQL.
        - Editor de código, VsCode (recomendado).

2. Descarga os arquivos da carpeta src do repositorio
    
3. Instalación de dependencias e arranque

    - Descargar Node.js (no caso de non telo no equipo).
    - Comprobar con "<strong>npm -v</strong>" que este instalado correctamente.
    - Instalar as dependecias desde a raíz do proxecto co comando "<strong>npm install</strong>".
    - Lanzamos o servidor con "<strong>npm start</strong>" ou "<strong>npm run dev</strong>" e deberíamos ver algo como o seguinte:

    <p align="center" style="margin: 30px;">
      <img width="362" height="99" alt="image" src="https://github.com/user-attachments/assets/a0869aff-4290-4037-9867-67aca16e0a6f" />
    </p>
    
4. Configuración de base de datos

    - Dentro da carpeta src atopamos o directorio sql donde esta aloxado o arquivo mariscamar.sql, que conten o script para a creación da base de datos.

5. Usuarios iniciais

    - Existen 3 tipos de usuarios, que son: Admin, Lonxa e Comprador.
   
### 1.2- Administración do sistema

> *EXPLICACIÓN:* Neste apartado indicarase información relativa á administración do sistema, é dicir, tarefas que se deberán realizar unha vez que o sistema estea funcionando.
>
> Como:
> 
> - Copias de seguridade do sistema.
> - Copias de seguridade da base de datos.
> - Xestión de usuarios.
> - Xestión seguridade.
> - Xestión de incidencias, que poden ser de dous tipos: de sistema (accesos non autorizados á BD, etc) ou de fallos no software.
>
> No caso de que sexan precisas.

## 2- Manual de usuario

> *EXPLICACIÓN:* Neste apartado fara
>
> - Indicar se será necesario formar ós usuarios. En caso afirmativo planificar.
> - Manual de usuario, FAQ ou outro xeito que sexa o máis adecuado para que os usuarios saiban usar a nosa aplicación informática.
>
> Todo esto se a aplicación require de manual de usuario.

## 3- Melloras futuras

> *EXPLICACIÓN:* Neste apartado incluiranse as posibilidades de mellora da aplicación no futuro.
>
[**<-Anterior**](../../README.md)
