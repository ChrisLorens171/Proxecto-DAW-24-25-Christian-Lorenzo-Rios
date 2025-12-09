(function() {
    'use strict';

    const form = document.getElementById('form-editar-subasta');
    const mainElement = document.querySelector('main');
    const idSubasta = mainElement.dataset.idSubasta;

    /**
     * Formatear fecha para input datetime-local
     */
    function formatearFechaParaInput(fecha) {
        const date = new Date(fecha);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        
        return `${year}-${month}-${day}T${hours}:${minutes}`;
    }

    /**
     * Cargar datos de la subasta
     */
    async function cargarDatosSubasta() {
        try {
            Swal.fire({
                title: 'Cargando...',
                text: 'Obteniendo datos de la subasta',
                allowOutsideClick: false,
                didOpen: () => {
                    Swal.showLoading();
                }
            });

            const response = await fetch(`/api/subastas/${idSubasta}`, {
                credentials: 'include'
            });

            const contentType = response.headers.get('content-type');
            if (!contentType || !contentType.includes('application/json')) {
                throw new Error('La respuesta no es JSON válido');
            }

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Error al cargar la subasta');
            }

            if (!data.success) {
                throw new Error(data.message || 'Error al cargar la subasta');
            }

            // Autocompletar formulario
            const subasta = data.data;
            
            document.getElementById('nombre-producto').value = subasta.produto_nome || '';
            document.getElementById('tipo-producto').value = subasta.produto_tipo || '';
            document.getElementById('cantidad').value = subasta.cantidade || '';
            document.getElementById('precio-inicial').value = subasta.prezo_inicial || '';
            document.getElementById('fecha-inicio').value = formatearFechaParaInput(subasta.hora_inicio);
            document.getElementById('fecha-fin').value = formatearFechaParaInput(subasta.hora_fin);
            document.getElementById('estado').value = subasta.estado || 'pendiente';

            Swal.close();

        } catch (error) {
            console.error('Error al cargar subasta:', error);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: error.message,
                confirmButtonText: 'Volver a Subastas'
            }).then(() => {
                window.location.href = '/subastas';
            });
        }
    }

    /**
     * Manejar envío del formulario
     */
    async function manejarSubmit(event) {
        event.preventDefault();

        // Obtener datos del formulario
        const producto = {
            nome: document.getElementById('nombre-producto').value.trim(),
            tipo: document.getElementById('tipo-producto').value,
            cantidade: parseInt(document.getElementById('cantidad').value),
            prezo_inicial: parseFloat(document.getElementById('precio-inicial').value)
        };

        const subasta = {
            hora_inicio: document.getElementById('fecha-inicio').value,
            hora_fin: document.getElementById('fecha-fin').value,
            estado: document.getElementById('estado').value
        };

        // Validaciones básicas
        if (!producto.nome || !producto.tipo || !producto.cantidade || !producto.prezo_inicial) {
            Swal.fire({
                icon: 'warning',
                title: 'Datos incompletos',
                text: 'Por favor, completa todos los campos del producto'
            });
            return;
        }

        if (!subasta.hora_inicio || !subasta.hora_fin || !subasta.estado) {
            Swal.fire({
                icon: 'warning',
                title: 'Datos incompletos',
                text: 'Por favor, completa todos los campos de la subasta'
            });
            return;
        }

        // Validar fechas
        const fechaInicio = new Date(subasta.hora_inicio);
        const fechaFin = new Date(subasta.hora_fin);

        if (fechaFin <= fechaInicio) {
            Swal.fire({
                icon: 'error',
                title: 'Error en las fechas',
                text: 'La fecha de fin debe ser posterior a la fecha de inicio'
            });
            return;
        }

        try {
            Swal.fire({
                title: 'Actualizando...',
                text: 'Por favor espera',
                allowOutsideClick: false,
                didOpen: () => {
                    Swal.showLoading();
                }
            });

            const response = await fetch(`/api/subastas/${idSubasta}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify({ producto, subasta })
            });

            const contentType = response.headers.get('content-type');
            if (!contentType || !contentType.includes('application/json')) {
                throw new Error('La respuesta no es JSON válido');
            }

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Error al actualizar la subasta');
            }

            if (!data.success) {
                throw new Error(data.message || 'Error al actualizar la subasta');
            }

            Swal.fire({
                icon: 'success',
                title: '¡Subasta actualizada!',
                text: 'La subasta se ha actualizado correctamente',
                timer: 2000,
                timerProgressBar: true,
                showConfirmButton: false
            }).then(() => {
                window.location.href = '/subastas';
            });

        } catch (error) {
            console.error('Error al actualizar subasta:', error);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: error.message
            });
        }
    }

    // Event listeners
    form.addEventListener('submit', manejarSubmit);

    // Cargar datos al iniciar
    cargarDatosSubasta();

})();
