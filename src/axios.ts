import axios from 'axios';
import { useCookie } from '#app';

const api = axios.create({
  baseURL: 'https://localhost:44355/api/',
  timeout: 10000,
});

api.interceptors.request.use((config) => {
  const token = useCookie('token').value;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
