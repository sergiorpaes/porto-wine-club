import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import pool from '../config/db.js';

const router = express.Router();
const SECRET_KEY = process.env.JWT_SECRET || 'super_secret_key_123';

// Login Route
router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;

        // Find user by username
        const result = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
        const user = result.rows[0];

        if (!user) return res.status(400).json({ message: 'User not found' });

        // Verify password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

        // Generate Token
        const token = jwt.sign({ id: user.id, username: user.username }, SECRET_KEY, { expiresIn: '1h' });

        // Return the flag
        res.json({
            token,
            user: {
                id: user.id,
                username: user.username,
                mustChangePassword: user.must_change_password
            }
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
});

// Change Password Route (Protected)
router.post('/change-password', async (req, res) => {
    try {
        const { username, newPassword } = req.body;

        const hashedPassword = await bcrypt.hash(newPassword, 10);

        await pool.query(
            'UPDATE users SET password = $1, must_change_password = FALSE WHERE username = $2',
            [hashedPassword, username]
        );

        res.json({ message: 'Password updated successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error updating password' });
    }
});

export default router;
