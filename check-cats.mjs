import pg from 'pg';
const { Pool } = pg;
const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const r = await pool.query("SELECT * FROM categories");
console.log(r.rows);
await pool.end();
