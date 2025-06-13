// backend/models/Team.js

import mongoose from 'mongoose';

const TeamSchema = new mongoose.Schema({
  teamName: { type: String, required: true },
  ownerId: { type: String, required: true },
  members: [
    {
      email: String,
      userId: String
    }
  ],
  subscription: {
    planName: String,
    model: String,
    tokenCount: Number,
    teamSize: Number,
    tokensUsed: { type: Number, default: 0 }
  }
}, { timestamps: true });

export default mongoose.model('Team', TeamSchema);
