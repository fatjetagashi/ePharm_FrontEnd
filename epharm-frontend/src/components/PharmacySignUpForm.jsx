import React, { useState } from 'react';
import { registerPharmacy } from '../services/pharmacyApi';

export default function PharmacySignupForm() {
  const [form, setForm] = useState({
    business_name: '',
    registration_num: '',
    fiscal_num: '',
    owner_id: '',
    primary_activity: '',
    other_activity: '',
    account_name: '',
    password: '',
    password_confirmation: ''
  });
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState('');

  const change = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submit = async (e) => {
    e.preventDefault();
    console.log('⏳ submitting form', form);             // ← add logging
    try {
      const { data } = await registerPharmacy(form);
      console.log('✅ success', data);                   // ← add logging
      setMessage(data.message);
      setErrors({});
    } catch (err) {
      console.error('❌ error', err.response || err);    // ← add logging
      setErrors(
        err.response?.data?.errors || { general: err.response?.data?.message }
      );
    }
  };

  return (
    <form onSubmit={submit}>
      {message && <p className="success">{message}</p>}
      {errors.general && <p className="error">{errors.general}</p>}

      {/* Emri i Biznesit */}
      <label>Emri i Biznesit</label>
      <input
        name="business_name"
        value={form.business_name}        // ← controlled
        onChange={change}
      />
      {errors.business_name && <small>{errors.business_name}</small>}

      <br/><br/>

      {/* Numri Unik Identifikues */}
      <label>Numri Unik Identifikues</label>
      <input
        name="registration_num"
        value={form.registration_num}     // ← controlled
        onChange={change}
      />
      {errors.registration_num && <small>{errors.registration_num}</small>}

      <br/><br/>

      {/* Numri Fiskal */}
      <label>Numri Fiskal</label>
      <input
        name="fiscal_num"
        value={form.fiscal_num}           // ← controlled
        onChange={change}
      />

      <br/><br/>

      {/* ID e Pronarit */}
      <label>ID e Pronarit</label>
      <input
        name="owner_id"
        value={form.owner_id}             // ← controlled
        onChange={change}
      />

      <br/><br/>

      {/* Aktiviteti Kryesor */}
      <label>Aktiviteti Kryesor</label>
      <select
        name="primary_activity"
        value={form.primary_activity}     // ← controlled
        onChange={change}
      >
        <option value="">Zgjidhe</option>
        <option value="01">Farmaci</option>
        <option value="02">Aktivitet Tjeter</option>
      </select>

      <br/><br/>

      {/* Aktivitetet Tjera */}
      <label>Aktivitetet Tjera</label>
      <select
        name="other_activity"
        value={form.other_activity}       // ← controlled
        onChange={change}
      >
        <option value="">Zgjidhe</option>
        <option value="A1">Tjera A1</option>
        <option value="B2">Tjera B2</option>
      </select>

      <br/><br/>

      {/* Your Name */}
      <label>Your Name</label>
      <input
        name="account_name"
        value={form.account_name}         // ← controlled
        onChange={change}
      />
      {errors.account_name && <small>{errors.account_name}</small>}

      <br/><br/>

      {/* Password */}
      <label>Password</label>
      <input
        type="password"
        name="password"
        value={form.password}             // ← controlled
        onChange={change}
      />
      {errors.password && <small>{errors.password}</small>}

      <br/><br/>

      {/* Confirm Password */}
      <label>Confirm Password</label>
      <input
        type="password"
        name="password_confirmation"
        value={form.password_confirmation} // ← controlled
        onChange={change}
      />

      <br/><br/>

      <button type="submit">Sign Up</button>
    </form>
  );
}
