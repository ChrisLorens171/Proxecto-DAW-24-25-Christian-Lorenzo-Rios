import db from './config/database.js';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function insertarDatosPrueba() {
    try {
        console.log('📊 Limpiando datos existentes...\n');

        // Limpiar tablas en orden (por las foreign keys)
        await db.query('DELETE FROM Facturas');
        await db.query('DELETE FROM Ofertas');
        await db.query('DELETE FROM Subastas');
        await db.query('DELETE FROM Produtos');
        await db.query('DELETE FROM Usuarios');
        
        // Reiniciar secuencias
        await db.query('ALTER SEQUENCE usuarios_id_usuario_seq RESTART WITH 1');
        await db.query('ALTER SEQUENCE produtos_id_produto_seq RESTART WITH 1');
        await db.query('ALTER SEQUENCE subastas_id_subasta_seq RESTART WITH 1');
        await db.query('ALTER SEQUENCE ofertas_id_oferta_seq RESTART WITH 1');
        await db.query('ALTER SEQUENCE facturas_id_factura_seq RESTART WITH 1');
        
        console.log('✓ Datos existentes eliminados\n');
        console.log('📊 Insertando datos de prueba...\n');

        // Insertar Usuarios
        console.log('Insertando Usuarios...');
        await db.query(`
            INSERT INTO Usuarios (nome, correo, contrasinal, tipo, estado, CIF_NIF) VALUES
            ('Admin MariscaMar', 'admin@mariscamar.com', 'abc123', 'admin', 'activo', 'A12345678'),
            ('Lonxa O Grove', 'lonxa.grove@mariscamar.com', 'abc123', 'lonxa', 'activo', 'B23456789'),
            ('Lonxa Cambados', 'lonxa.cambados@mariscamar.com', 'abc123', 'lonxa', 'activo', 'B34567890'),
            ('Lonxa Ribeira', 'lonxa.ribeira@mariscamar.com', 'abc123', 'lonxa', 'activo', 'B45678901'),
            ('Lonxa Vigo', 'lonxa.vigo@mariscamar.com', 'abc123', 'lonxa', 'activo', 'B56789012'),
            ('Restaurante Mar Azul', 'restaurante.azul@email.com', 'abc123', 'comprador', 'activo', 'C12345678'),
            ('Pescadería El Puerto', 'pescaderia.puerto@email.com', 'abc123', 'comprador', 'activo', 'C23456789'),
            ('Marisquería Costa Brava', 'marisqueria.brava@email.com', 'abc123', 'comprador', 'activo', 'C34567890'),
            ('Distribuidora MarFresh', 'distribuidora.marfresh@email.com', 'abc123', 'comprador', 'activo', 'C45678901'),
            ('Hotel Playa Galicia', 'hotel.playa@email.com', 'abc123', 'comprador', 'activo', 'C56789012'),
            ('Supermercados del Mar', 'super.mar@email.com', 'abc123', 'comprador', 'activo', 'C67890123')
        `);
        console.log('✓ Usuarios insertados\n');

        // Insertar Productos
        console.log('Insertando Productos...');
        await db.query(`
            INSERT INTO Produtos (nome, tipo, cantidade, prezo_inicial, id_usuario_propietario, imagen) VALUES
            ('Percebe Premium', 'Percebe', 50, 45.00, 2, '/img/tipos/percebes.jpg'),
            ('Mejillón Gallego', 'Mejillón', 200, 3.50, 2, '/img/tipos/mejillon.jpg'),
            ('Almeja Fina', 'Almeja', 100, 12.00, 2, '/img/tipos/almeja.jpg'),
            ('Vieira Gallega', 'Vieira', 80, 8.50, 2, '/img/tipos/vieira.jpg'),
            ('Berberecho', 'Berberecho', 150, 6.00, 3, '/img/tipos/berberecho.jpg'),
            ('Navajas Gallegas', 'Navaja', 60, 18.00, 3, '/img/tipos/navajas.jpg'),
            ('Pulpo Fresco', 'Pulpo', 40, 15.00, 3, '/img/tipos/pulpo.png'),
            ('Zamburiñas', 'Zamburiña', 90, 10.00, 3, '/img/tipos/zamburinas.jpg'),
            ('Centolla Gallega', 'Centolla', 30, 25.00, 4, '/img/tipos/centollo.jpg'),
            ('Bogavante', 'Bogavante', 20, 35.00, 4, '/img/tipos/bogavante.jpg'),
            ('Langosta', 'Langosta', 15, 50.00, 4, '/img/tipos/bogavante.jpg'),
            ('Camarón', 'Camarón', 100, 8.00, 4, '/img/tipos/percebes.jpg'),
            ('Ostra Gallega', 'Ostra', 120, 5.00, 5, '/img/tipos/almeja.jpg'),
            ('Mejillón Tigre', 'Mejillón', 180, 4.00, 5, '/img/tipos/mejillon.jpg'),
            ('Nécora', 'Nécora', 70, 22.00, 5, '/img/tipos/centollo.jpg'),
            ('Buey de Mar', 'Buey de Mar', 25, 28.00, 5, '/img/tipos/centollo.jpg')
        `);
        console.log('✓ Productos insertados\n');

        // Insertar Subastas
        console.log('Insertando Subastas...');
        await db.query(`
            INSERT INTO Subastas (id_produto, id_usuario_lonxa, hora_inicio, hora_fin, estado) VALUES
            (1, 2, NOW() - INTERVAL '1 hour', NOW() + INTERVAL '23 hours', 'activa'),
            (2, 2, NOW() - INTERVAL '30 minutes', NOW() + INTERVAL '2 days', 'activa'),
            (5, 3, NOW() - INTERVAL '2 hours', NOW() + INTERVAL '22 hours', 'activa'),
            (7, 3, NOW() - INTERVAL '1 hour', NOW() + INTERVAL '1 day', 'activa'),
            (9, 4, NOW() - INTERVAL '3 hours', NOW() + INTERVAL '21 hours', 'activa'),
            (13, 5, NOW() - INTERVAL '45 minutes', NOW() + INTERVAL '3 days', 'activa'),
            (15, 5, NOW() - INTERVAL '1.5 hours', NOW() + INTERVAL '1.5 days', 'activa'),
            (3, 2, NOW() + INTERVAL '1 day', NOW() + INTERVAL '2 days', 'pendiente'),
            (4, 2, NOW() + INTERVAL '2 days', NOW() + INTERVAL '3 days', 'pendiente'),
            (6, 3, NOW() + INTERVAL '1 day', NOW() + INTERVAL '2 days', 'pendiente'),
            (10, 4, NOW() - INTERVAL '3 days', NOW() - INTERVAL '2 days', 'cerrada'),
            (11, 4, NOW() - INTERVAL '4 days', NOW() - INTERVAL '3 days', 'cerrada'),
            (14, 5, NOW() - INTERVAL '5 days', NOW() - INTERVAL '4 days', 'cerrada')
        `);
        console.log('✓ Subastas insertadas\n');

        // Insertar Ofertas
        console.log('Insertando Ofertas...');
        await db.query(`
            INSERT INTO Ofertas (id_subasta, id_usuario, importe, cantidades, data_hora) VALUES
            (1, 6, 47.00, 10, NOW() - INTERVAL '50 minutes'),
            (1, 7, 48.50, 15, NOW() - INTERVAL '40 minutes'),
            (1, 8, 50.00, 10, NOW() - INTERVAL '30 minutes'),
            (1, 6, 51.00, 20, NOW() - INTERVAL '20 minutes'),
            (1, 9, 52.50, 15, NOW() - INTERVAL '10 minutes'),
            (2, 7, 3.80, 50, NOW() - INTERVAL '25 minutes'),
            (2, 10, 4.00, 100, NOW() - INTERVAL '20 minutes'),
            (2, 11, 4.20, 75, NOW() - INTERVAL '15 minutes'),
            (3, 6, 6.50, 30, NOW() - INTERVAL '1.5 hours'),
            (3, 8, 7.00, 40, NOW() - INTERVAL '1 hour'),
            (3, 9, 7.50, 35, NOW() - INTERVAL '45 minutes'),
            (3, 10, 8.00, 50, NOW() - INTERVAL '30 minutes'),
            (4, 7, 16.00, 10, NOW() - INTERVAL '50 minutes'),
            (4, 11, 17.50, 15, NOW() - INTERVAL '30 minutes'),
            (4, 6, 18.00, 12, NOW() - INTERVAL '15 minutes'),
            (5, 8, 27.00, 5, NOW() - INTERVAL '2.5 hours'),
            (5, 9, 28.50, 8, NOW() - INTERVAL '2 hours'),
            (5, 10, 30.00, 10, NOW() - INTERVAL '1.5 hours'),
            (5, 6, 31.00, 7, NOW() - INTERVAL '1 hour'),
            (6, 7, 5.50, 40, NOW() - INTERVAL '40 minutes'),
            (6, 11, 6.00, 50, NOW() - INTERVAL '25 minutes'),
            (6, 8, 6.50, 60, NOW() - INTERVAL '10 minutes'),
            (7, 9, 23.00, 15, NOW() - INTERVAL '1 hour'),
            (7, 10, 24.50, 20, NOW() - INTERVAL '45 minutes'),
            (7, 6, 25.00, 18, NOW() - INTERVAL '20 minutes'),
            (11, 6, 37.00, 5, NOW() - INTERVAL '3.5 days'),
            (11, 7, 39.00, 7, NOW() - INTERVAL '3.2 days'),
            (11, 8, 40.00, 6, NOW() - INTERVAL '3 days'),
            (12, 9, 52.00, 3, NOW() - INTERVAL '3.8 days'),
            (12, 10, 55.00, 5, NOW() - INTERVAL '3.5 days'),
            (12, 11, 58.00, 4, NOW() - INTERVAL '3.2 days'),
            (13, 6, 4.30, 60, NOW() - INTERVAL '4.8 days'),
            (13, 7, 4.50, 80, NOW() - INTERVAL '4.5 days'),
            (13, 8, 4.80, 70, NOW() - INTERVAL '4.2 days')
        `);
        console.log('✓ Ofertas insertadas\n');

        // Insertar Facturas
        console.log('Insertando Facturas...');
        await db.query(`
            INSERT INTO Facturas (id_usuario, id_subasta, importe_total, cantidad, data_emision) VALUES
            (8, 11, 240.00, 6, NOW() - INTERVAL '2.9 days'),
            (11, 12, 232.00, 4, NOW() - INTERVAL '3.1 days'),
            (8, 13, 336.00, 70, NOW() - INTERVAL '4.1 days')
        `);
        console.log('✓ Facturas insertadas\n');

        console.log('\n📋 Verificando datos insertados:\n');

        // Verificar datos en cada tabla
        const [usuarios] = await db.query('SELECT COUNT(*) as total FROM Usuarios');
        console.log(`  • Usuarios: ${usuarios[0].total}`);

        const [produtos] = await db.query('SELECT COUNT(*) as total FROM Produtos');
        console.log(`  • Productos: ${produtos[0].total}`);

        const [subastas] = await db.query('SELECT COUNT(*) as total FROM Subastas');
        console.log(`  • Subastas: ${subastas[0].total}`);

        const [ofertas] = await db.query('SELECT COUNT(*) as total FROM Ofertas');
        console.log(`  • Ofertas: ${ofertas[0].total}`);

        const [facturas] = await db.query('SELECT COUNT(*) as total FROM Facturas');
        console.log(`  • Facturas: ${facturas[0].total}`);

        console.log('\n✓ Datos de prueba insertados correctamente\n');

        // Mostrar algunos datos de ejemplo
        console.log('📝 Ejemplos de datos insertados:\n');
        
        const [usuariosEjemplo] = await db.query('SELECT nome, correo, tipo FROM Usuarios LIMIT 5');
        console.log('Usuarios:');
        usuariosEjemplo.forEach(u => console.log(`  - ${u.nome} (${u.tipo}) - ${u.correo}`));

        console.log('\nProductos con subasta activa:');
        const [productosActivos] = await db.query(`
            SELECT p.nome, p.tipo, p.prezo_inicial, s.estado, s.hora_fin
            FROM Produtos p
            JOIN Subastas s ON p.id_produto = s.id_produto
            WHERE s.estado = 'activa'
            LIMIT 5
        `);
        productosActivos.forEach(p => console.log(`  - ${p.nome} (${p.tipo}) - Precio inicial: €${p.prezo_inicial}`));

        process.exit(0);
    } catch (error) {
        console.error('❌ Error al insertar datos:', error);
        process.exit(1);
    }
}

insertarDatosPrueba();
