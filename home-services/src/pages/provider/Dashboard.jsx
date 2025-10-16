import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Header from '../../components/Header';
import '../../style/provider/Dashboard.css';


const ProviderDashboard = () => {
  const { 
    user, 
    notifications, 
    unreadCount, 
    markAsRead, 
    markAllAsRead,
    updateBookingStatusNotification
  } = useAuth();
  
  const [activeTab, setActiveTab] = useState('overview');
  const [showNotifications, setShowNotifications] = useState(false);
  const [bookings, setBookings] = useState([]);
  const [providerLocation, setProviderLocation] = useState('');
  const [isLocationSet, setIsLocationSet] = useState(false);
  const [showLocationModal, setShowLocationModal] = useState(false);
  const [serviceAreas, setServiceAreas] = useState([]);

  // Load provider data and location on component mount
  useEffect(() => {
    loadProviderData();
    loadBookings();
  }, []);

  const loadProviderData = () => {
    // Load from localStorage (in real app, this would be from database)
    const providerData = JSON.parse(localStorage.getItem('providerData') || '{}');
    
    if (providerData.location) {
      setProviderLocation(providerData.location);
      setIsLocationSet(true);
    } else {
      // Auto-detect location if not set
      detectLocation();
    }
    
    if (providerData.serviceAreas) {
      setServiceAreas(providerData.serviceAreas);
    }
  };

  const detectLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          
          try {
            // Reverse geocoding to get address
            const address = await reverseGeocode(latitude, longitude);
            setProviderLocation(address);
            setShowLocationModal(true);
          } catch (error) {
            console.error('Geocoding failed:', error);
            setShowLocationModal(true);
          }
        },
        (error) => {
          console.error('Location detection failed:', error);
          setShowLocationModal(true);
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 60000
        }
      );
    } else {
      setShowLocationModal(true);
    }
  };

  const reverseGeocode = async (lat, lng) => {
    // Mock reverse geocoding - in real app, use Google Maps API or similar
    const mockAddresses = [
      "123 Main Street, Downtown, Cityville",
      "456 Oak Avenue, Midtown, Cityville", 
      "789 Pine Road, Uptown, Cityville"
    ];
    
    // Return a mock address based on coordinates
    return new Promise((resolve) => {
      setTimeout(() => {
        const randomAddress = mockAddresses[Math.floor(Math.random() * mockAddresses.length)];
        resolve(randomAddress);
      }, 1000);
    });
  };

  const saveLocationToDatabase = async (location, serviceRadius = 50) => {
    try {
      // In real app, this would be an API call to your backend
      const providerData = {
        id: user?.id,
        name: user?.name,
        email: user?.email,
        location: location,
        serviceRadius: serviceRadius,
        serviceAreas: serviceAreas,
        serviceType: 'Plumbing',
        isOnline: true,
        lastActive: new Date().toISOString(),
        coordinates: {
          lat: 40.7128, // Mock coordinates
          lng: -74.0060
        }
      };

      // Save to localStorage (replace with actual database)
      localStorage.setItem('providerData', JSON.stringify(providerData));
      
      // Also save to a providers collection in localStorage
      const existingProviders = JSON.parse(localStorage.getItem('providers') || '[]');
      const updatedProviders = existingProviders.filter(p => p.id !== user?.id);
      updatedProviders.push(providerData);
      localStorage.setItem('providers', JSON.stringify(updatedProviders));

      setProviderLocation(location);
      setIsLocationSet(true);
      setShowLocationModal(false);
      
      console.log('Provider location saved to database:', providerData);
      
      // Show success message
      alert('Location set successfully! You are now visible to customers in your area.');
      
    } catch (error) {
      console.error('Failed to save location:', error);
      alert('Failed to save location. Please try again.');
    }
  };

  const loadBookings = () => {
    const storedBookings = JSON.parse(localStorage.getItem('bookings') || '[]');
    // Filter bookings for this provider
    const providerBookings = storedBookings.filter(booking => 
      booking.provider.id === user?.id || booking.provider.name.includes(user?.name)
    );
    setBookings(providerBookings);
  };

  // Filter notifications for this provider
  const providerNotifications = notifications.filter(notif => 
    notif.recipient === 'provider' || notif.recipient === user?.id
  );

  const unreadNotifications = providerNotifications.filter(notif => !notif.read);

  // Calculate stats
  const providerStats = {
    totalBookings: bookings.length,
    pendingBookings: bookings.filter(b => b.status === 'pending').length,
    confirmedBookings: bookings.filter(b => b.status === 'confirmed').length,
    completedServices: bookings.filter(b => b.status === 'completed').length,
    monthlyEarnings: `$${bookings
      .filter(b => b.status === 'completed')
      .reduce((total, booking) => {
        const price = parseInt(booking.price.replace(/[^0-9]/g, '')) || 0;
        return total + price;
      }, 0)}`,
    rating: 4.8,
    serviceArea: serviceAreas.length > 0 ? serviceAreas[0] : 'Not set'
  };

  const upcomingBookings = bookings
    .filter(booking => booking.status === 'confirmed' || booking.status === 'pending')
    .slice(0, 5);

  const handleAcceptBooking = (bookingId) => {
    const updatedBookings = bookings.map(booking =>
      booking.id === bookingId ? { ...booking, status: 'confirmed' } : booking
    );
    setBookings(updatedBookings);
    
    // Update localStorage
    const allBookings = JSON.parse(localStorage.getItem('bookings') || '[]');
    const updatedAllBookings = allBookings.map(booking =>
      booking.id === bookingId ? { ...booking, status: 'confirmed' } : booking
    );
    localStorage.setItem('bookings', JSON.stringify(updatedAllBookings));
    
    // Send notification to customer
    const booking = bookings.find(b => b.id === bookingId);
    if (booking) {
      updateBookingStatusNotification(booking, 'accepted');
    }
  };

  const handleRejectBooking = (bookingId) => {
    const updatedBookings = bookings.map(booking =>
      booking.id === bookingId ? { ...booking, status: 'rejected' } : booking
    );
    setBookings(updatedBookings);
    
    // Update localStorage
    const allBookings = JSON.parse(localStorage.getItem('bookings') || '[]');
    const updatedAllBookings = allBookings.map(booking =>
      booking.id === bookingId ? { ...booking, status: 'rejected' } : booking
    );
    localStorage.setItem('bookings', JSON.stringify(updatedAllBookings));
    
    // Send notification to customer
    const booking = bookings.find(b => b.id === bookingId);
    if (booking) {
      updateBookingStatusNotification(booking, 'rejected');
    }
  };

  const handleCompleteBooking = (bookingId) => {
    const updatedBookings = bookings.map(booking =>
      booking.id === bookingId ? { ...booking, status: 'completed' } : booking
    );
    setBookings(updatedBookings);
    
    // Update localStorage
    const allBookings = JSON.parse(localStorage.getItem('bookings') || '[]');
    const updatedAllBookings = allBookings.map(booking =>
      booking.id === bookingId ? { ...booking, status: 'completed' } : booking
    );
    localStorage.setItem('bookings', JSON.stringify(updatedAllBookings));
    
    // Send notification to customer
    const booking = bookings.find(b => b.id === bookingId);
    if (booking) {
      updateBookingStatusNotification(booking, 'completed');
    }
  };

  const LocationSetupModal = () => {
    const [manualLocation, setManualLocation] = useState(providerLocation);
    const [serviceRadius, setServiceRadius] = useState(50);

    const handleAutoDetect = () => {
      detectLocation();
    };

    const handleSaveLocation = () => {
      if (manualLocation.trim()) {
        saveLocationToDatabase(manualLocation, serviceRadius);
      } else {
        alert('Please enter your location');
      }
    };

    return (
      <div className="modal-overlay">
        <div className="location-modal">
          <div className="modal-header">
            <h2>Set Your Service Location</h2>
            <p>Set your location to start receiving booking requests from customers in your area</p>
          </div>

          <div className="modal-content">
            <div className="location-section">
              <h3>📍 Your Detected Location</h3>
              <div className="detected-location">
                <p>{providerLocation || 'Detecting your location...'}</p>
                <button 
                  className="btn-outline btn-sm"
                  onClick={handleAutoDetect}
                >
                  🔄 Detect Again
                </button>
              </div>
            </div>

            <div className="form-group">
              <label>Or Enter Location Manually</label>
              <input
                type="text"
                value={manualLocation}
                onChange={(e) => setManualLocation(e.target.value)}
                placeholder="Enter your service location (e.g., City, State)"
                className="location-input"
              />
            </div>

            <div className="form-group">
              <label>Service Radius (km)</label>
              <select
                value={serviceRadius}
                onChange={(e) => setServiceRadius(parseInt(e.target.value))}
                className="radius-select"
              >
                <option value={25}>25 km</option>
                <option value={50}>50 km</option>
                <option value={100}>100 km</option>
                <option value={150}>150 km</option>
                <option value={200}>200 km</option>
              </select>
              <small>Customers within this radius will see your profile</small>
            </div>

            <div className="service-areas">
              <label>Service Areas (Optional)</label>
              <div className="areas-tags">
                {serviceAreas.map((area, index) => (
                  <span key={index} className="area-tag">
                    {area}
                    <button 
                      onClick={() => setServiceAreas(serviceAreas.filter((_, i) => i !== index))}
                      className="remove-tag"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
              <div className="add-area">
                <input
                  type="text"
                  placeholder="Add specific area (e.g., Downtown, Westside)"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter' && e.target.value.trim()) {
                      setServiceAreas([...serviceAreas, e.target.value.trim()]);
                      e.target.value = '';
                    }
                  }}
                />
                <small>Press Enter to add area</small>
              </div>
            </div>
          </div>

          <div className="modal-actions">
            <button 
              className="btn-primary"
              onClick={handleSaveLocation}
              disabled={!manualLocation.trim()}
            >
              Save Location & Go Online
            </button>
            <p className="info-text">
              ✅ You'll appear in customer searches within your service radius
            </p>
          </div>
        </div>
      </div>
    );
  };

  const StatCard = ({ title, value, icon, color, subtitle, onClick }) => (
    <div className={`stat-card ${onClick ? 'clickable' : ''}`} onClick={onClick}>
      <div className="stat-icon" style={{ backgroundColor: color }}>
        {icon}
      </div>
      <div className="stat-content">
        <h3>{value}</h3>
        <p>{title}</p>
        {subtitle && <span className="stat-subtitle">{subtitle}</span>}
      </div>
    </div>
  );

  const NotificationCard = ({ notification }) => (
    <div 
      className={`notification-card ${notification.read ? 'read' : 'unread'}`}
      onClick={() => markAsRead(notification.id)}
    >
      <div className="notification-header">
        <h4>{notification.title}</h4>
        <span className="notification-time">
          {new Date(notification.timestamp).toLocaleDateString()} • {new Date(notification.timestamp).toLocaleTimeString()}
        </span>
      </div>
      <p className="notification-message">{notification.message}</p>
      {notification.priority === 'high' && (
        <span className="priority-badge emergency">🚨 Emergency</span>
      )}
      {notification.type === 'new_booking' && (
        <div className="notification-actions">
          <button 
            className="btn-success btn-sm"
            onClick={(e) => {
              e.stopPropagation();
              // Handle accept booking
              console.log('Accept booking:', notification.bookingId);
            }}
          >
            Accept
          </button>
          <button 
            className="btn-danger btn-sm"
            onClick={(e) => {
              e.stopPropagation();
              // Handle reject booking
              console.log('Reject booking:', notification.bookingId);
            }}
          >
            Decline
          </button>
        </div>
      )}
    </div>
  );

  const BookingCard = ({ booking }) => (
    <div className="booking-card">
      <div className="booking-header">
        <div className="booking-service">
          <div 
            className="service-icon-small"
            style={{ backgroundColor: `${booking.serviceColor}20`, color: booking.serviceColor }}
          >
            {booking.serviceIcon}
          </div>
          <div>
            <h4>{booking.service}</h4>
            <p className="customer-name">{booking.customer.name}</p>
          </div>
        </div>
        <span className={`status-badge ${booking.status}`}>
          {booking.status}
        </span>
      </div>
      
      <div className="booking-details">
        <div className="detail-item">
          <span className="detail-label">📅 Date & Time:</span>
          <span>{booking.date} at {booking.time}</span>
        </div>
        <div className="detail-item">
          <span className="detail-label">📍 Address:</span>
          <span>{booking.address}</span>
        </div>
        <div className="detail-item">
          <span className="detail-label">💰 Price:</span>
          <span className="price">{booking.price}</span>
        </div>
        {booking.problemDescription && (
          <div className="detail-item">
            <span className="detail-label">📝 Issue:</span>
            <span>{booking.problemDescription}</span>
          </div>
        )}
      </div>
      
      <div className="booking-actions">
        {booking.status === 'pending' && (
          <>
            <button 
              className="btn-success"
              onClick={() => handleAcceptBooking(booking.id)}
            >
              Accept Booking
            </button>
            <button 
              className="btn-danger"
              onClick={() => handleRejectBooking(booking.id)}
            >
              Decline
            </button>
          </>
        )}
        {booking.status === 'confirmed' && (
          <button 
            className="btn-primary"
            onClick={() => handleCompleteBooking(booking.id)}
          >
            Mark Complete
          </button>
        )}
        {booking.status === 'completed' && (
          <span className="completed-badge">✅ Completed</span>
        )}
        {booking.status === 'rejected' && (
          <span className="rejected-badge">❌ Declined</span>
        )}
        <button className="btn-outline">Contact Customer</button>
      </div>
    </div>
  );

  return (
    <div className="provider-dashboard">
      <Header />
      
      {/* Location Setup Modal */}
      {showLocationModal && <LocationSetupModal />}

      {/* Dashboard Header */}
      <div className="dashboard-header">
        <div className="welcome-section">
          <h1>Welcome back, {user?.name}!</h1>
          <p>Manage your services and bookings</p>
          <div className="provider-badge">
            <span className="service-tag">Plumbing Specialist</span>
            <span className="rating-badge">⭐ 4.8/5.0</span>
            {isLocationSet ? (
              <span className="location-badge online">📍 Online in {providerLocation}</span>
            ) : (
              <span className="location-badge offline">📍 Location Not Set</span>
            )}
          </div>
        </div>
        <div className="header-actions">
          <div className="notification-bell">
            <button 
              className="notification-btn"
              onClick={() => setShowNotifications(!showNotifications)}
            >
              🔔
              {unreadCount > 0 && (
                <span className="notification-count">{unreadCount}</span>
              )}
            </button>
            
            {/* Notifications Dropdown */}
            {showNotifications && (
              <div className="notifications-dropdown">
                <div className="notifications-header">
                  <h3>Notifications</h3>
                  <div className="notification-actions">
                    {unreadNotifications.length > 0 && (
                      <button 
                        className="mark-all-read"
                        onClick={markAllAsRead}
                      >
                        Mark all as read
                      </button>
                    )}
                  </div>
                </div>
                <div className="notifications-list">
                  {providerNotifications.length > 0 ? (
                    providerNotifications.slice(0, 5).map(notification => (
                      <NotificationCard key={notification.id} notification={notification} />
                    ))
                  ) : (
                    <p className="no-notifications">No notifications</p>
                  )}
                </div>
                <div className="notifications-footer">
                  <Link to="/provider/notifications">View All Notifications</Link>
                </div>
              </div>
            )}
          </div>
          {!isLocationSet && (
            <button 
              className="btn-warning"
              onClick={() => setShowLocationModal(true)}
            >
              🚨 Set Location
            </button>
          )}
          <Link to="/provider/profile" className="btn-outline">
            View Profile
          </Link>
          <Link to="/provider/schedule" className="btn-primary">
            Manage Schedule
          </Link>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="stats-grid">
        <StatCard
          title="Total Bookings"
          value={providerStats.totalBookings}
          icon="📊"
          color="#4f46e5"
        />
        <StatCard
          title="Pending"
          value={providerStats.pendingBookings}
          icon="⏳"
          color="#f59e0b"
          subtitle="Need action"
        />
        <StatCard
          title="Confirmed"
          value={providerStats.confirmedBookings}
          icon="✅"
          color="#10b981"
        />
        <StatCard
          title="Completed"
          value={providerStats.completedServices}
          icon="💰"
          color="#059669"
        />
        <StatCard
          title="Monthly Earnings"
          value={providerStats.monthlyEarnings}
          icon="💳"
          color="#f97316"
        />
        <StatCard
          title="Service Area"
          value={providerStats.serviceArea}
          icon="📍"
          color="#3b82f6"
          subtitle={isLocationSet ? "Active" : "Not set"}
          onClick={() => setShowLocationModal(true)}
        />
      </div>

      {/* Main Content */}
      <div className="dashboard-content">
        <div className="content-tabs">
          <button 
            className={`tab-btn ${activeTab === 'overview' ? 'active' : ''}`}
            onClick={() => setActiveTab('overview')}
          >
            📊 Overview
          </button>
          <button 
            className={`tab-btn ${activeTab === 'bookings' ? 'active' : ''}`}
            onClick={() => setActiveTab('bookings')}
          >
            📋 Bookings ({bookings.length})
          </button>
          <button 
            className={`tab-btn ${activeTab === 'schedule' ? 'active' : ''}`}
            onClick={() => setActiveTab('schedule')}
          >
            📅 Schedule
          </button>
          <button 
            className={`tab-btn ${activeTab === 'earnings' ? 'active' : ''}`}
            onClick={() => setActiveTab('earnings')}
          >
            💰 Earnings
          </button>
        </div>

        {activeTab === 'overview' && (
          <div className="tab-content">
            {!isLocationSet && (
              <div className="location-warning">
                <div className="warning-content">
                  <span className="warning-icon">🚨</span>
                  <div>
                    <h3>Set Your Location to Get Bookings</h3>
                    <p>You need to set your service location to appear in customer searches</p>
                  </div>
                  <button 
                    className="btn-warning"
                    onClick={() => setShowLocationModal(true)}
                  >
                    Set Location Now
                  </button>
                </div>
              </div>
            )}

            {/* Upcoming Bookings */}
            <div className="content-section">
              <div className="section-header">
                <h2>Upcoming Bookings</h2>
                <Link to="/provider/bookings" className="view-all-link">
                  View All
                </Link>
              </div>
              <div className="bookings-grid">
                {upcomingBookings.length > 0 ? (
                  upcomingBookings.map(booking => (
                    <BookingCard key={booking.id} booking={booking} />
                  ))
                ) : (
                  <div className="no-bookings">
                    <p>No upcoming bookings</p>
                    <small>
                      {isLocationSet 
                        ? "New bookings will appear here when customers book your services" 
                        : "Set your location to start receiving bookings"
                      }
                    </small>
                  </div>
                )}
              </div>
            </div>

            {/* Recent Notifications */}
            <div className="content-section">
              <div className="section-header">
                <h2>Recent Notifications</h2>
                <Link to="/provider/notifications" className="view-all-link">
                  View All
                </Link>
              </div>
              <div className="notifications-preview">
                {providerNotifications.slice(0, 3).map(notification => (
                  <NotificationCard key={notification.id} notification={notification} />
                ))}
                {providerNotifications.length === 0 && (
                  <p className="no-data">No recent notifications</p>
                )}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="content-section">
              <h2>Quick Actions</h2>
              <div className="quick-actions-grid">
                <Link to="/provider/schedule" className="quick-action-card">
                  <div className="action-icon">📅</div>
                  <h4>Manage Schedule</h4>
                  <p>Set your availability and working hours</p>
                </Link>
                <Link to="/provider/services" className="quick-action-card">
                  <div className="action-icon">🔧</div>
                  <h4>My Services</h4>
                  <p>Manage service offerings and prices</p>
                </Link>
                <Link to="/provider/earnings" className="quick-action-card">
                  <div className="action-icon">💰</div>
                  <h4>View Earnings</h4>
                  <p>Check your income and payments</p>
                </Link>
                <button 
                  className="quick-action-card"
                  onClick={() => setShowLocationModal(true)}
                >
                  <div className="action-icon">📍</div>
                  <h4>Update Location</h4>
                  <p>Change your service area</p>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Other tabs remain the same */}
        {activeTab === 'bookings' && (
          <div className="tab-content">
            <div className="content-section">
              <div className="bookings-filters">
                <div className="filter-group">
                  <button className="filter-btn active">All ({bookings.length})</button>
                  <button className="filter-btn">Pending ({providerStats.pendingBookings})</button>
                  <button className="filter-btn">Confirmed ({providerStats.confirmedBookings})</button>
                  <button className="filter-btn">Completed ({providerStats.completedServices})</button>
                </div>
                <div className="search-box">
                  <input type="text" placeholder="Search bookings..." />
                </div>
              </div>
              
              <div className="bookings-table-container">
                <table className="bookings-table">
                  <thead>
                    <tr>
                      <th>Customer</th>
                      <th>Service</th>
                      <th>Date & Time</th>
                      <th>Address</th>
                      <th>Price</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bookings.map(booking => (
                      <tr key={booking.id}>
                        <td>
                          <div className="customer-cell">
                            <strong>{booking.customer.name}</strong>
                            <span>{booking.customer.phone}</span>
                          </div>
                        </td>
                        <td>
                          <div className="service-cell">
                            <span 
                              className="service-icon"
                              style={{ backgroundColor: `${booking.serviceColor}20`, color: booking.serviceColor }}
                            >
                              {booking.serviceIcon}
                            </span>
                            {booking.service}
                          </div>
                        </td>
                        <td>
                          {booking.date}<br/>
                          <small>{booking.time}</small>
                        </td>
                        <td className="address-cell">{booking.address}</td>
                        <td className="price-cell">{booking.price}</td>
                        <td>
                          <span className={`status-badge ${booking.status}`}>
                            {booking.status}
                          </span>
                        </td>
                        <td>
                          <div className="action-buttons">
                            {booking.status === 'pending' && (
                              <>
                                <button 
                                  className="btn-success btn-sm"
                                  onClick={() => handleAcceptBooking(booking.id)}
                                >
                                  Accept
                                </button>
                                <button 
                                  className="btn-danger btn-sm"
                                  onClick={() => handleRejectBooking(booking.id)}
                                >
                                  Decline
                                </button>
                              </>
                            )}
                            {booking.status === 'confirmed' && (
                              <button 
                                className="btn-primary btn-sm"
                                onClick={() => handleCompleteBooking(booking.id)}
                              >
                                Complete
                              </button>
                            )}
                            <button className="btn-outline btn-sm">Contact</button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {bookings.length === 0 && (
                  <div className="no-bookings-message">
                    <p>No bookings found</p>
                    <small>
                      {isLocationSet 
                        ? "Your bookings will appear here when customers book your services" 
                        : "Set your location to start receiving bookings"
                      }
                    </small>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'schedule' && (
          <div className="tab-content">
            <div className="content-section">
              <h2>Your Schedule</h2>
              <div className="schedule-container">
                <p>Schedule management coming soon...</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'earnings' && (
          <div className="tab-content">
            <div className="content-section">
              <h2>Earnings Overview</h2>
              <div className="earnings-container">
                <p>Earnings dashboard coming soon...</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProviderDashboard;