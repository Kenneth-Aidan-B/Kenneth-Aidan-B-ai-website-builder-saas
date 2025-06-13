// backend/routes/groq.js

import express from 'express';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();

// Groq model IDs mapped
const MODEL_IDS = {
  llama4_scout: 'llama-4-scout',
  llama3_70B: 'llama-3-70b',
  llama3_8B: 'llama-3-8b-instant'
};

// Calculate total tokens (simple estimation)
const estimateTokens = (prompt, response) => {
  const inputTokens = Math.ceil(prompt.length / 4); // very rough approximation
  const outputTokens = Math.ceil(response.length / 4);
  return { inputTokens, outputTokens, total: inputTokens + outputTokens };
};

router.post('/generate', async (req, res) => {
  const { prompt, model, userId, plan } = req.body;

  let modelToUse = MODEL_IDS[model];

  if (plan === 'free') {
    modelToUse = MODEL_IDS.llama3_8B; // free plan forces LLaMA 3.1 8B Instant
  }

  try {
    const response = await axios.post(
      `${process.env.GROQ_API_URL}/v1/chat/completions`,
      {
        model: modelToUse,
        messages: [{ role: 'user', content: prompt }],
        max_tokens: 500
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.GROQ_API_KEY}`
        }
      }
    );

    const aiResponse = response.data.choices[0].message.content;
    const tokenEstimation = estimateTokens(prompt, aiResponse);

    // TODO: Hook token deduction logic here

    res.json({
      response: aiResponse,
      tokensUsed: tokenEstimation.total
    });

  } catch (err) {
    console.error(err.response?.data || err);
    res.status(500).json({ error: 'Groq API error' });
  }
});

export default router;
