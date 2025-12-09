import db from '../config/database.js';

/**
 * Actualizar estado de subastas según las fechas
 * - Pendiente → Activa: cuando la hora actual >= hora_inicio
 * - Activa → Cerrada: cuando la hora actual >= hora_fin
 */
export async function actualizarEstadoSubastas() {
    try {
        const ahora = new Date();
        
        // Activar subastas pendientes cuya hora de inicio ha llegado
        const queryActivar = `
            UPDATE subastas
            SET estado = 'activa'
            WHERE estado = 'pendiente'
            AND hora_inicio <= $1
        `;
        
        const [resultActivar] = await db.query(queryActivar, [ahora]);
        
        // Cerrar subastas activas cuya hora de fin ha pasado
        const queryCerrar = `
            UPDATE subastas
            SET estado = 'cerrada'
            WHERE estado = 'activa'
            AND hora_fin <= $1
        `;
        
        const [resultCerrar] = await db.query(queryCerrar, [ahora]);
        
        const activadas = resultActivar.affectedRows || 0;
        const cerradas = resultCerrar.affectedRows || 0;
        
        if (activadas > 0 || cerradas > 0) {
            console.log(`Estados actualizados: ${activadas} activadas, ${cerradas} cerradas`);
        }
        
        return { activadas, cerradas };
    } catch (error) {
        console.error('Error al actualizar estado de subastas:', error);
        throw error;
    }
}

/**
 * Iniciar el cron job para actualizar estados automáticamente
 * Se ejecuta cada minuto
 */
export function iniciarCronActualizacionEstados() {
    // Ejecutar inmediatamente al iniciar
    actualizarEstadoSubastas();
    
    // Ejecutar cada minuto (60000 ms)
    const intervalo = setInterval(async () => {
        try {
            await actualizarEstadoSubastas();
        } catch (error) {
            console.error('Error en cron de actualización de estados:', error);
        }
    }, 60000); // 1 minuto
    
    console.log('Cron job de actualización de estados iniciado (cada 1 minuto)');
    
    return intervalo;
}
