const $d = document;

/**
 * Función para mostrar el popup de login
 */
function mostrarLoginPopup() {
    Swal.fire({
        title: 'Iniciar Sesión',
        html: `
            <label for="email" class="swal2-label">Correo Electrónico</label>
            <input 
                type="email" 
                id="email" 
                class="swal2-input"
                placeholder="test@example.com"
                autocomplete="email"
            >
            <label for="password" class="swal2-label">Contraseña</label>
            <input 
                type="password" 
                id="password" 
                class="swal2-input" 
                autocomplete="current-password"
            >
            <p class="swal2-registro-text">
                ¿No tienes cuenta? <a href="#" class="swal2-link-registro swal2-mostrar-registro">Regístrate aquí</a>
            </p>
        `,
        width: 400,
        showCancelButton: false,
        confirmButtonText: 'Iniciar Sesión',
        cancelButtonText: 'Cancelar',
        allowOutsideClick: true,
        preConfirm: () => {
            const validacion = validarLogin();
            if (validacion && validacion.email) {
                procesarLoginInterno(validacion);
                // Retornar false para mantener el popup abierto
                return false;
            }
            // Si hay error de validación sintáctica, continuar con el flujo normal
            return validacion;
        }
    }).then(result => {
        // Este then solo se ejecuta si preConfirm retorna algo truthy
        if (result.isConfirmed && result.value && result.value.email) {
            // Login exitoso, aquí se maneja el resultado
            console.log('Login completado');
        }
    });

    setTimeout(() => {
        $d.getElementById('email')?.focus();
        
        // Event listener para el enlace "Regístrate aquí" dentro del popup
        const linkRegistro = $d.querySelector('.swal2-mostrar-registro');
        if (linkRegistro) {
            linkRegistro.addEventListener('click', (e) => {
                e.preventDefault();
                Swal.close();
                mostrarRegistroPopup();
            });
        }
    }, 100);
}

/**
 * Procesa el login internamente sin cerrar el popup
 */
function procesarLoginInterno(credenciales) {
    console.log('Usuario intentando iniciar sesión:', credenciales.email);

    if (credenciales.email === 'test@example.com' && credenciales.password === '123456') {
        // Login exitoso - cerrar popup y mostrar mensaje
        Swal.hideLoading();
        Swal.close();
        mostrarMensajeExito('¡Bienvenido!', `Iniciaste sesión como ${credenciales.email}`);
        console.log('Login exitoso');
    } else {
        // Error de credenciales - mostrar mensaje en el popup actual
        mostrarErrorEnLogin('Correo o contraseña incorrectos');
    }
}

/**
 * Valida los datos del login
 */
function validarLogin() {
    const email = $d.getElementById('email')?.value.trim();
    const password = $d.getElementById('password')?.value.trim();

    // Validar email
    if (!email) {
        Swal.showValidationMessage('Por favor, ingresa tu correo electrónico');
        return false;
    }

    // Validar formato de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        Swal.showValidationMessage('Por favor, ingresa un correo válido');
        return false;
    }

    // Validar contraseña
    if (!password) {
        Swal.showValidationMessage('Por favor, ingresa tu contraseña');
        return false;
    }

    // Validar longitud mínima de contraseña
    if (password.length < 6) {
        Swal.showValidationMessage('La contraseña debe tener al menos 6 caracteres');
        return false;
    }

    return { email, password };
}

/**
 * Muestra un error directamente en el popup de login
 */
function mostrarErrorEnLogin(mensaje) {
    Swal.showValidationMessage(mensaje);
}

/**
 * Muestra un mensaje de éxito
 */
function mostrarMensajeExito(titulo, mensaje) {
    Swal.fire({
        title: titulo,
        text: mensaje,
        icon: 'success',
        confirmButtonText: 'Aceptar'
    });
}

/**
 * Muestra un mensaje de error genérico
 */
function mostrarMensajeError(titulo, mensaje) {
    Swal.fire({
        title: titulo,
        text: mensaje,
        icon: 'error',
        confirmButtonText: 'Aceptar'
    });
}

