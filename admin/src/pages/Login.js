// admin/src/pages/Login.js

import React, { useState } from 'react';
import axios from 'axios';

const Login = ({ setAuthenticated }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

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
    <div>
      <h1>Admin Login</h1>
      <input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} /><br />
      <input placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} /><br />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default Login;
