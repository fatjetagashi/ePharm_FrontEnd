import React, { useState } from 'react'
import axios from 'axios'
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'

export default function SignupForm({ onCodeSent, onSwitchToLogin }) {
  const [form, setForm] = useState({
    name: '',
    email: '',
    username: '',
    password: '',
    password_confirmation: '',
    user_type: 'patient',
    tenant_id: '',
  })
  const [phone, setPhone] = useState('')

  const handleChange = e =>
    setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async e => {
    e.preventDefault()
    try {
      const payload = { ...form, phone: `+${phone}` }
      const res = await axios.post('/register', payload)
      onCodeSent(res.data.user_id)
    } catch (err) {
      console.error(err)
      alert(err.response?.data?.message || 'Registration failed')
    }
  }

  return (
    <div className="max-w-md mx-auto mt-12 bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-6 text-center">Sign Up</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Name"
          required
          className="w-full px-3 py-2 border rounded focus:outline-none focus:ring"
        />
        <input
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Email"
          required
          className="w-full px-3 py-2 border rounded focus:outline-none focus:ring"
        />
        <input
          name="username"
          value={form.username}
          onChange={handleChange}
          placeholder="Username"
          required
          className="w-full px-3 py-2 border rounded focus:outline-none focus:ring"
        />
        <input
          name="password"
          type="password"
          value={form.password}
          onChange={handleChange}
          placeholder="Password"
          required
          className="w-full px-3 py-2 border rounded focus:outline-none focus:ring"
        />
        <input
          name="password_confirmation"
          type="password"
          value={form.password_confirmation}
          onChange={handleChange}
          placeholder="Confirm Password"
          required
          className="w-full px-3 py-2 border rounded focus:outline-none focus:ring"
        />

        <label className="block">Phone</label>
        <PhoneInput
          country={'us'}
          value={phone}
          onChange={setPhone}
          enableSearch
          specialLabel={''}
          inputProps={{
            name: 'phone',
            required: true
          }}
          containerClass="w-full"
          inputClass="w-full px-3 py-2 border rounded focus:outline-none focus:ring"
        />

        <div className="flex space-x-4">
          <div className="flex-1">
            <label className="block mb-1">User Type</label>
            <select
              name="user_type"
              value={form.user_type}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring"
            >
              <option value="patient">Patient</option>
              <option value="doctor">Doctor</option>
              <option value="pharmacist">Pharmacist</option>
            </select>
          </div>

          <div className="flex-1">
            <label className="block mb-1">Tenant ID</label>
            <input
              name="tenant_id"
              value={form.tenant_id}
              onChange={handleChange}
              placeholder="Tenant ID"
              required
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring"
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded"
        >
          Register
        </button>
      </form>

      <p className="mt-4 text-center text-sm text-gray-600">
        Already have an account?{' '}
        <button
          onClick={onSwitchToLogin}
          className="text-blue-600 hover:underline"
        >
          Log In
        </button>
      </p>
    </div>
  )
}