// Muestra el formulario de registro con tipo preseleccionado
function mostrarRegistroPopup(event, tipoPreseleccionado = 'vendedor') {
    if (event && event.preventDefault) event.preventDefault();
    
    // Determinar qué botón debe estar activo inicialmente
    const compradorActivo = tipoPreseleccionado === 'comprador' ? 'swal2-tipo-activo' : '';
    const vendedorActivo = tipoPreseleccionado === 'vendedor' ? 'swal2-tipo-activo' : '';
    
    Swal.fire({
        title: 'Registro de Empresa',
        html: `
            <div class="swal2-campos-grid">
                <div class="swal2-campo-full">
                    <label for="nombre-empresa" class="swal2-label">Nombre de la Empresa</label>
                    <input 
                        type="text" 
                        id="nombre-empresa" 
                        class="swal2-input"
                        placeholder="Empresa S.L."
                    >
                </div>
                
                <div class="swal2-campo-full">
                    <label for="cif" class="swal2-label">CIF</label>
                    <input 
                        type="text" 
                        id="cif" 
                        class="swal2-input"
                        placeholder="B12345678"
                    >
                </div>
                
                <div>
                    <label for="email-registro" class="swal2-label">Correo</label>
                    <input 
                        type="email" 
                        id="email-registro" 
                        class="swal2-input"
                        placeholder="contacto@empresa.com"
                    >
                </div>
                
                <div>
                    <label for="telefono" class="swal2-label">Teléfono</label>
                    <input 
                        type="tel" 
                        id="telefono" 
                        class="swal2-input"
                        placeholder="+34 XXX XXX XXX"
                    >
                </div>
                
                <div>
                    <label for="password-registro" class="swal2-label">Contraseña</label>
                    <input 
                        type="password" 
                        id="password-registro" 
                        class="swal2-input"
                    >
                </div>
                
                <div>
                    <label for="password-confirm" class="swal2-label">Confirmar contraseña</label>
                    <input 
                        type="password" 
                        id="password-confirm" 
                        class="swal2-input"
                    >
                </div>
            </div>
            
            <div class="swal2-tipo-usuario-container">
                <p class="swal2-tipo-usuario-titulo">Tipo de cuenta:</p>
                <div class="swal2-tipo-botones">
                    <button type="button" class="swal2-tipo-btn ${compradorActivo}" id="btn-comprador" data-tipo="comprador">
                        🛍️ Comprador
                    </button>
                    <button type="button" class="swal2-tipo-btn ${vendedorActivo}" id="btn-vendedor" data-tipo="vendedor">
                        🏪 Vendedor
                    </button>
                </div>
            </div>
            
            <input type="hidden" id="tipo-usuario" value="${tipoPreseleccionado}">
            
            <p class="swal2-registro-text">
                ¿Ya tienes cuenta? <a href="#" class="swal2-link-registro" onclick="mostrarLoginPopup(); return false;">Inicia sesión</a>
            </p>
        `,
        showCancelButton: false,
        confirmButtonText: 'Registrarse',
        cancelButtonText: 'Cancelar',
        allowOutsideClick: true,
        width: 600,
        preConfirm: () => {
            return validarRegistro();
        }
    }).then(result => {
        if (result.isConfirmed) {
            procesarRegistro(result.value);
        }
    });

    // Agregar event listeners a los botones de tipo después de que el popup se muestre
    setTimeout(() => {
        $d.getElementById('nombre-empresa')?.focus();
        
        const btnComprador = $d.getElementById('btn-comprador');
        const btnVendedor = $d.getElementById('btn-vendedor');
        
        if (btnComprador) {
            btnComprador.addEventListener('click', () => seleccionarTipo('comprador'));
        }
        
        if (btnVendedor) {
            btnVendedor.addEventListener('click', () => seleccionarTipo('vendedor'));
        }
    }, 100);
}

// Cambia el tipo de usuario seleccionado
function seleccionarTipo(tipo) {
    const btnComprador = $d.getElementById('btn-comprador');
    const btnVendedor = $d.getElementById('btn-vendedor');
    const tipoInput = $d.getElementById('tipo-usuario');
    
    if (tipo === 'comprador') {
        btnComprador.classList.add('swal2-tipo-activo');
        btnVendedor.classList.remove('swal2-tipo-activo');
        tipoInput.value = 'comprador';
    } else {
        btnVendedor.classList.add('swal2-tipo-activo');
        btnComprador.classList.remove('swal2-tipo-activo');
        tipoInput.value = 'vendedor';
    }
}

