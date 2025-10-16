export const customerAPI = {
  getServices: async (filters = {}) => {
    const response = await api.get('/customer/services', { params: filters });
    return response.data;
  },

  bookService: async (bookingData) => {
    const response = await api.post('/customer/bookings', bookingData);
    return response.data;
  },

  getBookings: async () => {
    const response = await api.get('/customer/bookings');
    return response.data;
  },

  cancelBooking: async (bookingId) => {
    const response = await api.put(`/customer/bookings/${bookingId}/cancel`);
    return response.data;
  },

  addToFavorites: async (serviceId) => {
    const response = await api.post('/customer/favorites', { serviceId });
    return response.data;
  },

  getFavorites: async () => {
    const response = await api.get('/customer/favorites');
    return response.data;
  }
};