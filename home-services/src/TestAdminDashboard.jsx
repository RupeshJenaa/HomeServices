import React from 'react';
import AdminDashboard from './pages/admin/Dashboard';
import './components/admin/AdminLayout.css';

const TestAdminDashboard = () => {
  return (
    <div style={{ padding: '20px' }}>
      <h1>Test Admin Dashboard</h1>
      <p>This is a test to verify that the admin dashboard components are working correctly.</p>
      <AdminDashboard />
    </div>
  );
};

export default TestAdminDashboard;