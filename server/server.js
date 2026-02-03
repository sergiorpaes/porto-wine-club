
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.js';
import wineRoutes from './routes/wines.js';
import paymentRoutes from './routes/payments.js';
import settingsRoutes from './routes/settings.js';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Security Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());

// Rate Limiter for Login (5 attempts per 15 mins)
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: { message: "Too many login attempts, please try again later." }
});

// Routes
app.get('/api/health', (req, res) => res.json({ status: 'ok', timestamp: new Date() }));
app.use('/api/auth/login', loginLimiter); // Apply limiter specially to login
app.use('/api/auth', authRoutes);
app.use('/api/wines', wineRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/settings', settingsRoutes);

// Export app for serverless
export const handler = app;

// Start Server only if not in serverless mode
if (process.env.NODE_ENV !== 'production' && !process.env.NETLIFY) {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

export default app;
