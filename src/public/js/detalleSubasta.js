(function() {
    'use strict';

    const mainElement = document.querySelector('main');
    const idSubasta = mainElement.dataset.idSubasta;
    
    let subastaData = null;
    let intervalTiempo = null;

    /**
     * Formatear fecha para mostrar tiempo restante
     */
    function calcularTiempoRestante(fechaFin) {
        const ahora = new Date();
        const fin = new Date(fechaFin);
        const diff = fin - ahora;

        if (diff <= 0) {
            return 'Finalizada';
        }

        const dias = Math.floor(diff / (1000 * 60 * 60 * 24));
        const horas = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutos = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const segundos = Math.floor((diff % (1000 * 60)) / 1000);

        if (dias > 0) {
            return `${dias}d ${horas}h ${minutos}m`;
        } else if (horas > 0) {
            return `${horas}h ${minutos}m ${segundos}s`;
        } else if (minutos > 0) {
            return `${minutos}m ${segundos}s`;
        } else {
            return `${segundos}s`;
        }
    }

    /**
     * Actualizar contador de tiempo
     */
    function actualizarContador() {
        if (!subastaData) return;
        
        const tiempoRestante = calcularTiempoRestante(subastaData.hora_fin);
        document.getElementById('tiempo-fin').textContent = tiempoRestante;

        if (tiempoRestante === 'Finalizada') {
            clearInterval(intervalTiempo);
            document.getElementById('btn-pujar').disabled = true;
            document.getElementById('btn-pujar').textContent = 'Subasta Finalizada';
            document.getElementById('badge-estado').textContent = 'Cerrada';
            document.getElementById('badge-estado').className = 'badge-estado estado-cerrada';
        }
    }

    /**
     * Cargar datos de la subasta
     */
    async function cargarSubasta() {
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

            if (!response.ok || !data.success) {
                throw new Error(data.message || 'Error al cargar la subasta');
            }

            subastaData = data.data;
            mostrarDatos(subastaData);
            
            // Iniciar contador de tiempo
            actualizarContador();
            intervalTiempo = setInterval(actualizarContador, 1000);

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
     * Mostrar datos en la página
     */
    function mostrarDatos(subasta) {
        // Imagen y nombre
        document.getElementById('imagen-producto').src = subasta.imagen || '/img/default-product.jpg';
        document.getElementById('imagen-producto').alt = subasta.produto_nome;
        document.getElementById('nombre-producto').textContent = `Lote de ${subasta.produto_nome} - ${subasta.cantidade}kg`;

        // Badge de estado
        const badge = document.getElementById('badge-estado');
        badge.textContent = subasta.estado.charAt(0).toUpperCase() + subasta.estado.slice(1);
        badge.className = `badge-estado estado-${subasta.estado}`;

        // Datos del producto
        document.getElementById('origen-producto').textContent = subasta.vendedor_nome || 'Galicia';
        document.getElementById('tipo-producto').textContent = subasta.produto_tipo;
        document.getElementById('cantidad-producto').textContent = `${subasta.cantidade} kg`;
        document.getElementById('especie-producto').textContent = subasta.produto_tipo;

        // Precio
        document.getElementById('precio-actual').textContent = `${parseFloat(subasta.prezo_inicial).toFixed(2)}€`;

        // Deshabilitar botón si está cerrada o pendiente
        const btnPujar = document.getElementById('btn-pujar');
        if (subasta.estado !== 'activa') {
            btnPujar.disabled = true;
            if (subasta.estado === 'pendiente') {
                btnPujar.textContent = 'Subasta no iniciada';
            } else {
                btnPujar.textContent = 'Subasta Finalizada';
            }
        }
    }

    /**
     * Manejar puja
     */
    function manejarPuja() {
        if (!subastaData || subastaData.estado !== 'activa') {
            Swal.fire({
                icon: 'warning',
                title: 'No disponible',
                text: 'Esta subasta no está activa'
            });
            return;
        }

        Swal.fire({
            title: 'Realizar Puja',
            html: `
                <div style="text-align: left; margin: 20px 0;">
                    <p style="margin-bottom: 15px;"><strong>Precio actual:</strong> ${parseFloat(subastaData.prezo_inicial).toFixed(2)}€</p>
                    <label for="cantidad-puja" style="display: block; margin-bottom: 5px;">Cantidad a pujar (kg):</label>
                    <input type="number" id="cantidad-puja" class="swal2-input" min="1" max="${subastaData.cantidade}" step="1" placeholder="Ej: 10" style="width: 90%; margin: 0;">
                    <p style="margin-top: 10px; font-size: 0.9em; color: #666;">Disponible: ${subastaData.cantidade} kg</p>
                </div>
            `,
            showCancelButton: true,
            confirmButtonText: 'Confirmar Puja',
            cancelButtonText: 'Cancelar',
            confirmButtonColor: '#3b82f6',
            preConfirm: () => {
                const cantidad = document.getElementById('cantidad-puja').value;
                if (!cantidad || cantidad <= 0) {
                    Swal.showValidationMessage('Debe ingresar una cantidad válida');
                    return false;
                }
                if (cantidad > subastaData.cantidade) {
                    Swal.showValidationMessage(`La cantidad no puede superar ${subastaData.cantidade} kg`);
                    return false;
                }
                return { cantidad: parseFloat(cantidad) };
            }
        }).then((result) => {
            if (result.isConfirmed) {
                realizarPuja(result.value.cantidad);
            }
        });
    }

    /**
     * Realizar la puja
     */
    async function realizarPuja(cantidad) {
        try {
            Swal.fire({
                title: 'Procesando...',
                text: 'Realizando puja',
                allowOutsideClick: false,
                didOpen: () => {
                    Swal.showLoading();
                }
            });

            // TODO: Implementar endpoint de puja en el backend
            // Por ahora solo mostramos confirmación
            
            await new Promise(resolve => setTimeout(resolve, 1000));

            Swal.fire({
                icon: 'success',
                title: '¡Puja realizada!',
                html: `
                    <p>Has pujado por <strong>${cantidad} kg</strong></p>
                    <p>Total: <strong>${(cantidad * subastaData.prezo_inicial).toFixed(2)}€</strong></p>
                `,
                confirmButtonText: 'Aceptar'
            });

        } catch (error) {
            console.error('Error al realizar puja:', error);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: error.message || 'No se pudo realizar la puja'
            });
        }
    }

    // Event listeners
    document.getElementById('btn-pujar').addEventListener('click', manejarPuja);

    // Cargar datos al iniciar
    cargarSubasta();

    // Limpiar intervalo al salir
    window.addEventListener('beforeunload', () => {
        if (intervalTiempo) {
            clearInterval(intervalTiempo);
        }
    });

})();
