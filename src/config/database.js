import pkg from 'pg';
const { Pool } = pkg;
import dotenv from 'dotenv';

dotenv.config();

// Configuración de la conexión a PostgreSQL
const pool = new Pool({
    connectionString: process.env.DATABASE_URL || `postgresql://${process.env.DB_USER || 'postgres'}:${process.env.DB_PASSWORD || ''}@${process.env.DB_HOST || 'localhost'}:${process.env.DB_PORT || 5432}/${process.env.DB_NAME || 'mariscamar_db'}`,
    ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
    max: 10,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000,
});

// Probar la conexión
pool.connect()
    .then(client => {
        console.log('✓ Conexión a PostgreSQL establecida');
        client.release();
    })
    .catch(err => {
        console.error('✗ Error al conectar con PostgreSQL:', err.message);
    });

// Wrapper para hacer que la sintaxis sea compatible con mysql2/promise
const db = {
    async query(sql, params = []) {
        const result = await pool.query(sql, params);
        return [result.rows, result.fields];
    },
    async execute(sql, params = []) {
        const result = await pool.query(sql, params);
        return [result.rows.length > 0 ? result.rows[0] : { insertId: result.rows[0]?.id, affectedRows: result.rowCount }, result.fields];
    }
};

export default db;
