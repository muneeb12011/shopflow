import pg from 'pg';
import 'dotenv/config';
const { Pool } = pg;
const pool = new Pool({ connectionString: process.env.DATABASE_URL });

async function seed() {
  try {
    // Seed categories first
    await pool.query(`
      INSERT INTO categories (name, slug) VALUES
        ('Electronics', 'electronics'),
        ('Fashion', 'fashion'),
        ('Sports', 'sports'),
        ('Home & Living', 'home-living'),
        ('Beauty', 'beauty'),
        ('Furniture', 'furniture')
      ON CONFLICT (slug) DO NOTHING
    `);
    console.log('Categories seeded');

    const cats = await pool.query('SELECT id, name FROM categories');
    console.log('Categories:', cats.rows);
  } catch (e) {
    console.error('Error:', e.message);
  } finally {
    await pool.end();
  }
  console.log("DB URL:", process.env.DATABASE_URL); // debug
}
seed();
