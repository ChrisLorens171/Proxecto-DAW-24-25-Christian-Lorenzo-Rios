/**
 * Archivo para gestionar la página de subastas
 */
(function() {

    const $carruselActivas = document.getElementById('carrusel-activas');
    const $carruselPendientes = document.getElementById('carrusel-pendientes');
    const $carruselMisSubastas = document.getElementById('carrusel-mis-subastas');
    const $buscarSubasta = document.getElementById('buscar-subasta');

    let subastas = [];
    let usuarioId = null;

    // Obtener ID del usuario actual si está en el DOM
    const mainElement = document.querySelector('main');
    if (mainElement && mainElement.dataset.usuarioId) {
        usuarioId = parseInt(mainElement.dataset.usuarioId);
    }

    /**
     * Obtener todas las subastas
     */
    async function cargarSubastas() {
    try {
        const response = await fetch('/api/subastas', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        // Verificar si la respuesta es JSON
        const contentType = response.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) {
            const text = await response.text();
            console.error('Respuesta no es JSON:', text.substring(0, 200));
            throw new Error('La respuesta del servidor no es JSON');
        }

        const data = await response.json();
        console.log('Datos recibidos:', data);

        if (data.success) {
            subastas = data.data;
            mostrarSubastas(subastas);
        } else {
            console.error('Error al cargar subastas:', data.message);
            mostrarMensajeVacio('activas', 'No se pudieron cargar las subastas');
        }
    } catch (error) {
        console.error('Error al cargar subastas:', error);
        mostrarMensajeVacio('activas', 'Error al conectar con el servidor');
    }
}

/**
 * Mostrar las subastas en el DOM separadas por estado
 */
function mostrarSubastas(subastas) {
    if (!subastas || subastas.length == 0) {
        mostrarMensajeVacio('activas', 'No hay subastas disponibles');
        return;
    }

    // Limpiar carruseles
    $carruselActivas.innerHTML = '';
    $carruselPendientes.innerHTML = '';
    if ($carruselMisSubastas) {
        $carruselMisSubastas.innerHTML = '';
    }

    // Separar subastas por estado
    const activas = subastas.filter(s => s.estado == 'activa');
    const pendientes = subastas.filter(s => s.estado == 'pendiente');
    const misSubastas = usuarioId ? subastas.filter(s => s.vendedor_id == usuarioId) : [];

    // Renderizar Mis Subastas (si hay usuario autenticado)
    if ($carruselMisSubastas && usuarioId) {
        const seccionMisSubastas = document.getElementById('seccion-mis-subastas');
        
        if (misSubastas.length == 0) {
            // Ocultar toda la sección si no hay subastas
            if (seccionMisSubastas) {
                seccionMisSubastas.style.display = 'none';
            }
        } else {
            // Mostrar la sección si hay subastas
            if (seccionMisSubastas) {
                seccionMisSubastas.style.display = 'block';
            }
            
            misSubastas.forEach(subasta => {
                const card = crearTarjetaSubasta(subasta, true);
                $carruselMisSubastas.appendChild(card);
            });
            actualizarBotonesCarrusel('mis-subastas');
        }
    }

    // Renderizar cada grupo
    if (activas.length == 0) {
        mostrarMensajeVacio('activas', 'No hay subastas activas');
    } else {
        activas.forEach(subasta => {
            const card = crearTarjetaSubasta(subasta);
            $carruselActivas.appendChild(card);
        });
        actualizarBotonesCarrusel('activas');
    }

    if (pendientes.length == 0) {
        mostrarMensajeVacio('pendientes', 'No hay subastas pendientes');
    } else {
        pendientes.forEach(subasta => {
            const card = crearTarjetaSubasta(subasta);
            $carruselPendientes.appendChild(card);
        });
        actualizarBotonesCarrusel('pendientes');
    }
}

/**
 * Crear una tarjeta de subasta
 */
function crearTarjetaSubasta(subasta, esMia = false) {
    const article = $d.createElement('article');
    article.className = 'subasta-card';
    article.dataset.id = subasta.id_subasta;

    const estadoClase = subasta.estado.toLowerCase();
    const estadoTexto = {
        'activa': 'Activa',
        'pendiente': 'Pendiente',
        'cerrada': 'Cerrada'
    }[subasta.estado] || subasta.estado;

    // Formatear fechas
    const fechaInicio = new Date(subasta.hora_inicio).toLocaleString('es-ES');
    const fechaFin = new Date(subasta.hora_fin).toLocaleString('es-ES');

    const botonesHTML = esMia ? `
        <div class="botones-mis-subastas">
            <button class="btn-editar-subasta" data-id="${subasta.id_subasta}" aria-label="Editar subasta">
                <i class="fas fa-edit" aria-hidden="true"></i> Editar
            </button>
            <button class="btn-eliminar-subasta" data-id="${subasta.id_subasta}" aria-label="Eliminar subasta">
                <i class="fas fa-trash" aria-hidden="true"></i> Eliminar
            </button>
        </div>
    ` : `
        <button class="btn-ver-subasta" data-id="${subasta.id_subasta}">
            Participar
        </button>
    `;

    article.innerHTML = `
        <figure class="subasta-imagen">
            <img src="${subasta.imagen || '/img/placeholder.jpg'}" alt="${subasta.produto_nome}">
            <span class="subasta-estado ${estadoClase}">${estadoTexto}</span>
        </figure>
        <article class="subasta-info">
            <h3>${subasta.produto_nome}</h3>
            <div class="subasta-detalles">
                <p><strong>Cantidad:</strong> ${subasta.cantidade}kg</p>
                <p><strong>Precio inicial:</strong> ${parseFloat(subasta.prezo_inicial).toFixed(2)}€</p>
                ${!esMia ? `<p><strong>Vendedor:</strong> ${subasta.vendedor_nome}</p>` : ''}
            </div>
            <span class="subasta-fechas">
                <p><i class="far fa-calendar-alt"></i> Inicio: ${fechaInicio}</p>
                <p><i class="far fa-calendar-check"></i> Fin: ${fechaFin}</p>
            </span>
            ${botonesHTML}
        </article>
    `;

    return article;
}

/**
 * Mostrar mensaje cuando no hay subastas en un carrusel
 */
function mostrarMensajeVacio(carrusel, mensaje) {
    const contenedor = carrusel == 'activas' ? $carruselActivas :
                       carrusel == 'pendientes' ? $carruselPendientes :
                       carrusel == 'mis-subastas' ? $carruselMisSubastas :
                       null;
    
    if (!contenedor) return;
    
    contenedor.innerHTML = `
        <div class="mensaje-vacio">
            <i class="fas fa-inbox"></i>
            <p>${mensaje}</p>
        </div>
    `;
}

/**
 * Filtrar subastas por búsqueda
 */
function filtrarSubastas(busqueda) {
    const textoBusqueda = busqueda.toLowerCase().trim();
    
    if (textoBusqueda == '') {
        mostrarSubastas(subastas);
        return;
    }

    const subastasFiltradas = subastas.filter(subasta => {
        const titulo = subasta.produto_nome.toLowerCase();
        const tipo = subasta.produto_tipo.toLowerCase();
        
        return titulo.includes(textoBusqueda) || tipo.includes(textoBusqueda);
    });

    mostrarSubastas(subastasFiltradas);
}

/**
 * Navegar en el carrusel
 */
function navegarCarrusel(direccion, carruselId) {
    const contenedor = document.querySelector(`.carrusel-container[data-carrusel="${carruselId}"]`);
    const track = contenedor.querySelector('.carrusel-track');
    const cardWidth = track.querySelector('.subasta-card')?.offsetWidth || 0;
    const gap = 20; // Gap entre cards
    const desplazamiento = (cardWidth + gap) * direccion;
    
    track.scrollBy({
        left: desplazamiento,
        behavior: 'smooth'
    });
    
    // Actualizar botones después del scroll
    actualizarBotonesCarrusel(carruselId);
}

/**
 * Actualizar visibilidad de botones del carrusel
 */
function actualizarBotonesCarrusel(carruselId) {
    const contenedor = document.querySelector(`.carrusel-container[data-carrusel="${carruselId}"]`);
    const track = contenedor.querySelector('.carrusel-track');
    const btnPrev = contenedor.querySelector('.carrusel-btn.prev');
    const btnNext = contenedor.querySelector('.carrusel-btn.next');
    
    // Verificar si hay scroll
    const scrollLeft = track.scrollLeft;
    const maxScroll = track.scrollWidth - track.clientWidth;
    
    // Ocultar/mostrar botón anterior
    if (scrollLeft <= 1) {
        btnPrev.style.display = 'none';
    } else {
        btnPrev.style.display = 'flex';
    }
    
    // Ocultar/mostrar botón siguiente
    if (scrollLeft >= maxScroll - 1) {
        btnNext.style.display = 'none';
    } else {
        btnNext.style.display = 'flex';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    // Cargar subastas al iniciar
    cargarSubastas();

    // Filtrar subastas al escribir en el buscador
    if ($buscarSubasta) {
        $buscarSubasta.addEventListener('input', (e) => {
            filtrarSubastas(e.target.value);
        });
    }

    // Delegación de eventos para botones de navegación del carrusel
    document.querySelectorAll('.carrusel-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const direccion = btn.classList.contains('prev') ? -1 : 1;
            const carruselId = btn.dataset.carrusel;
            navegarCarrusel(direccion, carruselId);
        });
    });
    
    // Actualizar botones al hacer scroll manualmente
    document.querySelectorAll('.carrusel-track').forEach(track => {
        track.addEventListener('scroll', () => {
            const contenedor = track.closest('.carrusel-container');
            const carruselId = contenedor.dataset.carrusel;
            actualizarBotonesCarrusel(carruselId);
        });
    });

    // Delegación de eventos para botones de ver subasta
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('btn-ver-subasta') || 
            e.target.closest('.btn-ver-subasta')) {
            const btn = e.target.classList.contains('btn-ver-subasta') ? 
                        e.target : e.target.closest('.btn-ver-subasta');
            const idSubasta = btn.dataset.id;
            console.log('Ver subasta:', idSubasta);
            window.location.href = `/subastas/${idSubasta}`;
        }

        // Delegación de eventos para botón editar subasta
        if (e.target.classList.contains('btn-editar-subasta') || 
            e.target.closest('.btn-editar-subasta')) {
            const btn = e.target.classList.contains('btn-editar-subasta') ? 
                        e.target : e.target.closest('.btn-editar-subasta');
            const idSubasta = btn.dataset.id;
            window.location.href = `/subastas/editar/${idSubasta}`;
        }

        // Delegación de eventos para botón eliminar subasta
        if (e.target.classList.contains('btn-eliminar-subasta') || 
            e.target.closest('.btn-eliminar-subasta')) {
            const btn = e.target.classList.contains('btn-eliminar-subasta') ? 
                        e.target : e.target.closest('.btn-eliminar-subasta');
            const idSubasta = btn.dataset.id;
            eliminarSubasta(idSubasta);
        }
    });
});

