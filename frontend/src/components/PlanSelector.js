// frontend/src/components/PlanSelector.js

import React from 'react';

const PlanSelector = ({ plan, setPlan }) => (
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
);

export default PlanSelector;
