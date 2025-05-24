
import axios, { AxiosInstance } from 'axios';

const api: AxiosInstance = axios.create({
    baseURL: 'http://localhost:8000/api', // adjust as needed
    withCredentials: true,
});

export default api;