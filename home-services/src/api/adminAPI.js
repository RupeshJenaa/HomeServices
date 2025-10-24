import axios from 'axios';

const API_URL = '/api';

// Create a shared axios instance
export const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true
});

// Add response interceptor for debugging
api.interceptors.response.use(
  (response) => {
    console.log(`API Response [${response.config.url}]:`, response.data);
    return response;
  },
  (error) => {
    console.error(`API Error [${error.config?.url}]:`, {
      status: error.response?.status,
      data: error.response?.data,
      headers: error.response?.headers
    });
    return Promise.reject(error);
  }
);

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  } else {
    console.warn('No token found in localStorage');
  }
  return config;
}, (error) => {
  console.error('Request interceptor error:', error);
  return Promise.reject(error);
});

export const adminAPI = {
  // User management
  getUsers: async (params = {}) => {
    try {
      console.log('Fetching users with params:', params);
      const response = await api.get('/admin/users', { params });
      console.log('Users API response:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching users:', error.response?.data || error.message);
      throw error;
    }
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