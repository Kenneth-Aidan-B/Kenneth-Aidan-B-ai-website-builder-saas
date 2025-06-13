// backend/routes/plans.js

import express from 'express';

const router = express.Router();

// Model pricing constants
const MODEL_COSTS = {
  llama4_scout: 0.269,
  llama3_70B: 0.73
};

// Fixed plans
const FIXED_PLANS = {
  starter: { tokens: 8, price: { llama4_scout: 6, llama3_70B: 10 } },
  pro: { tokens: 16, price: { llama4_scout: 12, llama3_70B: 18 } },
  premium: { tokens: 30, price: { llama4_scout: 22, llama3_70B: 30 } }
};

// GET fixed plans
router.get('/fixed', (req, res) => {
  res.json(FIXED_PLANS);
});

// Custom plan pricing
router.post('/custom', (req, res) => {
  const { tokenCount, model, teamSize } = req.body;

  if (!MODEL_COSTS[model]) {
    return res.status(400).json({ error: 'Invalid model selection' });
  }

  const baseCost = tokenCount * MODEL_COSTS[model];
  const totalCost = Math.round(baseCost * 1.5);
  const finalCost = teamSize ? totalCost * teamSize : totalCost;

  res.json({ price: finalCost });
});

export default router;
