import express from 'express';
import session from 'express-session';
import path from 'path';
import { fileURLToPath } from 'url';

// Necesario para __dirname en ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Importar rutas
import indexRoutes from './routes/index.js';
import apiRoutes from './routes/api.js';

// Importar middlewares de seguridad
import { sanitizeAll } from './middlewares/validation.js';
import { securityHeaders, logSuspiciousActivity, rateLimiter } from './middlewares/security.js';

// Importar cron jobs
import { iniciarCronActualizacionEstados } from './jobs/actualizarEstadoSubastas.js';

const app = express();
const PORT = process.env.PORT || 3000;

// Configurar EJS como motor de plantillas
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middlewares de seguridad (aplicar ANTES de parsear body)
app.use(securityHeaders);
app.use(logSuspiciousActivity);
app.use(rateLimiter(100, 60000)); // 100 peticiones por minuto

// Configurar sesiones
app.use(session({
    secret: 'mariscamar-secret-key-2024',
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false, // Cambiar a true mas adelante
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000 // 24 horas de duración para la cookie
    }
}));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Sanitizar todas las entradas (aplicar DESPUÉS de parsear body)
app.use(sanitizeAll);

// Rutas
app.use('/', indexRoutes);
app.use('/api', apiRoutes);

// Middleware para manejar 404 - debe estar después de todas las rutas
app.use((req, res, next) => {
    res.status(404).render('404', {
        title: 'Página no encontrada - Mariscamar',
        page: 'error'
    });
});

// Middleware para manejar errores generales
app.use((err, req, res, next) => {
    console.error('Error:', err);
    
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Error interno del servidor';
    
    // Si es una petición API, devolver JSON
    if (req.path.startsWith('/api')) {
        return res.status(statusCode).json({
            success: false,
            error: message
        });
    }
    
    // Si es una petición web, renderizar página de error
    res.status(statusCode).render('500', {
        title: 'Error - Mariscamar',
        page: 'error',
        error: process.env.NODE_ENV === 'development' ? err : null
    });
});

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`Servidor en http://localhost:${PORT}`);
    
    // Iniciar cron job para actualizar estados de subastas
    iniciarCronActualizacionEstados();
});

export default app;
