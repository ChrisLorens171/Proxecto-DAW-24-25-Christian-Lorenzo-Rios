/**
 * Archivo para gestionar la creación de subastas
 */
(function() {
    const $form = document.getElementById('form-crear-subasta');

    /**
     * Manejar el envío del formulario
     */
    $form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const nombreProducto = document.getElementById('nombre-producto').value.trim(),
              tipoProducto = document.getElementById('tipo-producto').value,
              cantidad = parseInt(document.getElementById('cantidad').value),
              precioInicial = parseFloat(document.getElementById('precio-inicial').value),
              estado = document.getElementById('estado').value

        // Validar fechas
        const fechaInicio = new Date(document.getElementById('fecha-inicio').value);
        const fechaFin = new Date(document.getElementById('fecha-fin').value);

        if (fechaFin <= fechaInicio) {
            Swal.fire({
                icon: 'error',
                title: 'Error en las fechas',
                text: 'La fecha de fin debe ser posterior a la fecha de inicio'
            });
            return;
        }

        // Recopilar datos del formulario
        const datos = {
            producto: {
                nome: nombreProducto,
                tipo: tipoProducto,
                cantidade: cantidad,
                prezo_inicial: precioInicial,
                imagen: null
            },
            subasta: {
                hora_inicio: fechaInicio.toISOString(),
                hora_fin: fechaFin.toISOString(),
                estado: estado
            }
        };

        // Loading
        Swal.fire({
            title: 'Creando subasta...',
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading();
            }
        });

        try {
            const response = await fetch('/api/subastas/crear', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify(datos)
            });

            const data = await response.json();

            if (data.success) {
                Swal.fire({
                    icon: 'success',
                    title: 'Subasta creada',
                    text: 'La subasta se ha creado correctamente',
                    confirmButtonText: 'Ir a Subastas'
                }).then(() => {
                    window.location.href = '/subastas';
                });
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: data.message || 'No se pudo crear la subasta'
                });
            }
        } catch (error) {
            console.error('Error:', error);
            Swal.fire({
                icon: 'error',
                title: 'Error de conexión',
                text: 'No se pudo conectar con el servidor'
            });
        }
    });

    /**
     * Establecer fecha mínima para los campos de fecha
     */
    const ahora = new Date();
    const fechaMinima = ahora.toISOString().slice(0, 16);
    document.getElementById('fecha-inicio').min = fechaMinima;
    document.getElementById('fecha-fin').min = fechaMinima;

    /**
     * Actualizar fecha mínima de fin cuando cambia inicio
     */
    document.getElementById('fecha-inicio').addEventListener('change', (e) => {
        const fechaInicio = e.target.value;
        if (fechaInicio) {
            document.getElementById('fecha-fin').min = fechaInicio;
        }
    });

})();
