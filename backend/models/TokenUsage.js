// backend/models/TokenUsage.js

import mongoose from 'mongoose';

const TokenUsageSchema = new mongoose.Schema({
  userId: String,
  teamId: String,
  tokensUsed: Number,
  date: { type: Date, default: Date.now }
});

export default mongoose.model('TokenUsage', TokenUsageSchema);
