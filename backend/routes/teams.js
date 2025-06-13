// backend/routes/teams.js

import express from 'express';
import Team from '../models/Team.js';

const router = express.Router();

// Create new team
router.post('/create', async (req, res) => {
  const { teamName, ownerId, planName, model, tokenCount, teamSize } = req.body;
  
  const team = new Team({
    teamName,
    ownerId,
    members: [{ userId: ownerId }],
    subscription: { planName, model, tokenCount, teamSize }
  });

  try {
    const savedTeam = await team.save();
    res.json(savedTeam);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add team member
router.post('/add-member', async (req, res) => {
  const { teamId, email, userId } = req.body;

  try {
    const team = await Team.findById(teamId);
    team.members.push({ email, userId });
    team.subscription.teamSize += 1;
    await team.save();
    res.json(team);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Remove member
router.post('/remove-member', async (req, res) => {
  const { teamId, userId } = req.body;

  try {
    const team = await Team.findById(teamId);
    team.members = team.members.filter(member => member.userId !== userId);
    team.subscription.teamSize -= 1;
    await team.save();
    res.json(team);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get full team info
router.get('/:teamId', async (req, res) => {
  try {
    const team = await Team.findById(req.params.teamId);
    res.json(team);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
