import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Dashboard from '../pages/customer/Dashboard';
import Services from '../pages/customer/Services';
import Booking from '../pages/customer/Booking';
import BookingHistory from '../pages/customer/BookingHistory';
import Favorites from '../pages/customer/Favorites';
import Chat from '../pages/customer/Chat';

const CustomerRoutes = () => {
  return (
    <Routes>
      <Route path="dashboard" element={<Dashboard />} />
      <Route path="services" element={<Services />} />
      <Route path="booking" element={<Booking />} />
      <Route path="bookings" element={<BookingHistory />} />
      <Route path="favorites" element={<Favorites />} />
      <Route path="chat" element={<Chat />} />
    </Routes>
  );
};

export default CustomerRoutes;