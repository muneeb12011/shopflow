import pg from 'pg';
const { Pool } = pg;
const pool = new Pool({ connectionString: process.env.DATABASE_URL });

const products = [
  { name: 'AirPods Pro 3', description: 'Active noise cancellation with adaptive transparency mode', price: 249.99, original_price: 279.99, image_url: 'https://images.unsplash.com/photo-1606841837239-c5a1a4a07af7?w=400', images: ['https://images.unsplash.com/photo-1606841837239-c5a1a4a07af7?w=400'], category_id: 1, rating: 4.8, review_count: 2341, in_stock: true, stock_count: 50, is_featured: true, is_new: true, tags: ['audio','wireless','apple'] },
  { name: 'Sony WH-1000XM6', description: 'Industry leading noise cancelling headphones', price: 399.99, original_price: 449.99, image_url: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400', images: ['https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400'], category_id: 1, rating: 4.9, review_count: 1876, in_stock: true, stock_count: 30, is_featured: true, is_new: false, tags: ['audio','wireless','sony'] },
  { name: 'Slim Fit Chinos', description: 'Classic slim fit chinos for everyday wear', price: 79.99, original_price: 99.99, image_url: 'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=400', images: ['https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=400'], category_id: 2, rating: 4.3, review_count: 567, in_stock: true, stock_count: 80, is_featured: false, is_new: false, tags: ['fashion','pants','men'] },
  { name: 'Floral Summer Dress', description: 'Light and breezy floral dress perfect for summer', price: 59.99, original_price: 79.99, image_url: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=400', images: ['https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=400'], category_id: 2, rating: 4.6, review_count: 892, in_stock: true, stock_count: 40, is_featured: true, is_new: true, tags: ['fashion','dress','women'] },
  { name: 'Yoga Mat Pro', description: '6mm natural rubber non-slip surface with perfect grip', price: 98.99, original_price: 119.99, image_url: 'https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?w=400', images: ['https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?w=400'], category_id: 3, rating: 4.8, review_count: 2134, in_stock: true, stock_count: 60, is_featured: true, is_new: false, tags: ['yoga','fitness','mat'] },
  { name: 'Resistance Bands Set', description: 'Set of 5 resistance bands for full body workout', price: 34.99, original_price: 44.99, image_url: 'https://images.unsplash.com/photo-1598632640487-6ea4a4e8b963?w=400', images: ['https://images.unsplash.com/photo-1598632640487-6ea4a4e8b963?w=400'], category_id: 3, rating: 4.4, review_count: 1567, in_stock: true, stock_count: 100, is_featured: false, is_new: false, tags: ['fitness','workout','bands'] },
  { name: 'Scented Candle Set', description: 'Set of 3 luxury scented candles', price: 45.99, original_price: 59.99, image_url: 'https://images.unsplash.com/photo-1602607144425-80c8d57e3be9?w=400', images: ['https://images.unsplash.com/photo-1602607144425-80c8d57e3be9?w=400'], category_id: 4, rating: 4.7, review_count: 743, in_stock: true, stock_count: 35, is_featured: false, is_new: true, tags: ['home','candles','decor'] },
  { name: 'Ceramic Plant Pot', description: 'Handcrafted ceramic pot with drainage hole', price: 28.99, original_price: 39.99, image_url: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=400', images: ['https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=400'], category_id: 4, rating: 4.5, review_count: 428, in_stock: true, stock_count: 45, is_featured: false, is_new: false, tags: ['home','plants','decor'] },
  { name: 'Vitamin C Serum', description: 'Brightening vitamin C serum for glowing skin', price: 68.99, original_price: 89.99, image_url: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=400', images: ['https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=400'], category_id: 5, rating: 4.7, review_count: 1456, in_stock: true, stock_count: 70, is_featured: true, is_new: false, tags: ['beauty','skincare','serum'] },
  { name: 'Lip Gloss Collection', description: 'Set of 6 moisturizing lip glosses', price: 24.99, original_price: 34.99, image_url: 'https://images.unsplash.com/photo-1586495777744-4e6fead3492e?w=400', images: ['https://images.unsplash.com/photo-1586495777744-4e6fead3492e?w=400'], category_id: 5, rating: 4.3, review_count: 634, in_stock: true, stock_count: 90, is_featured: false, is_new: true, tags: ['beauty','makeup','lips'] },
  { name: 'Modern Sofa', description: 'Contemporary 3-seater sofa in premium fabric', price: 899.99, original_price: 1199.99, image_url: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400', images: ['https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400'], category_id: 6, rating: 4.6, review_count: 312, in_stock: true, stock_count: 10, is_featured: true, is_new: false, tags: ['furniture','sofa','living room'] },
  { name: 'Oak Dining Table', description: 'Solid oak dining table seats 6 people', price: 749.99, original_price: 999.99, image_url: 'https://images.unsplash.com/photo-1617806118233-18e1de247200?w=400', images: ['https://images.unsplash.com/photo-1617806118233-18e1de247200?w=400'], category_id: 6, rating: 4.8, review_count: 198, in_stock: true, stock_count: 8, is_featured: true, is_new: true, tags: ['furniture','dining','oak'] },
];

async function seed() {
  try {
    await pool.query('DELETE FROM products');
    for (const p of products) {
      await pool.query(
        `INSERT INTO products (name, description, price, original_price, image_url, images, category_id, rating, review_count, in_stock, stock_count, is_featured, is_new, tags)
         VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14)`,
        [p.name, p.description, p.price, p.original_price, p.image_url, JSON.stringify(p.images), p.category_id, p.rating, p.review_count, p.in_stock, p.stock_count, p.is_featured, p.is_new, JSON.stringify(p.tags)]
      );
    }
    console.log('Seeded', products.length, 'products!');
  } catch (e) {
    console.error('Seed error:', e.message);
  } finally {
    await pool.end();
  }
}
seed();
