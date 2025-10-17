import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Header.css';

const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="main-header">
      <div className="header-container">
        <div className="logo">
          <Link to="/">
            <h2>HomeServices</h2>
          </Link>
        </div>
        <nav className="navigation">
          <Link to="/">Home</Link>
          <Link to="/services">Services</Link>
        </nav>
        <div className="header-actions">
          {user ? (
            <div className="user-menu">
              <span>Welcome, {user.name}</span>
              <Link to={`/${user.role}/dashboard`}>Dashboard</Link>
              <button onClick={handleLogout} className="logout-btn">
                Logout
              </button>
            </div>
          ) : (
            <div className="auth-buttons">
              <Link to="/login" className="login-btn">
                Login
              </Link>
              <Link to="/signup" className="register-btn">
                Sign up
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;