// Valida los datos del formulario de registro
function validarRegistro() {
    const nombreEmpresa = $d.getElementById('nombre-empresa')?.value.trim();
    const cif = $d.getElementById('cif')?.value.trim();
    const email = $d.getElementById('email-registro')?.value.trim();
    const telefono = $d.getElementById('telefono')?.value.trim();
    const password = $d.getElementById('password-registro')?.value.trim();
    const passwordConfirm = $d.getElementById('password-confirm')?.value.trim();
    const tipoUsuario = $d.getElementById('tipo-usuario')?.value;

    if (!nombreEmpresa) {
        Swal.showValidationMessage('Ingresa el nombre de la empresa');
        return false;
    }

    if (nombreEmpresa.length < 3) {
        Swal.showValidationMessage('El nombre debe tener al menos 3 caracteres');
        return false;
    }

    if (!cif) {
        Swal.showValidationMessage('Ingresa el CIF de la empresa');
        return false;
    }

    const cifRegex = /^[A-Z][0-9]{8}$/i;
    if (!cifRegex.test(cif)) {
        Swal.showValidationMessage('El CIF debe tener formato válido (ej: B12345678)');
        return false;
    }

    if (!email) {
        Swal.showValidationMessage('Ingresa el correo electrónico');
        return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        Swal.showValidationMessage('Ingresa un correo válido');
        return false;
    }

    if (!telefono) {
        Swal.showValidationMessage('Ingresa el teléfono');
        return false;
    }

    const telefonoRegex = /^[\d\s+().-]{9,}$/;
    if (!telefonoRegex.test(telefono)) {
        Swal.showValidationMessage('Ingresa un teléfono válido');
        return false;
    }

    if (!password) {
        Swal.showValidationMessage('Ingresa una contraseña');
        return false;
    }

    if (password.length < 6) {
        Swal.showValidationMessage('La contraseña debe tener al menos 6 caracteres');
        return false;
    }

    if (!passwordConfirm) {
        Swal.showValidationMessage('Confirma la contraseña');
        return false;
    }

    if (password !== passwordConfirm) {
        Swal.showValidationMessage('Las contraseñas no coinciden');
        return false;
    }

    return { nombreEmpresa, cif, email, telefono, password, tipoUsuario };
}

// Procesa el registro en el servidor
function procesarRegistro(datos) {
    console.log('Registrando empresa:', datos.nombreEmpresa);
    console.log('Tipo de cuenta:', datos.tipoUsuario);

    // Cuando tengas el backend, descomenta esto y elimina la simulación
    /*
    fetch('/api/registro', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(datos)
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            mostrarMensajeExito('¡Registro Exitoso!', `Bienvenido ${datos.nombreEmpresa}`);
            setTimeout(() => {
                window.location.href = '/dashboard';
            }, 2000);
        } else {
            mostrarMensajeError('Error', data.message || 'No se pudo crear la cuenta');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        mostrarMensajeError('Error', 'Problema al conectar con el servidor');
    });
    */

    // Simulación de registro exitoso
    // Console para comprobar los datos que se envian al servidor
    console.log(datos);
    const tipoTexto = datos.tipoUsuario === 'comprador' ? 'comprador' : 'vendedor';
    mostrarMensajeExito('¡Registro Exitoso!', `${datos.nombreEmpresa} registrado como ${tipoTexto}`);
}

$d.addEventListener('DOMContentLoaded', () => {
    
    const loginPopup = $d.querySelector(".boton-header.sesion");
    const registerPopup = $d.querySelector(".boton-header.empieza");
    const vendedorPopup = $d.querySelector(".boton-main.vendedor");
    const compradorPopup = $d.querySelector(".boton-main.comprador");

    // Verifica si el elemento existe antes de agregar el event listener
    if (loginPopup) {

        // Agrega el event listener para el clic en inicio de sesión
        loginPopup.addEventListener("click", ev => {
            mostrarLoginPopup();
        });
    }

    if (registerPopup) {

        // Agrega el event listener para el clic en registro
        registerPopup.addEventListener("click", ev => {
            if (ev.target.classList.contains("empieza")) {
                mostrarRegistroPopup();
            }
        });
    }

    if (vendedorPopup) {
        // Abre el formulario de registro con tipo vendedor preseleccionado
        vendedorPopup.addEventListener("click", ev => {
            mostrarRegistroPopup(ev, 'vendedor');
        });
    }

    if (compradorPopup) {
        // Abre el formulario de registro con tipo comprador preseleccionado
        compradorPopup.addEventListener("click", ev => {
            mostrarRegistroPopup(ev, 'comprador');
        });
    }
});