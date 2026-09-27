import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

async function initDB() {
  const host = process.env.DB_HOST || 'localhost';
  const port = Number(process.env.DB_PORT) || 3306;
  const user = process.env.DB_USER || 'root';
  const password = process.env.DB_PASSWORD || '';
  const database = process.env.DB_NAME || 'practice_db';

  console.log(`Connecting to MySQL on ${host}:${port} as ${user}...`);

  try {
    const connection = await mysql.createConnection({
      host,
      port,
      user,
      password
    });

    console.log(`Connected. Creating database '${database}' if it doesn't exist...`);
    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${database}\`;`);

    console.log(`Switching to database '${database}'...`);
    await connection.query(`USE \`${database}\`;`);

    console.log(`Creating 'users' table if it doesn't exist...`);
    await connection.query(`
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(100) NOT NULL UNIQUE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Insert a sample user if none exist
    const [rows] = await connection.query('SELECT COUNT(*) as count FROM users');
    if (rows[0].count === 0) {
      await connection.query(
        'INSERT INTO users (name, email) VALUES (?, ?)',
        ['John Doe', 'john@example.com']
      );
      console.log('Sample user created.');
    }

    console.log('Database initialization completed successfully!');
    await connection.end();
  } catch (err) {
    console.error('Failed to initialize database:');
    console.error(err.message);
    console.log('\nTip: Make sure the MySQL service is started and DB_PASSWORD in server/.env is correct.');
  }
}

initDB();
