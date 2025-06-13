// backend/routes/index.js

import express from 'express';
import authRoutes from './auth.js';
import planRoutes from './plans.js';
import paymentRoutes from './payments.js';
import tokenRoutes from './tokens.js';
import groqRoutes from './groq.js';
import adminRoutes from './admin.js';

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/plans', planRoutes);
router.use('/payments', paymentRoutes);
router.use('/tokens', tokenRoutes);
router.use('/groq', groqRoutes);
router.use('/admin', adminRoutes);

export default router;
