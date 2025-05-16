import axios from 'axios';

// Create Axios instance
const api = axios.create({
    baseURL: 'http://localhost:8000/api', // Replace with your real backend URL
    withCredentials: true, // If using cookies for auth
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
    },
});

// Optional: Add a request interceptor to attach token
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token'); // or use auth context
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default api;
