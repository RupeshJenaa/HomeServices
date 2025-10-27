import React from 'react';
import { Route } from 'react-router-dom';
import Dashboard from '../pages/admin/Dashboard';
import UsersManagement from '../pages/admin/UsersManagement';
import ProvidersManagement from '../pages/admin/ProvidersManagement';
import BookingsManagement from '../pages/admin/BookingsManagement';
import ReportsAnalytics from '../pages/admin/ReportsAnalytics';

// Export a JSX fragment of <Route/> children (NOT a component). This allows
// including the fragment directly as children of a parent <Route> so the
// router sees real <Route> elements and can render them into the parent's Outlet.
const AdminRoutes = (
  <>
    <Route index element={<Dashboard />} />
    <Route path="dashboard" element={<Dashboard />} />
    <Route path="users" element={<UsersManagement />} />
    <Route path="providers" element={<ProvidersManagement />} />
    <Route path="bookings" element={<BookingsManagement />} />
    <Route path="reports" element={<ReportsAnalytics />} />
  </>
);

export default AdminRoutes;