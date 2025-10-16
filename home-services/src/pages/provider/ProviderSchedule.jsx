import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/Header';
import './ProviderPages.css';

const ProviderSchedule = () => {
  return (
    <div className="provider-page">
      <Header />
      
      <div className="page-header">
        <div className="header-content">
          <h1>Schedule Management</h1>
          <p>Manage your availability and working hours</p>
        </div>
        <Link to="/provider/dashboard" className="btn-outline">
          ← Back to Dashboard
        </Link>
      </div>

      <div className="page-content">
        <div className="content-section">
          <div className="schedule-placeholder">
            <h3>Schedule Management Coming Soon</h3>
            <p>This feature is under development. You'll be able to:</p>
            <ul>
              <li>Set your weekly working hours</li>
              <li>Block unavailable dates</li>
              <li>Manage time off and vacations</li>
              <li>Set automatic booking rules</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProviderSchedule;