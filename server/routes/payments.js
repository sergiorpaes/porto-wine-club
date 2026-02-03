import express from 'express';
import { stripe, publishableKey } from '../config/stripe.js';
import pool from '../config/db.js';

const router = express.Router();

// 1. Expose the Publishable Key to the frontend
router.get('/config', (req, res) => {
    res.json({ publishableKey });
});

// 2. Create Payment Intent (Client sends items, Server calculates price)
router.post('/create-payment-intent', async (req, res) => {
    try {
        const { items, currency = 'eur' } = req.body; // items: [{ id: 1, quantity: 2 }]

        if (!items || items.length === 0) {
            return res.status(400).json({ error: 'No items in cart' });
        }

        // Calculate total securely by fetching prices from DB
        let totalAmount = 0;

        for (const item of items) {
            const result = await pool.query('SELECT price, member_price FROM wines WHERE id = $1', [item.id]);
            const product = result.rows[0];

            if (product) {
                // Determine price: For now, we use standard price. 
                // Enhanced Logic: If req.body.isMember is true, use member_price. 
                // For simplicity/security, let's assume standard price OR check user session if we built middleware.
                // Let's stick to standard price or passed logic if trusted context, but DB is safest.
                // Assuming standard price for public checkout for now.

                // Note: The Price in DB is "15.00" string or decimal. Stripe needs integers (cents).
                // We need to parse 15.00 -> 1500
                const priceString = product.price.replace('€', '').replace(',', '.').trim();
                const priceDetails = parseFloat(priceString);

                if (!isNaN(priceDetails)) {
                    totalAmount += priceDetails * item.quantity;
                }
            }
        }

        // Convert to cents (integer)
        const amountInCents = Math.round(totalAmount * 100);

        if (amountInCents < 50) {
            return res.status(400).json({ error: 'Amount too small' });
        }

        // Create Intent
        const paymentIntent = await stripe.paymentIntents.create({
            amount: amountInCents,
            currency: currency,
            automatic_payment_methods: {
                enabled: true,
            },
        });

        res.json({
            clientSecret: paymentIntent.client_secret,
        });

    } catch (e) {
        console.error('Stripe Error:', e);
        res.status(500).json({ error: e.message });
    }
});

export default router;
