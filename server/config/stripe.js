import Stripe from 'stripe';
import dotenv from 'dotenv';

dotenv.config();

const mode = process.env.STRIPE_MODE || 'test';

let secretKey;
let publishableKey;

if (mode === 'live') {
    secretKey = process.env.STRIPE_LIVE_SK;
    publishableKey = process.env.STRIPE_LIVE_PK;
    console.log('💳 Stripe Mode: LIVE 🔴');
} else {
    secretKey = process.env.STRIPE_TEST_SK;
    publishableKey = process.env.STRIPE_TEST_PK;
    console.log('💳 Stripe Mode: TEST 🟢');
}

if (!secretKey) {
    console.warn(`⚠️  Stripe Secret Key is missing for mode: ${mode}`);
}

const stripe = new Stripe(secretKey, {
    apiVersion: '2023-10-16', // Use a stable version
});

export { stripe, publishableKey };
