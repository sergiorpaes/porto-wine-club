import pool from '../config/db.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const WINES_FILE = path.join(__dirname, '../data/wines.json');

const seedData = async () => {
    try {
        console.log('🌱 Starting database seed...');

        // 1. Create Data Table
        await pool.query(`
            CREATE TABLE IF NOT EXISTS wines (
                id SERIAL PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                region VARCHAR(255),
                category VARCHAR(50),
                price DECIMAL(10, 2),
                description JSONB,
                image TEXT,
                year INTEGER,
                alcohol VARCHAR(50),
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `);
        console.log('✅ Table "wines" ensured.');

        // 2. Read JSON data
        if (!fs.existsSync(WINES_FILE)) {
            console.error('❌ wines.json not found!');
            process.exit(1);
        }
        const wines = JSON.parse(fs.readFileSync(WINES_FILE, 'utf-8'));

        // 3. Clear existing data (optional, to avoid duplicates on re-run)
        // await pool.query('TRUNCATE TABLE wines RESTART IDENTITY;');

        // 4. Insert Data
        for (const wine of wines) {
            // Check if wine already exists by name to avoid duplicates
            const check = await pool.query('SELECT * FROM wines WHERE name = $1', [wine.name]);

            if (check.rows.length === 0) {
                await pool.query(`
                    INSERT INTO wines (name, region, category, price, description, image, year, alcohol)
                    VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
                `, [
                    wine.name,
                    wine.region,
                    wine.category,
                    wine.price,
                    JSON.stringify(wine.description), // Ensure it's stored as JSON
                    wine.image,
                    wine.year,
                    wine.alcohol
                ]);
                console.log(`   ---> Inserted: ${wine.name}`);
            } else {
                console.log(`   ---> Skipped (Existing): ${wine.name}`);
            }
        }

        console.log('🍷 Database seeding completed successfully!');
        process.exit(0);
    } catch (err) {
        console.error('❌ Seed failed:', err);
        process.exit(1);
    }
};

seedData();
