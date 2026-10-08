import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to automatically inject JWT token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('portfolio_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for unified error messages
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Don't auto-redirect on login failure itself
      if (!error.config.url.includes('/auth/login')) {
        localStorage.removeItem('portfolio_token');
        localStorage.removeItem('portfolio_user');
      }
    }
    return Promise.reject(error);
  }
);

export default api;
