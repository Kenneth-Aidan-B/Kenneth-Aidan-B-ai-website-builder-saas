// backend/routes/payments.js

import express from 'express';
import Stripe from 'stripe';
import Razorpay from 'razorpay';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();

// Initialize Stripe & Razorpay clients
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET
});

// Payment route (create payment session)
router.post('/create-session', async (req, res) => {
  const { planName, model, tokenCount, teamSize, currency, userId } = req.body;

  let price = 0;

  // Apply Pricing Logic (same formula from plans.js)
  const MODEL_COSTS = {
    llama4_scout: 0.269,
    llama3_70B: 0.73
  };

  if (['starter', 'pro', 'premium'].includes(planName)) {
    const FIXED_PRICES = {
      starter: { llama4_scout: 6, llama3_70B: 10 },
      pro: { llama4_scout: 12, llama3_70B: 18 },
      premium: { llama4_scout: 22, llama3_70B: 30 }
    };

    price = FIXED_PRICES[planName][model];
  } else {
    const baseCost = tokenCount * MODEL_COSTS[model];
    price = Math.round(baseCost * 1.5);
    if (teamSize) price *= teamSize;
  }

  try {
    if (currency === 'USD') {
      // Stripe flow (international)
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [{
          price_data: {
            currency: 'usd',
            product_data: { name: `Subscription: ${planName}` },
            unit_amount: price * 100, // Stripe uses cents
          },
          quantity: 1,
        }],
        mode: 'payment',
        success_url: process.env.FRONTEND_URL + '/success',
        cancel_url: process.env.FRONTEND_URL + '/cancel',
        metadata: {
          userId,
          planName,
          tokenCount,
          teamSize,
          model
        }
      });

      res.json({ sessionId: session.id });
    } else {
      // Razorpay flow (INR)
      const order = await razorpay.orders.create({
        amount: price * 100, // Razorpay uses paise
        currency: 'INR',
        receipt: `order_rcptid_${userId}_${Date.now()}`
      });

      res.json({ orderId: order.id });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Payment session creation failed' });
  }
});

export default router;
