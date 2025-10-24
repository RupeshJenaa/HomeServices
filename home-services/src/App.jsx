import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Loader from './components/Loader';
import './App.css';
// Auth pages
import Login from './pages/auth/Login';
import Signup from './pages/auth/Signup';
import ForgotPassword from './pages/auth/ForgotPassword';

// Route components
import CustomerRoutes from './routes/CustomerRoutes';
import ProviderRoutes from './routes/ProviderRoutes';
import AdminRoutes from './routes/AdminRoutes';

// Admin Layout
import AdminLayout from './components/admin/AdminLayout';

// Dashboard and Service pages
import CustomerDashboard from './pages/customer/Dashboard';

// Service Pages - Make sure these files exist with default exports
import PlumbingServices from './pages/services/PlumbingServices';
import ElectricalServices from './pages/services/ElectricalServices';
import CleaningServices from './pages/services/CleaningServices';
import ACRepairServices from './pages/services/ACRepairServices';
import PaintingServices from './pages/services/PaintingServices';
import CarpentryServices from './pages/services/CarpentryServices';
import PestControlServices from './pages/services/PestControlServices';
import ApplianceRepairServices from './pages/services/ApplianceRepairServices';
import AllServices from './pages/services/AllServices';

// No test components needed

const AppRoutes = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return <Loader />;
  }

  // Authentication state management
  const isAdminBypass = true; // Temporarily enabling for development

  return (
    <Routes>
      {/* Public routes */}
      <Route
        path="/login"
        element={!user ? <Login /> : <Navigate to={`/${user.role}/dashboard`} />}
      />
      <Route
        path="/signup"
        element={!user ? <Signup /> : <Navigate to={`/${user.role}/dashboard`} />}
      />
      <Route path="/forgot-password" element={<ForgotPassword />} />

      {/* Service Pages - Public Access */}
      <Route path="/services" element={<AllServices />} />
      <Route path="/services/plumbing" element={<PlumbingServices />} />
      <Route path="/services/electrical" element={<ElectricalServices />} />
      <Route path="/services/cleaning" element={<CleaningServices />} />
      <Route path="/services/ac-repair" element={<ACRepairServices />} />
      <Route path="/services/painting" element={<PaintingServices />} />
      <Route path="/services/carpentry" element={<CarpentryServices />} />
      <Route path="/services/pest-control" element={<PestControlServices />} />
      <Route path="/services/appliance-repair" element={<ApplianceRepairServices />} />

      {/* Protected routes start here */}

      {/* Protected routes */}
      <Route
        path="/customer/*"
        element={user?.role === 'customer' ? <CustomerRoutes /> : <Navigate to="/login" />}
      />
      <Route
        path="/provider/*"
        element={user?.role === 'provider' ? <ProviderRoutes /> : <Navigate to="/login" />}
      />
      {/* Modified admin route to bypass authentication during development */}
      <Route
        path="/admin/*"
        element={isAdminBypass || user?.role === 'admin' ? <AdminLayout><AdminRoutes /></AdminLayout> : <Navigate to="/login" />}
      />

      {/* Default route */}
      <Route
        path="/"
        element={
          user ? (
            <Navigate to={`/${user.role}/dashboard`} replace />
          ) : (
            <CustomerDashboard />
          )
        }
      />

      {/* Fallback route */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="app-container">
          <main className="main-content">
            <AppRoutes />
          </main>
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;