const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Database connection
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
});

// Middleware
app.use(cors());
app.use(express.json());

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

// Search products in nearby stores
app.get('/api/search', async (req, res) => {
  try {
    const { query, lat, lng, radius = 10 } = req.query;
    
    if (!query || !lat || !lng) {
      return res.status(400).json({ 
        error: 'Missing required parameters: query, lat, lng' 
      });
    }

    // SQL query using PostGIS to find nearby stores with the product
    const stores = await pool.query(`
      SELECT 
        s.id, 
        s.name, 
        s.address, 
        s.latitude, 
        s.longitude,
        p.name as product_name,
        i.quantity,
        ST_Distance(
          ST_MakePoint(s.longitude, s.latitude),
          ST_MakePoint($3, $2)
        ) * 111.32 as distance_km
      FROM 
        stores s
      JOIN 
        inventory i ON s.id = i.store_id
      JOIN 
        products p ON i.product_id = p.id
      WHERE 
        p.name ILIKE $1
        AND i.quantity > 0
        AND ST_Distance(
          ST_MakePoint(s.longitude, s.latitude),
          ST_MakePoint($3, $2)
        ) * 111.32 <= $4
      ORDER BY 
        distance_km ASC
      LIMIT 20
    `, [`%${query}%`, lat, lng, radius]);

    res.json(stores.rows);
  } catch (error) {
    console.error('Search error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get store details
app.get('/api/stores/:storeId', async (req, res) => {
  try {
    const { storeId } = req.params;
    
    // Get store info
    const storeResult = await pool.query(`
      SELECT * FROM stores WHERE id = $1
    `, [storeId]);
    
    if (storeResult.rows.length === 0) {
      return res.status(404).json({ error: 'Store not found' });
    }
    
    const store = storeResult.rows[0];
    
    // Get store inventory
    const inventoryResult = await pool.query(`
      SELECT 
        p.id, 
        p.name, 
        p.category, 
        i.quantity, 
        i.price
      FROM 
        inventory i
      JOIN 
        products p ON i.product_id = p.id
      WHERE 
        i.store_id = $1
        AND i.quantity > 0
      ORDER BY 
        p.category, p.name
    `, [storeId]);
    
    store.inventory = inventoryResult.rows;
    
    res.json(store);
  } catch (error) {
    console.error('Store details error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});