// admin/src/components/PricingConfig.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PricingConfig = () => {
  const [pricing, setPricing] = useState({});

  const fetchPricing = async () => {
    const res = await axios.get('http://localhost:5000/api/admin/pricing');
    setPricing(res.data);
  };

  const handleUpdate = async () => {
    await axios.post('http://localhost:5000/api/admin/pricing/update', pricing);
    alert('Pricing Updated');
  };

  useEffect(() => {
    fetchPricing();
  }, []);

  return (
    <div>
      <h3>Current Pricing Settings:</h3>

      <h4>Free Plan Limits</h4>
      <label>Monthly Tokens:</label>
      <input type="number" value={pricing?.freePlan?.monthly || 0}
        onChange={(e) => setPricing({ ...pricing, freePlan: { ...pricing.freePlan, monthly: e.target.value } })} />
      <br />
      <label>Daily Tokens:</label>
      <input type="number" value={pricing?.freePlan?.daily || 0}
        onChange={(e) => setPricing({ ...pricing, freePlan: { ...pricing.freePlan, daily: e.target.value } })} />
      <br />

      <h4>Model Costs</h4>
      <label>LLaMA 4 Scout ($ per Million):</label>
      <input type="number" value={pricing?.modelCosts?.llama4_scout || 0}
        onChange={(e) => setPricing({ ...pricing, modelCosts: { ...pricing.modelCosts, llama4_scout: e.target.value } })} />
      <br />
      <label>LLaMA 3 70B ($ per Million):</label>
      <input type="number" value={pricing?.modelCosts?.llama3_70B || 0}
        onChange={(e) => setPricing({ ...pricing, modelCosts: { ...pricing.modelCosts, llama3_70B: e.target.value } })} />
      <br /><br />

      <button onClick={handleUpdate}>Save Pricing</button>
    </div>
  );
};

export default PricingConfig;
