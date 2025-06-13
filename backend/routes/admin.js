// backend/routes/admin.js

import express from 'express';
import dotenv from 'dotenv';
import Team from '../models/Team.js';  // ✅ Import Team model

dotenv.config();

const router = express.Router();

// Hardcoded admin credentials (for demo)
const ADMIN_EMAIL = 'kennethaidan1404@gmail.com';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'Aldin@Orazael';

// Mock database for pricing settings (replace with DB later)
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

// ✅ Existing pricing APIs

router.get('/pricing', (req, res) => {
  res.json(pricingSettings);
});

router.post('/pricing/update', (req, res) => {
  const { freePlan, modelCosts } = req.body;

  if (freePlan) pricingSettings.freePlan = freePlan;
  if (modelCosts) pricingSettings.modelCosts = modelCosts;

  res.json({ message: 'Pricing settings updated successfully', pricingSettings });
});

// ✅ ✅ ✅ NEW: Team Management APIs

// List All Teams
router.get('/teams', async (req, res) => {
  try {
    const teams = await Team.find();
    res.json(teams);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// View Single Team
router.get('/teams/:teamId', async (req, res) => {
  try {
    const team = await Team.findById(req.params.teamId);
    res.json(team);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete a Team
router.delete('/teams/:teamId', async (req, res) => {
  try {
    await Team.findByIdAndDelete(req.params.teamId);
    res.json({ message: 'Team deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Reset Team Token Usage (Optional for Admin Control)
router.post('/teams/:teamId/reset-tokens', async (req, res) => {
  try {
    const team = await Team.findById(req.params.teamId);
    team.subscription.tokensUsed = 0;
    await team.save();
    res.json({ message: 'Team tokens reset' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
