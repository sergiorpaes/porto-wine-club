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

// 3. Create Checkout Session (Redirect flow)
router.post('/create-checkout-session', async (req, res) => {
    try {
        const { stripe } = await getStripeContext();
        const { items } = req.body;
        const DOMAIN = process.env.CLIENT_URL || 'http://localhost:5173';

        const lineItems = items.map(item => ({
            price_data: {
                currency: 'eur',
                product_data: {
                    name: item.name,
                    images: [item.image],
                },
                unit_amount: Math.round(item.price * 100),
            },
            quantity: item.quantity,
        }));

        // Add shipping if applicable (simple logic for now)
        // Note: Real implementation might read from shipping options
        const totalAmount = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        if (totalAmount <= 100) {
            lineItems.push({
                price_data: {
                    currency: 'eur',
                    product_data: {
                        name: 'Shipping',
                    },
                    unit_amount: 1500, // €15.00
                },
                quantity: 1,
            });
        }

        const session = await stripe.checkout.sessions.create({
            line_items: lineItems,
            mode: 'payment',
            success_url: `${DOMAIN}/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${DOMAIN}/checkout`,
        });

        res.json({ url: session.url });
    } catch (e) {
        console.error('Stripe Checkout Error:', e);
        res.status(500).json({ error: e.message });
    }
});

export default router;
