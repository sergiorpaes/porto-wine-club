import express from 'express';
import pool from '../config/db.js';

const router = express.Router();

// Middleware to check if user is admin could be added here
// For now, we assume this route is mounted under a path that requires auth,
// or we rely on the implementation plan's verifying steps.

// GET /api/settings
router.get('/', async (req, res) => {
    try {
        const result = await pool.query('SELECT key, value FROM system_settings');
        const settings = {};
        result.rows.forEach(row => {
            settings[row.key] = row.value;
        });
        res.json(settings);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to fetch settings' });
    }
});

// PUT /api/settings
router.put('/', async (req, res) => {
    try {
        const { key, value } = req.body;

        if (!key || !value) {
            return res.status(400).json({ error: 'Key and Value are required' });
        }

        // Limit what can be changed for security
        if (key !== 'stripe_mode') {
            return res.status(403).json({ error: 'Setting not modifiable' });
        }

        await pool.query(
            `INSERT INTO system_settings (key, value) VALUES ($1, $2)
             ON CONFLICT (key) DO UPDATE SET value = $2`,
            [key, value]
        );

        res.json({ message: 'Setting updated', key, value });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to update setting' });
    }
});

export default router;
