// frontend/src/App.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
  const [plan, setPlan] = useState('starter');
  const [model, setModel] = useState('llama4_scout');
  const [tokenCount, setTokenCount] = useState(10);
  const [teamSize, setTeamSize] = useState(1);
  const [price, setPrice] = useState(0);
  const [currency, setCurrency] = useState('USD');
  const [userId, setUserId] = useState('test-user'); // Normally pulled from logged-in user

  // Dynamic pricing API call:
  const calculatePrice = async () => {
    if (['starter', 'pro', 'premium'].includes(plan)) {
      // For fixed plans, hardcoded pricing:
      const fixedPrices = {
        starter: { llama4_scout: 6, llama3_70B: 10 },
        pro: { llama4_scout: 12, llama3_70B: 18 },
        premium: { llama4_scout: 22, llama3_70B: 30 }
      };
      setPrice(fixedPrices[plan][model]);
    } else {
      // Custom Plan or Team Plan (dynamic pricing API call):
      const res = await axios.post('http://localhost:5000/api/plans/custom', {
        tokenCount,
        model,
        teamSize: plan === 'team' ? teamSize : 1
      });
      setPrice(res.data.price);
    }
  };

  useEffect(() => {
    calculatePrice();
  }, [plan, model, tokenCount, teamSize]);

  const handlePayment = async () => {
    const res = await axios.post('http://localhost:5000/api/payments/create-session', {
      planName: plan,
      model,
      tokenCount,
      teamSize,
      currency,
      userId
    });

    if (currency === 'USD') {
      window.location.href = `https://checkout.stripe.com/pay/${res.data.sessionId}`;
    } else {
      alert(`Razorpay order created: ${res.data.orderId}`);
    }
  };

  return (
    <div style={{ padding: '50px' }}>
      <h1>AI Website SaaS Pricing</h1>

      <div>
        <label>Choose Plan:</label>
        <select value={plan} onChange={(e) => setPlan(e.target.value)}>
          <option value="starter">Starter</option>
          <option value="pro">Pro</option>
          <option value="premium">Premium</option>
          <option value="custom">Custom</option>
          <option value="team">Team</option>
        </select>
      </div>

      <div>
        <label>Select Model:</label>
        <select value={model} onChange={(e) => setModel(e.target.value)}>
          <option value="llama4_scout">LLaMA 4 Scout</option>
          <option value="llama3_70B">LLaMA 3 70B</option>
        </select>
      </div>

      {plan !== 'starter' && plan !== 'pro' && plan !== 'premium' && (
        <div>
          <label>Token Count (Millions):</label>
          <input type="number" value={tokenCount} onChange={(e) => setTokenCount(Number(e.target.value))} />
        </div>
      )}

      {plan === 'team' && (
        <div>
          <label>Team Size:</label>
          <input type="number" value={teamSize} onChange={(e) => setTeamSize(Number(e.target.value))} />
        </div>
      )}

      <div>
        <label>Currency:</label>
        <select value={currency} onChange={(e) => setCurrency(e.target.value)}>
          <option value="USD">USD (Stripe)</option>
          <option value="INR">INR (Razorpay)</option>
        </select>
      </div>

      <h3>Calculated Price: ${price}</h3>

      <button onClick={handlePayment}>Subscribe</button>
    </div>
  );
};

export default App;