/**
 * Función para eliminar una subasta
 */
async function eliminarSubasta(idSubasta) {
    const result = await Swal.fire({
        title: '¿Eliminar subasta?',
        text: 'Esta acción no se puede deshacer',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#ef4444',
        cancelButtonColor: '#6b7280',
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'Cancelar'
    });

    if (!result.isConfirmed) {
        return;
    }

    // Loading
    Swal.fire({
        title: 'Eliminando subasta...',
        allowOutsideClick: false,
        didOpen: () => {
            Swal.showLoading();
        }
    });

    try {
        const response = await fetch(`/api/subastas/${idSubasta}`, {
            method: 'DELETE',
            credentials: 'include'
        });

        // Verificar si la respuesta es JSON
        const contentType = response.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) {
            throw new Error('El servidor no devolvió una respuesta JSON válida');
        }

        const data = await response.json();

        if (data.success) {
            Swal.fire({
                icon: 'success',
                title: 'Eliminada',
                text: 'La subasta se ha eliminado correctamente',
                timer: 2000,
                showConfirmButton: false
            });

            // Recargar subastas
            setTimeout(() => {
                cargarSubastas();
            }, 2000);
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: data.message || 'No se pudo eliminar la subasta'
            });
        }
    } catch (error) {
        console.error('Error:', error);
        Swal.fire({
            icon: 'error',
            title: 'Error de conexión',
            text: 'Error en el servidor al eliminar la subasta'
        });
    }
}

})();
