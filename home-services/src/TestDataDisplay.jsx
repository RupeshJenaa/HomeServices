import React from 'react';
import AdminDashboard from './pages/admin/Dashboard';
import UsersManagement from './pages/admin/UsersManagement';
import ProvidersManagement from './pages/admin/ProvidersManagement';
import BookingsManagement from './pages/admin/BookingsManagement';
import ReportsAnalytics from './pages/admin/ReportsAnalytics';

const TestDataDisplay = () => {
  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>Test Data Display</h1>
      
      <div style={{ marginBottom: '40px' }}>
        <h2>Admin Dashboard</h2>
        <AdminDashboard />
      </div>
      
      <div style={{ marginBottom: '40px' }}>
        <h2>Users Management</h2>
        <UsersManagement />
      </div>
      
      <div style={{ marginBottom: '40px' }}>
        <h2>Providers Management</h2>
        <ProvidersManagement />
      </div>
      
      <div style={{ marginBottom: '40px' }}>
        <h2>Bookings Management</h2>
        <BookingsManagement />
      </div>
      
      <div style={{ marginBottom: '40px' }}>
        <h2>Reports & Analytics</h2>
        <ReportsAnalytics />
      </div>
    </div>
  );
};

export default TestDataDisplay;