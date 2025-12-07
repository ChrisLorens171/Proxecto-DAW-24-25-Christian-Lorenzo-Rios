import express from 'express';
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

const app = express();
const PORT = process.env.PORT || 3000;

// Configurar EJS como motor de plantillas
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middlewares de seguridad (aplicar ANTES de parsear body)
app.use(securityHeaders);
app.use(logSuspiciousActivity);
app.use(rateLimiter(100, 60000)); // 100 peticiones por minuto

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Sanitizar todas las entradas (aplicar DESPUÉS de parsear body)
app.use(sanitizeAll);

// Rutas
app.use('/', indexRoutes);
app.use('/api', apiRoutes);

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`Servidor en http://localhost:${PORT}`);
});

export default app;
