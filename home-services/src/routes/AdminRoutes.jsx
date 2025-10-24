import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Dashboard from '../pages/admin/Dashboard';
import UsersManagement from '../pages/admin/UsersManagement';
import ProvidersManagement from '../pages/admin/ProvidersManagement';
import BookingsManagement from '../pages/admin/BookingsManagement';
import ReportsAnalytics from '../pages/admin/ReportsAnalytics';

const AdminRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/users" element={<UsersManagement />} />
      <Route path="/providers" element={<ProvidersManagement />} />
      <Route path="/bookings" element={<BookingsManagement />} />
      <Route path="/reports" element={<ReportsAnalytics />} />
    </Routes>
  );
};

export default AdminRoutes;