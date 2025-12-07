/**
 * Middleware de validación y sanitización para proteger contra inyecciones
 * y otros ataques comunes
 */

// Sanitizar strings para eliminar caracteres peligrosos
export const sanitizeString = (str) => {
    if (typeof str !== 'string') return str;
    
    // Eliminar etiquetas HTML/scripts (protección básica contra XSS)
    return str
        .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
        .replace(/<[^>]+>/g, '')
        .trim();
};

// Validar formato de email
export const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

// Validar que un ID sea un entero positivo válido
export const isValidId = (id) => {
    const num = Number(id);
    return Number.isInteger(num) && num > 0;
};

// Middleware para sanitizar el body de las peticiones
export const sanitizeBody = (req, res, next) => {
    if (req.body) {
        Object.keys(req.body).forEach(key => {
            if (typeof req.body[key] === 'string') {
                req.body[key] = sanitizeString(req.body[key]);
            }
        });
    }
    next();
};

// Middleware para sanitizar query params
export const sanitizeQuery = (req, res, next) => {
    if (req.query) {
        Object.keys(req.query).forEach(key => {
            if (typeof req.query[key] === 'string') {
                req.query[key] = sanitizeString(req.query[key]);
            }
        });
    }
    next();
};

// Middleware para sanitizar params de URL
export const sanitizeParams = (req, res, next) => {
    if (req.params) {
        Object.keys(req.params).forEach(key => {
            if (typeof req.params[key] === 'string') {
                req.params[key] = sanitizeString(req.params[key]);
            }
        });
    }
    next();
};

// Middleware combinado que sanitiza todo
export const sanitizeAll = (req, res, next) => {
    sanitizeBody(req, res, () => {
        sanitizeQuery(req, res, () => {
            sanitizeParams(req, res, next);
        });
    });
};

// Validador específico para crear usuarios
export const validateUsuario = (req, res, next) => {
    const { nome, correo, contrasinal, tipo } = req.body;
    
    const errors = [];
    
    if (!nome || nome.length < 2) {
        errors.push('El nombre debe tener al menos 2 caracteres');
    }
    
    if (!correo || !isValidEmail(correo)) {
        errors.push('Email inválido');
    }
    
    if (!contrasinal || contrasinal.length < 6) {
        errors.push('La contraseña debe tener al menos 6 caracteres');
    }
    
    if (!tipo || !['admin', 'lonxa', 'comprador'].includes(tipo)) {
        errors.push('Tipo de usuario inválido');
    }
    
    if (errors.length > 0) {
        return res.status(400).json({ 
            success: false, 
            errors 
        });
    }
    
    next();
};
