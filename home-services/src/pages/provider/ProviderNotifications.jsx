import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Header from '../../components/Header';
import './ProviderPages.css';

const ProviderNotifications = () => {
  const { 
    notifications, 
    unreadCount, 
    markAsRead, 
    markAllAsRead, 
    clearAllNotifications 
  } = useAuth();

  const providerNotifications = notifications.filter(notif => 
    notif.recipient === 'provider' || notif.recipient === 'all'
  );

  const unreadNotifications = providerNotifications.filter(notif => !notif.read);

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'new_booking':
        return '📋';
      case 'booking_update':
        return '🔄';
      case 'system':
        return '📢';
      case 'payment':
        return '💰';
      default:
        return '🔔';
    }
  };

  const NotificationItem = ({ notification }) => (
    <div 
      className={`notification-item ${notification.read ? 'read' : 'unread'}`}
      onClick={() => markAsRead(notification.id)}
    >
      <div className="notification-icon">
        {getNotificationIcon(notification.type)}
      </div>
      <div className="notification-content">
        <div className="notification-header">
          <h4>{notification.title}</h4>
          <span className="notification-time">
            {new Date(notification.timestamp).toLocaleDateString()} • {new Date(notification.timestamp).toLocaleTimeString()}
          </span>
        </div>
        <p className="notification-message">{notification.message}</p>
        <div className="notification-meta">
          {notification.priority === 'high' && (
            <span className="priority-tag emergency">Emergency</span>
          )}
          {notification.type === 'new_booking' && (
            <span className="type-tag booking">New Booking</span>
          )}
        </div>
      </div>
      {!notification.read && (
        <div className="unread-dot"></div>
      )}
    </div>
  );

  return (
    <div className="provider-page">
      <Header />
      
      <div className="page-header">
        <div className="header-content">
          <h1>Notifications</h1>
          <p>Stay updated with your bookings and system alerts</p>
        </div>
        <Link to="/provider/dashboard" className="btn-outline">
          ← Back to Dashboard
        </Link>
      </div>

      <div className="page-content">
        {/* Notifications Header */}
        <div className="notifications-header">
          <div className="notifications-stats">
            <span className="stat">
              Total: <strong>{providerNotifications.length}</strong>
            </span>
            <span className="stat">
              Unread: <strong className="unread-count">{unreadCount}</strong>
            </span>
          </div>
          <div className="notifications-actions">
            {unreadCount > 0 && (
              <button 
                className="btn-secondary"
                onClick={markAllAsRead}
              >
                Mark All as Read
              </button>
            )}
            <button 
              className="btn-danger"
              onClick={clearAllNotifications}
              disabled={providerNotifications.length === 0}
            >
              Clear All
            </button>
          </div>
        </div>

        {/* Notifications List */}
        <div className="notifications-list">
          {providerNotifications.length > 0 ? (
            providerNotifications.map(notification => (
              <NotificationItem key={notification.id} notification={notification} />
            ))
          ) : (
            <div className="empty-state">
              <div className="empty-icon">🔔</div>
              <h3>No Notifications</h3>
              <p>You're all caught up! New notifications will appear here.</p>
            </div>
          )}
        </div>

        {/* Notification Types Info */}
        <div className="notification-types-info">
          <h4>Notification Types</h4>
          <div className="type-cards">
            <div className="type-card">
              <span className="type-icon">📋</span>
              <div>
                <strong>New Bookings</strong>
                <p>When customers book your services</p>
              </div>
            </div>
            <div className="type-card">
              <span className="type-icon">🔄</span>
              <div>
                <strong>Booking Updates</strong>
                <p>Changes to existing bookings</p>
              </div>
            </div>
            <div className="type-card">
              <span className="type-icon">📢</span>
              <div>
                <strong>System Alerts</strong>
                <p>Important platform updates</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProviderNotifications;