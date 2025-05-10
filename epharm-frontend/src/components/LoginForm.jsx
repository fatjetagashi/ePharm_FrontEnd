import React, {useState} from 'react';
import {login} from '../services/auth';

export default function LoginForm({onLogin}){
  const [email,setEmail]=useState('');
  const [password,setPassword]=useState('');
  const [error,setError]=useState('');

  const submit=async e=>{
    e.preventDefault();
    try{
      const {token,user}=await login(email,password);
      onLogin(token,user);
    }catch(err){
      setError(err.response?.data?.message||'Login failed');
    }
  };

  return (
    <form onSubmit={submit}>
      {error && <p className="error">{error}</p>}
      <label>Email</label>
      <input type="email" value={email} onChange={e=>setEmail(e.target.value)}/>
      <label>Password</label>
      <input type="password" value={password} onChange={e=>setPassword(e.target.value)}/>
      <button type="submit">Login</button>
    </form>
  );
}
