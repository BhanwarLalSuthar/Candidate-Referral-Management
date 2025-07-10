import axios from 'axios';

const API_BASE = "https://candidate-referral-management-1.onrender.com" ;
console.log(API_BASE)

// Create axios instance
const api = axios.create({
  baseURL: API_BASE,
});

// Attach token interceptor
api.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth endpoints
const register = (userData) => api.post('/auth/register', userData);
const login = (credentials) => api.post('/auth/login', credentials);

// Candidate endpoints
const getAll = () => api.get('/candidates');
const search = (params) => api.get('/candidates/search', { params });
const create = (formData) => api.post('/candidates', formData, {
  headers: { 'Content-Type': 'multipart/form-data' }
});
const updateStatus = (id, status) => api.put(`/candidates/${id}/status`, { status });
const remove = (id) => api.delete(`/candidates/${id}`);

export default {
  register,
  login,
  getAll,
  search,
  create,
  updateStatus,
  remove,
};