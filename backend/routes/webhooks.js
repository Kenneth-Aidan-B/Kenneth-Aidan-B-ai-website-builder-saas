// backend/routes/webhooks.js

import express from 'express';
import Stripe from 'stripe';
import Razorpay from 'razorpay';
import crypto from 'crypto';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// ✅ Stripe Webhook Handler
router.post('/stripe', express.raw({ type: 'application/json' }), (req, res) => {
  const sig = req.headers['stripe-signature'];
  let event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error('Stripe webhook error:', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    const { userId, planName, tokenCount, teamSize, model } = session.metadata;

    console.log('✅ Stripe Payment Success for User:', userId);

    // 👉 Here allocate tokens to user subscription database
    // updateUserTokens(userId, planName, tokenCount, teamSize, model)

  }

  res.json({ received: true });
});

// ✅ Razorpay Webhook Handler
router.post('/razorpay', express.json(), (req, res) => {
  const secret = process.env.RAZORPAY_WEBHOOK_SECRET;
  const signature = req.headers['x-razorpay-signature'];
  const body = JSON.stringify(req.body);

  const expectedSignature = crypto
    .createHmac('sha256', secret)
    .update(body)
    .digest('hex');

  if (expectedSignature !== signature) {
    console.error('Invalid Razorpay webhook signature!');
    return res.status(400).json({ error: 'Invalid signature' });
  }

  const paymentEntity = req.body.payload.payment.entity;
  const userId = paymentEntity.notes?.userId || 'Unknown User';

  console.log('✅ Razorpay Payment Success for User:', userId);

  // 👉 Here allocate tokens to user subscription database
  // updateUserTokens(userId, planName, tokenCount, teamSize, model)

  res.json({ received: true });
});

export default router;
