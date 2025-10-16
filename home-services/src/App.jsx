import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Header from './components/Header';
import Footer from './components/Footer';
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

const AppRoutes = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return <Loader />;
  }

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

      {/* Protected routes */}
      <Route
        path="/customer/*"
        element={user?.role === 'customer' ? <CustomerRoutes /> : <Navigate to="/login" />}
      />
      <Route
        path="/provider/*"
        element={user?.role === 'provider' ? <ProviderRoutes /> : <Navigate to="/login" />}
      />
      <Route
        path="/admin/*"
        element={user?.role === 'admin' ? <AdminRoutes /> : <Navigate to="/login" />}
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
        <div className="min-h-screen bg-gray-50">
          <main className="min-h-screen">
            <AppRoutes />
            <Header/>
          </main>
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;