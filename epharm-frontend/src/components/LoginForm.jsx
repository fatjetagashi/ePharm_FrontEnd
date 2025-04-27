import React, { useState } from 'react';
import axios from 'axios';

export default function LoginForm({ onLoggedIn, onSwitchToSignup }) {
  const [creds, setCreds] = useState({ email: '', password: '' });

  const handleChange = e =>
    setCreds({ ...creds, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await axios.post('/login', creds);
      const token = res.data.access_token;
      localStorage.setItem('token', token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      onLoggedIn();
    } catch (err) {
      console.error('Login failed', err.response?.data || err);
      alert(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-12 bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4 text-center">Log In</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="email"
          type="email"
          value={creds.email}
          onChange={handleChange}
          placeholder="Email"
          required
          className="w-full px-3 py-2 border rounded focus:outline-none focus:ring"
        />
        <input
          name="password"
          type="password"
          value={creds.password}
          onChange={handleChange}
          placeholder="Password"
          required
          className="w-full px-3 py-2 border rounded focus:outline-none focus:ring"
        />
        <button
          type="submit"
          className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded"
        >
          Log In
        </button>
      </form>
      <p className="mt-4 text-center text-sm text-gray-600">
        Don’t have an account?{' '}
        <button
          onClick={onSwitchToSignup}
          className="text-blue-600 hover:underline"
        >
          Sign Up
        </button>
      </p>
    </div>
  );
}
