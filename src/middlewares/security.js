/**
 * Middleware de seguridad adicional
 * Incluye rate limiting y headers de seguridad
 */

// Rate limiting simple en memoria (para producción usar Redis)
const requestCounts = new Map();

// Limpiar contadores cada minuto
setInterval(() => {
    requestCounts.clear();
}, 60000);

/**
 * Rate limiter simple
 * @param {number} maxRequests - Máximo de peticiones permitidas
 * @param {number} windowMs - Ventana de tiempo en milisegundos
 */
export const rateLimiter = (maxRequests = 100, windowMs = 60000) => {
    return (req, res, next) => {
        const ip = req.ip || req.connection.remoteAddress;
        const key = `${ip}:${req.path}`;
        
        const now = Date.now();
        const requestData = requestCounts.get(key) || { count: 0, resetTime: now + windowMs };
        
        if (now > requestData.resetTime) {
            requestData.count = 0;
            requestData.resetTime = now + windowMs;
        }
        
        requestData.count++;
        requestCounts.set(key, requestData);
        
        if (requestData.count > maxRequests) {
            return res.status(429).json({
                success: false,
                error: 'Demasiadas peticiones. Por favor, inténtalo más tarde.'
            });
        }
        
        next();
    };
};

/**
 * Middleware para agregar headers de seguridad
 */
export const securityHeaders = (req, res, next) => {
    // Prevenir clickjacking
    res.setHeader('X-Frame-Options', 'DENY');
    
    // Prevenir MIME sniffing
    res.setHeader('X-Content-Type-Options', 'nosniff');
    
    // Habilitar XSS protection en navegadores antiguos
    res.setHeader('X-XSS-Protection', '1; mode=block');
    
    // Política de referrer
    res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
    
    // Content Security Policy básica
    res.setHeader(
        'Content-Security-Policy',
        "default-src 'self'; " +
        "script-src 'self' 'unsafe-inline' https://cdn.jsdelivr.net https://kit.fontawesome.com; " +
        "style-src 'self' 'unsafe-inline' https://cdn.jsdelivr.net https://fonts.googleapis.com https://cdnjs.cloudflare.com; " +
        "font-src 'self' https://fonts.gstatic.com https://ka-f.fontawesome.com https://cdnjs.cloudflare.com; " +
        "img-src 'self' data: https:; " +
        "connect-src 'self';"
    );
    
    next();
};

/**
 * Middleware para logging de peticiones sospechosas
 */
export const logSuspiciousActivity = (req, res, next) => {
    const suspiciousPatterns = [
        /(\%27)|(\')|(\-\-)|(\%23)|(#)/i,  // SQL injection attempts
        /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,  // XSS attempts
        /(\.\.)|(\.\/)/i  // Path traversal attempts
    ];
    
    const checkString = JSON.stringify(req.body) + JSON.stringify(req.query) + req.url;
    
    suspiciousPatterns.forEach(pattern => {
        if (pattern.test(checkString)) {
            console.warn('⚠️ Actividad sospechosa detectada:', {
                ip: req.ip || req.connection.remoteAddress,
                method: req.method,
                path: req.path,
                timestamp: new Date().toISOString(),
                userAgent: req.get('user-agent')
            });
        }
    });
    
    next();
};

/**
 * Middleware para verificar autenticación
 * Redirige a la página de inicio si el usuario no está autenticado
 */
export const requireAuth = (req, res, next) => {
    // Verificar si hay una sesión activa
    if (req.session && req.session.usuario) {
        next();
    } else {
        console.log('Usuario NO autenticado. Redirigiendo a /');
        // Redirigir a la página de inicio
        res.redirect('/');
    }
};

/**
 * Middleware para verificar que el usuario es vendedor o admin
 * Redirige a /subastas si no tiene permisos
 */
export const requireVendedor = (req, res, next) => {
    if (req.session && req.session.usuario) {
        const tipo = req.session.usuario.tipo;
        if (tipo === 'lonxa' || tipo === 'admin') {
            next();
        } else {
            console.log('Usuario sin permisos de vendedor. Redirigiendo a /subastas');
            res.redirect('/subastas');
        }
    } else {
        console.log('Usuario NO autenticado. Redirigiendo a /');
        res.redirect('/');
    }
};

/**
 * Middleware para verificar si el usuario ya está autenticado
 */
export const isAuthenticated = (req, res, next) => {
    if (req.session && req.session.usuario) {
        return true;
    }
    return false;
};
