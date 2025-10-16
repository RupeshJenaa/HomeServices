import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Dashboard from '../pages/admin/Dashboard';

const AdminRoutes = () => {
  return (
    <Routes>
      <Route path="dashboard" element={<Dashboard />} />
      <Route path="users" element={<div>Users Management - Coming Soon</div>} />
      <Route path="providers" element={<div>Providers Management - Coming Soon</div>} />
      <Route path="bookings" element={<div>Bookings Management - Coming Soon</div>} />
      <Route path="reports" element={<div>Reports - Coming Soon</div>} />
    </Routes>
  );
};

export default AdminRoutes;