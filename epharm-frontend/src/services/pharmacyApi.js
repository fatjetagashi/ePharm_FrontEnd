import axios from 'axios';

export function registerPharmacy(payload) {
  return axios.post('/api/pharmacies/register', payload);
}
