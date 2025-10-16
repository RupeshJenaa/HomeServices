import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Header from '../../components/Header';
import './ProviderPages.css';

const ProviderProfile = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');
  const [profileData, setProfileData] = useState({
    name: user?.name || 'Mike Plumber',
    email: user?.email || 'mike@example.com',
    phone: '+1 (555) 123-4567',
    address: '123 Plumbing St, Service City',
    bio: 'Professional plumber with 8 years of experience specializing in emergency repairs and installations.',
    services: ['Leak Repair', 'Pipe Installation', 'Drain Cleaning', 'Water Heater'],
    experience: '8 years',
    hourlyRate: '$90',
    responseTime: '30 minutes',
    certification: 'Licensed Plumber #PL12345'
  });

  const [isEditing, setIsEditing] = useState(false);

  const handleSave = () => {
    // In real app, this would save to backend
    setIsEditing(false);
    alert('Profile updated successfully!');
  };

  return (
    <div className="provider-page">
      <Header />
      
      <div className="page-header">
        <div className="header-content">
          <h1>My Profile</h1>
          <p>Manage your professional profile and settings</p>
        </div>
        <Link to="/provider/dashboard" className="btn-outline">
          ← Back to Dashboard
        </Link>
      </div>

      <div className="page-content">
        <div className="profile-layout">
          {/* Sidebar */}
          <div className="profile-sidebar">
            <div className="profile-card">
              <div className="profile-avatar">
                <div className="avatar-placeholder">👨‍🔧</div>
              </div>
              <div className="profile-info">
                <h2>{profileData.name}</h2>
                <p className="profile-title">Professional Plumber</p>
                <div className="rating">
                  <span className="stars">⭐ 4.8</span>
                  <span className="reviews">(127 reviews)</span>
                </div>
              </div>
              <div className="profile-stats">
                <div className="stat">
                  <strong>89%</strong>
                  <span>Response Rate</span>
                </div>
                <div className="stat">
                  <strong>30min</strong>
                  <span>Avg. Response</span>
                </div>
              </div>
            </div>

            <nav className="profile-nav">
              <button 
                className={`nav-item ${activeTab === 'profile' ? 'active' : ''}`}
                onClick={() => setActiveTab('profile')}
              >
                👤 Personal Info
              </button>
              <button 
                className={`nav-item ${activeTab === 'services' ? 'active' : ''}`}
                onClick={() => setActiveTab('services')}
              >
                🔧 Services & Pricing
              </button>
              <button 
                className={`nav-item ${activeTab === 'availability' ? 'active' : ''}`}
                onClick={() => setActiveTab('availability')}
              >
                📅 Availability
              </button>
              <button 
                className={`nav-item ${activeTab === 'settings' ? 'active' : ''}`}
                onClick={() => setActiveTab('settings')}
              >
                ⚙️ Settings
              </button>
            </nav>
          </div>

          {/* Main Content */}
          <div className="profile-content">
            {activeTab === 'profile' && (
              <div className="tab-panel">
                <div className="panel-header">
                  <h2>Personal Information</h2>
                  <button 
                    className={`btn-${isEditing ? 'secondary' : 'outline'}`}
                    onClick={() => setIsEditing(!isEditing)}
                  >
                    {isEditing ? 'Cancel' : 'Edit Profile'}
                  </button>
                </div>

                <div className="form-grid">
                  <div className="form-group">
                    <label>Full Name</label>
                    <input
                      type="text"
                      value={profileData.name}
                      onChange={(e) => setProfileData({...profileData, name: e.target.value})}
                      disabled={!isEditing}
                    />
                  </div>
                  <div className="form-group">
                    <label>Email Address</label>
                    <input
                      type="email"
                      value={profileData.email}
                      onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                      disabled={!isEditing}
                    />
                  </div>
                  <div className="form-group">
                    <label>Phone Number</label>
                    <input
                      type="tel"
                      value={profileData.phone}
                      onChange={(e) => setProfileData({...profileData, phone: e.target.value})}
                      disabled={!isEditing}
                    />
                  </div>
                  <div className="form-group">
                    <label>Address</label>
                    <input
                      type="text"
                      value={profileData.address}
                      onChange={(e) => setProfileData({...profileData, address: e.target.value})}
                      disabled={!isEditing}
                    />
                  </div>
                  <div className="form-group full-width">
                    <label>Professional Bio</label>
                    <textarea
                      value={profileData.bio}
                      onChange={(e) => setProfileData({...profileData, bio: e.target.value})}
                      disabled={!isEditing}
                      rows="4"
                    />
                  </div>
                  <div className="form-group">
                    <label>Years of Experience</label>
                    <input
                      type="text"
                      value={profileData.experience}
                      onChange={(e) => setProfileData({...profileData, experience: e.target.value})}
                      disabled={!isEditing}
                    />
                  </div>
                  <div className="form-group">
                    <label>Certification/License</label>
                    <input
                      type="text"
                      value={profileData.certification}
                      onChange={(e) => setProfileData({...profileData, certification: e.target.value})}
                      disabled={!isEditing}
                    />
                  </div>
                </div>

                {isEditing && (
                  <div className="form-actions">
                    <button className="btn-primary" onClick={handleSave}>
                      Save Changes
                    </button>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'services' && (
              <div className="tab-panel">
                <h2>Services & Pricing</h2>
                <p>Manage the services you offer and your pricing structure.</p>
                {/* Services management content */}
              </div>
            )}

            {activeTab === 'availability' && (
              <div className="tab-panel">
                <h2>Availability Schedule</h2>
                <p>Set your working hours and availability for bookings.</p>
                {/* Availability management content */}
              </div>
            )}

            {activeTab === 'settings' && (
              <div className="tab-panel">
                <h2>Account Settings</h2>
                <p>Manage your account preferences and notification settings.</p>
                {/* Settings content */}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProviderProfile;