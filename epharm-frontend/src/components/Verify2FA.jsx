import React, { useState } from 'react';
import axios from 'axios';

export default function Verify2FA({ userId, onVerified }) {
  const [code, setCode] = useState('');

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await axios.post('/verify-2fa', {
        user_id: userId,
        code,
      });
      const token = res.data.access_token;
      localStorage.setItem('token', token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      onVerified(res.data.user);
    } catch (err) {
      console.error(err.response?.data || err);
      alert('2FA Verification failed');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Verify 2FA</h2>
      <input
        value={code}
        onChange={e => setCode(e.target.value)}
        placeholder="Enter 6-digit code"
        required
      />
      <button type="submit">Verify</button>
    </form>
  );
}
