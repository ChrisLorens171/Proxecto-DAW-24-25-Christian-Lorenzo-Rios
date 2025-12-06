/**
 * Carga un componente HTML en el DOM
 * @param {string} componentPath - Ruta del componente
 * @param {string} selector - Selector CSS donde insertar el componente
 */
async function cargarComponente(componentPath, selector) {
    try {
        const response = await fetch(componentPath);
        if (!response.ok) {
            throw new Error(`Error al cargar ${componentPath}: ${response.statusText}`);
        }
        const html = await response.text();
        const elemento = document.querySelector(selector);
        if (elemento) {
            elemento.innerHTML = html;
        } else {
            console.warn(`Selector ${selector} no encontrado`);
        }
    } catch (error) {
        console.error(`Error cargando componente: ${error.message}`);
    }
}

/**
 * Carga los componentes globales (header y footer)
 */
function cargarComponentesGlobales() {
    cargarComponente('/components/header.html', 'header');
    cargarComponente('/components/footer.html', 'footer');
}

// Cargar componentes cuando el DOM esté listo
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', cargarComponentesGlobales);
} else {
    cargarComponentesGlobales();
}
