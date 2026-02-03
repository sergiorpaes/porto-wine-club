import Stripe from 'stripe';
import dotenv from 'dotenv';
import pool from './db.js';

dotenv.config();

export const getStripeContext = async () => {
    try {
        // 1. Get Mode from DB
        const result = await pool.query("SELECT value FROM system_settings WHERE key = 'stripe_mode'");
        const mode = result.rows.length > 0 ? result.rows[0].value : 'test';

        let secretKey;
        let publishableKey;

        if (mode === 'live') {
            secretKey = process.env.STRIPE_LIVE_SK;
            publishableKey = process.env.STRIPE_LIVE_PK;
        } else {
            secretKey = process.env.STRIPE_TEST_SK;
            publishableKey = process.env.STRIPE_TEST_PK;
        }

        if (!secretKey) {
            console.warn(`⚠️  Stripe Secret Key is missing for mode: ${mode}`);
        }

        const stripe = new Stripe(secretKey, {
            apiVersion: '2023-10-16',
        });

        return { stripe, publishableKey, mode };
    } catch (error) {
        console.error("Error fetching stripe context:", error);
        // Fallback to test if DB fails
        const stripe = new Stripe(process.env.STRIPE_TEST_SK, { apiVersion: '2023-10-16' });
        return { stripe, publishableKey: process.env.STRIPE_TEST_PK, mode: 'test' };
    }
};

