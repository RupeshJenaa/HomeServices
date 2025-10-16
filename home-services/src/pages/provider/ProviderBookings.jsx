import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Header from '../../components/Header';
import './ProviderPages.css';

const ProviderBookings = () => {
  const { user, updateBookingStatusNotification } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const storedBookings = JSON.parse(localStorage.getItem('bookings') || '[]');
    const providerBookings = storedBookings.filter(booking => 
      booking.provider.name.includes('Plumbing') // Simple filter for demo
    );
    setBookings(providerBookings);
  }, []);

  const filteredBookings = bookings.filter(booking => {
    const matchesFilter = filter === 'all' || booking.status === filter;
    const matchesSearch = booking.customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         booking.service.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         booking.address.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const handleStatusUpdate = (bookingId, newStatus) => {
    const updatedBookings = bookings.map(booking =>
      booking.id === bookingId ? { ...booking, status: newStatus } : booking
    );
    setBookings(updatedBookings);
    
    // Update localStorage
    const allBookings = JSON.parse(localStorage.getItem('bookings') || '[]');
    const updatedAllBookings = allBookings.map(booking =>
      booking.id === bookingId ? { ...booking, status: newStatus } : booking
    );
    localStorage.setItem('bookings', JSON.stringify(updatedAllBookings));
    
    // Send notification
    const booking = bookings.find(b => b.id === bookingId);
    if (booking) {
      updateBookingStatusNotification(booking, newStatus);
    }
  };

  const getStatusCount = (status) => {
    return bookings.filter(booking => booking.status === status).length;
  };

  const BookingRow = ({ booking }) => (
    <tr>
      <td>
        <div className="booking-customer">
          <strong>{booking.customer.name}</strong>
          <span>{booking.customer.phone}</span>
          <span>{booking.customer.email}</span>
        </div>
      </td>
      <td>
        <div className="service-info">
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
        <div className="datetime-info">
          <strong>{booking.date}</strong>
          <span>{booking.time}</span>
        </div>
      </td>
      <td>
        <div className="address-info">
          {booking.address}
          {booking.urgency === 'emergency' && (
            <span className="urgency-badge">🚨 Emergency</span>
          )}
        </div>
      </td>
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
                onClick={() => handleStatusUpdate(booking.id, 'confirmed')}
              >
                Accept
              </button>
              <button 
                className="btn-danger btn-sm"
                onClick={() => handleStatusUpdate(booking.id, 'rejected')}
              >
                Decline
              </button>
            </>
          )}
          {booking.status === 'confirmed' && (
            <button 
              className="btn-primary btn-sm"
              onClick={() => handleStatusUpdate(booking.id, 'completed')}
            >
              Mark Complete
            </button>
          )}
          <button className="btn-outline btn-sm">Message</button>
          <button className="btn-secondary btn-sm">Details</button>
        </div>
      </td>
    </tr>
  );

  return (
    <div className="provider-page">
      <Header />
      
      <div className="page-header">
        <div className="header-content">
          <h1>Bookings Management</h1>
          <p>Manage all your service bookings and appointments</p>
        </div>
        <Link to="/provider/dashboard" className="btn-outline">
          ← Back to Dashboard
        </Link>
      </div>

      <div className="page-content">
        {/* Stats Overview */}
        <div className="stats-overview">
          <div className="stat-item">
            <span className="stat-number">{bookings.length}</span>
            <span className="stat-label">Total Bookings</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">{getStatusCount('pending')}</span>
            <span className="stat-label">Pending</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">{getStatusCount('confirmed')}</span>
            <span className="stat-label">Confirmed</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">{getStatusCount('completed')}</span>
            <span className="stat-label">Completed</span>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="filters-section">
          <div className="filter-tabs">
            <button 
              className={`filter-tab ${filter === 'all' ? 'active' : ''}`}
              onClick={() => setFilter('all')}
            >
              All Bookings
            </button>
            <button 
              className={`filter-tab ${filter === 'pending' ? 'active' : ''}`}
              onClick={() => setFilter('pending')}
            >
              Pending ({getStatusCount('pending')})
            </button>
            <button 
              className={`filter-tab ${filter === 'confirmed' ? 'active' : ''}`}
              onClick={() => setFilter('confirmed')}
            >
              Confirmed ({getStatusCount('confirmed')})
            </button>
            <button 
              className={`filter-tab ${filter === 'completed' ? 'active' : ''}`}
              onClick={() => setFilter('completed')}
            >
              Completed ({getStatusCount('completed')})
            </button>
          </div>
          
          <div className="search-box">
            <input
              type="text"
              placeholder="Search by customer, service, or address..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <span className="search-icon">🔍</span>
          </div>
        </div>

        {/* Bookings Table */}
        <div className="table-container">
          <table className="bookings-table">
            <thead>
              <tr>
                <th>Customer</th>
                <th>Service</th>
                <th>Date & Time</th>
                <th>Location</th>
                <th>Price</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredBookings.length > 0 ? (
                filteredBookings.map(booking => (
                  <BookingRow key={booking.id} booking={booking} />
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="no-data">
                    <div className="no-bookings">
                      <p>No bookings found</p>
                      <small>
                        {filter !== 'all' 
                          ? `No ${filter} bookings found` 
                          : 'No bookings available'
                        }
                      </small>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Quick Actions */}
        <div className="quick-actions-section">
          <h3>Quick Actions</h3>
          <div className="action-buttons-grid">
            <button className="action-btn">
              <span className="action-icon">📧</span>
              <span>Message All Pending</span>
            </button>
            <button className="action-btn">
              <span className="action-icon">📊</span>
              <span>Export Bookings</span>
            </button>
            <button className="action-btn">
              <span className="action-icon">⚙️</span>
              <span>Booking Settings</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProviderBookings;