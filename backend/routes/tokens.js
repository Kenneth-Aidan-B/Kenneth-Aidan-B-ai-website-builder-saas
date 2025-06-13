// backend/routes/tokens.js

import express from 'express';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();

// Token Limits (These can also be pulled from DB or Admin Dashboard later)
const FREE_PLAN_LIMITS = {
  monthly: 1000000,
  daily: 200000
};

// Simulated in-memory token store (replace with DB in production)
let userTokenUsage = {}; // { userId: { daily: x, monthly: y, lastReset: timestamp } }

// Reset daily counters every 24h — very simple simulation
setInterval(() => {
  Object.keys(userTokenUsage).forEach((uid) => {
    userTokenUsage[uid].daily = 0;
  });
}, 24 * 60 * 60 * 1000);

// Middleware to check token availability
const tokenLimiter = (plan) => (req, res, next) => {
  const { userId, tokensUsed } = req.body;

  if (!userTokenUsage[userId]) {
    userTokenUsage[userId] = { daily: 0, monthly: 0, lastReset: Date.now() };
  }

  // Apply free plan limits
  if (plan === 'free') {
    if (userTokenUsage[userId].daily + tokensUsed > FREE_PLAN_LIMITS.daily) {
      return res.status(403).json({ error: 'Daily token limit exceeded' });
    }
    if (userTokenUsage[userId].monthly + tokensUsed > FREE_PLAN_LIMITS.monthly) {
      return res.status(403).json({ error: 'Monthly token limit exceeded' });
    }
  }

  userTokenUsage[userId].daily += tokensUsed;
  userTokenUsage[userId].monthly += tokensUsed;

  next();
};

// Example protected route
router.post('/use', tokenLimiter('free'), (req, res) => {
  res.json({ message: 'Token usage updated successfully' });
});

export default router;
