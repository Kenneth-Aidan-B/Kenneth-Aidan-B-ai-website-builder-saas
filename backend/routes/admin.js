// backend/routes/admin.js

import express from 'express';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();

// Simple hardcoded admin credentials (for demo — move to DB in production)
const ADMIN_EMAIL = 'kennethaidan1404@gmail.com';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'Aldin@Orazael';

// Mock database for settings (replace with Firestore or MongoDB in prod)
let pricingSettings = {
  freePlan: { monthly: 1000000, daily: 200000 },
  modelCosts: {
    llama4_scout: 0.269,
    llama3_70B: 0.73
  }
};

// Admin Login Route
router.post('/login', (req, res) => {
  const { email, password } = req.body;

  if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
    res.json({ message: 'Admin authenticated' });
  } else {
    res.status(401).json({ error: 'Invalid credentials' });
  }
});

// Get current pricing settings
router.get('/pricing', (req, res) => {
  res.json(pricingSettings);
});

// Update pricing settings
router.post('/pricing/update', (req, res) => {
  const { freePlan, modelCosts } = req.body;

  if (freePlan) pricingSettings.freePlan = freePlan;
  if (modelCosts) pricingSettings.modelCosts = modelCosts;

  res.json({ message: 'Pricing settings updated successfully', pricingSettings });
});

export default router;
