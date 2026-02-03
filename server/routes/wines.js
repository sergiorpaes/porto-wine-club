
import express from 'express';
import { authenticateToken } from '../middleware/auth.js';
import pool from '../config/db.js';

const router = express.Router();

// GET All Wines (Public)
router.get('/', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM wines ORDER BY id ASC');
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
});

// POST Add Wine (Protected)
router.post('/', authenticateToken, async (req, res) => {
    try {
        const { name, region, category, price, description, image, year, alcohol } = req.body;

        const result = await pool.query(
            `INSERT INTO wines (name, region, category, price, description, image, year, alcohol) 
             VALUES ($1, $2, $3, $4, $5, $6, $7, $8) 
             RETURNING *`,
            [name, region, category, price, JSON.stringify(description), image, year, alcohol]
        );

        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error adding wine' });
    }
});

// PUT Update Wine (Protected)
router.put('/:id', authenticateToken, async (req, res) => {
    try {
        const { name, region, category, price, description, image, year, alcohol } = req.body;

        const result = await pool.query(
            `UPDATE wines 
             SET name=$1, region=$2, category=$3, price=$4, description=$5, image=$6, year=$7, alcohol=$8 
             WHERE id=$9 
             RETURNING *`,
            [name, region, category, price, JSON.stringify(description), image, year, alcohol, req.params.id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Wine not found' });
        }

        res.json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error updating wine' });
    }
});

// DELETE Remove Wine (Protected)
router.delete('/:id', authenticateToken, async (req, res) => {
    try {
        const result = await pool.query('DELETE FROM wines WHERE id = $1', [req.params.id]);

        if (result.rowCount === 0) {
            return res.status(404).json({ message: 'Wine not found' });
        }

        res.json({ message: 'Wine deleted' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error deleting wine' });
    }
});

export default router;
