import axios from 'axios';

export async function login(email, password) {
  const res = await axios.post('/api/login', { email, password });
  return res.data; // { token, user }
}

export async function logout(token) {
  await axios.post(
    '/api/logout',
    {},
    { headers: { Authorization: `Bearer ${token}` } }
  );
}
