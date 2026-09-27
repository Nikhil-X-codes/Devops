import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT) || 3306,
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'practice_db',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

export async function testConnection(retries = 5, delay = 2000) {
  for (let i = 1; i <= retries; i++) {
    try {
      const connection = await pool.getConnection();
      console.log('Connected to MySQL successfully!');
      connection.release();
      await initDatabase();
      return true;
    } catch (error) {
      console.warn(`MySQL connection attempt ${i}/${retries} failed: ${error.message}`);
      if (i < retries) {
        await new Promise((resolve) => setTimeout(resolve, delay));
      }
    }
  }
  console.error('All MySQL connection attempts failed.');
  return false;
}

export async function initDatabase() {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(100) NOT NULL UNIQUE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    const [rows] = await pool.query('SELECT COUNT(*) as count FROM users');
    if (rows[0].count === 0) {
      await pool.query(
        'INSERT IGNORE INTO users (name, email) VALUES (?, ?)',
        ['John Doe', 'john@example.com']
      );
      console.log('Sample user created in MySQL.');
    }
  } catch (err) {
    console.error('Error initializing database tables:', err.message);
  }
}

export default pool;
