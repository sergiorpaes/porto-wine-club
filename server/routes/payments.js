import express from 'express';
import { getStripeContext } from '../config/stripe.js';
import pool from '../config/db.js';

const router = express.Router();

// 1. Expose the Publishable Key to the frontend
router.get('/config', async (req, res) => {
    const { publishableKey, mode } = await getStripeContext();
    res.json({ publishableKey, mode });
});

// 2. Create Payment Intent (Client sends items, Server calculates price)
router.post('/create-payment-intent', async (req, res) => {
    try {
        const { stripe } = await getStripeContext();
        const { items, currency = 'eur' } = req.body; // items: [{ id: 1, quantity: 2 }]

        if (!items || items.length === 0) {
            return res.status(400).json({ error: 'No items in cart' });
        }

        // Calculate total securely by fetching prices from DB
        let totalAmount = 0;

        for (const item of items) {
            const result = await pool.query('SELECT price FROM wines WHERE id = $1', [item.id]);
            const product = result.rows[0];

            if (product) {
                // Parse "15.00" -> 15.00
                // Assuming format matches previous logic (simple float parse)
                const priceString = product.price.toString().replace('€', '').replace(',', '.').trim();
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
