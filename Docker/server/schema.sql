-- Create Database
CREATE DATABASE IF NOT EXISTS practice_db;

USE practice_db;

-- Create Users Table
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert Sample Record
INSERT IGNORE INTO users (name, email) VALUES ('John Doe', 'john@example.com');
