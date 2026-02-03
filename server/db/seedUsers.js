import pool from '../config/db.js';
import bcrypt from 'bcryptjs';

const seedUsers = async () => {
    try {
        console.log('🌱 Seeding Users...');

        // 1. Create Users Table
        await pool.query(`
            CREATE TABLE IF NOT EXISTS users (
                id SERIAL PRIMARY KEY,
                username VARCHAR(50) UNIQUE NOT NULL,
                password VARCHAR(255) NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `);
        console.log('✅ Table "users" ensured.');

        // 2. Insert Admin User (if not exists)
        const hashedPassword = await bcrypt.hash('admin123', 10);
        const username = 'admin';

        const check = await pool.query('SELECT * FROM users WHERE username = $1', [username]);

        if (check.rows.length === 0) {
            await pool.query(
                'INSERT INTO users (username, password) VALUES ($1, $2)',
                [username, hashedPassword]
            );
            console.log('👤 Admin user created: admin / admin123');
        } else {
            console.log('👤 Admin user already exists.');
        }

        console.log('✅ User seeding completed.');
        process.exit(0);
    } catch (err) {
        console.error('❌ User seed failed:', err);
        process.exit(1);
    }
};

seedUsers();
