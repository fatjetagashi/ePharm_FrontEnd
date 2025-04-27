// src/setupAxios.js
import axios from 'axios';

// point all calls to your Laravel API
axios.defaults.baseURL = 'http://127.0.0.1:8000/api';
axios.defaults.withCredentials = true;
export default axios;

// tell Laravel you expect JSON
axios.defaults.headers.common['Accept'] = 'application/json';
