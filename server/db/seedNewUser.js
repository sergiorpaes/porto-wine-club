import pool from '../config/db.js';
import bcrypt from 'bcryptjs';

const seedNewUser = async () => {
    try {
        console.log('🔐 Securing Admin Access...');

        // 1. Add 'must_change_password' functionality
        await pool.query(`
            ALTER TABLE users 
            ADD COLUMN IF NOT EXISTS must_change_password BOOLEAN DEFAULT FALSE;
        `);
        console.log('✅ Schema updated: "must_change_password" column.');

        // 2. Create 'sergiorps'
        const username = 'sergiorps';
        const tempPassword = 'BemVindo2024!'; // Temporary
        const hashedPassword = await bcrypt.hash(tempPassword, 10);

        // Check if exists
        const check = await pool.query('SELECT * FROM users WHERE username = $1', [username]);

        if (check.rows.length === 0) {
            await pool.query(
                `INSERT INTO users (username, password, must_change_password) VALUES ($1, $2, TRUE)`,
                [username, hashedPassword]
            );
            console.log(`👤 User created: ${username}`);
            console.log(`🔑 Temp Password: ${tempPassword}`);
        } else {
            // Force reset for testing if needed, or skip
            console.log(`👤 User ${username} already exists. Updating settings...`);
            await pool.query(
                `UPDATE users SET password = $1, must_change_password = TRUE WHERE username = $2`,
                [hashedPassword, username]
            );
            console.log(`♻️  Reset password and forced change for: ${username}`);
        }

        // 3. Remove old 'admin'
        await pool.query("DELETE FROM users WHERE username = 'admin'");
        console.log('🗑️  Removed legacy "admin" user.');

        console.log('✅ Security update complete.');
        process.exit(0);
    } catch (err) {
        console.error('❌ Failed:', err);
        process.exit(1);
    }
};

seedNewUser();
