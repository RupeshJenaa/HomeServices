import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ProviderDashboard from '../pages/provider/Dashboard';
import ProviderBookings from '../pages/provider/ProviderBookings';
import ProviderNotifications from '../pages/provider/ProviderNotifications';
import ProviderProfile from '../pages/provider/ProviderProfile';
import ProviderSchedule from '../pages/provider/ProviderSchedule';

const ProviderRoutes = () => {
  return (
    <Routes>
      <Route path="/dashboard" element={<ProviderDashboard />} />
      <Route path="/bookings" element={<ProviderBookings />} />
      <Route path="/notifications" element={<ProviderNotifications />} />
      <Route path="/profile" element={<ProviderProfile />} />
      <Route path="/schedule" element={<ProviderSchedule />} />
      <Route path="*" element={<ProviderDashboard />} />
    </Routes>
  );
};

export default ProviderRoutes;