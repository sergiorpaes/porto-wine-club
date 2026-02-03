
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.js';
import wineRoutes from './routes/wines.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;
const __dirname = path.dirname(fileURLToPath(import.meta.url));

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
app.use('/api/auth/login', loginLimiter); // Apply limiter specially to login
app.use('/api/auth', authRoutes);
app.use('/api/wines', wineRoutes);

// Database Initialization
const DATA_DIR = path.join(__dirname, 'data');
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR);
}

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
