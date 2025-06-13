// frontend/src/components/ModelSelector.js

import React from 'react';

const ModelSelector = ({ model, setModel }) => (
  <div>
    <label>Select Model:</label>
    <select value={model} onChange={(e) => setModel(e.target.value)}>
      <option value="llama4_scout">LLaMA 4 Scout</option>
      <option value="llama3_70B">LLaMA 3 70B</option>
    </select>
  </div>
);

export default ModelSelector;
