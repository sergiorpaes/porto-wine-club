import pool from '../config/db.js';

const seedSettings = async () => {
    try {
        console.log('⚙️ Configuring System Settings...');

        // 1. Create Table
        await pool.query(`
            CREATE TABLE IF NOT EXISTS system_settings (
                key VARCHAR(50) PRIMARY KEY,
                value TEXT NOT NULL
            );
        `);
        console.log('✅ Table "system_settings" ready.');

        // 2. Insert Default 'stripe_mode' if not exists
        // We use ON CONFLICT DO NOTHING to preserve existing setting if re-run
        await pool.query(`
            INSERT INTO system_settings (key, value)
            VALUES ('stripe_mode', 'test')
            ON CONFLICT (key) DO NOTHING;
        `);

        console.log('✅ Default setting "stripe_mode" ensured.');
        process.exit(0);
    } catch (err) {
        console.error('❌ Failed:', err);
        process.exit(1);
    }
};

seedSettings();
