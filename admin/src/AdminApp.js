// admin/src/AdminApp.js

import React, { useState } from 'react';
import PricingConfig from './components/PricingConfig';
import axios from 'axios';

const AdminApp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [authenticated, setAuthenticated] = useState(false);

  const handleLogin = async () => {
    try {
      const res = await axios.post('http://localhost:5000/api/admin/login', { email, password });
      if (res.data.message === 'Admin authenticated') {
        setAuthenticated(true);
      }
    } catch (err) {
      alert('Invalid credentials');
    }
  };

  return (
    <div style={{ padding: '50px' }}>
      {!authenticated ? (
        <>
          <h1>Admin Login</h1>
          <input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} /><br />
          <input placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} /><br />
          <button onClick={handleLogin}>Login</button>
        </>
      ) : (
        <>
          <h1>Admin Dashboard</h1>
          <PricingConfig />
        </>
      )}
    </div>
  );
};

export default AdminApp;
