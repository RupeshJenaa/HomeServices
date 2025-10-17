import axios from 'axios';

const API_URL = 'http://localhost:8080/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const adminAPI = {
  // User management
  getUsers: async (params = {}) => {
    const response = await api.get('/admin/users', { params });
    return response.data;
  },

  updateUserStatus: async (userId, isActive) => {
    const response = await api.put(`/admin/users/${userId}/status`, { isActive });
    return response.data;
  },

  // Provider management
  getProviders: async (params = {}) => {
    const response = await api.get('/admin/providers', { params });
    return response.data;
  },

  approveProvider: async (providerId, isApproved) => {
    const response = await api.put(`/admin/providers/${providerId}/approve`, { isApproved });
    return response.data;
  },

  // Booking management
  getBookings: async (params = {}) => {
    const response = await api.get('/admin/bookings', { params });
    return response.data;
  },

  // Reports and analytics
  getReports: async (params = {}) => {
    const response = await api.get('/admin/reports', { params });
    return response.data;
  },
};