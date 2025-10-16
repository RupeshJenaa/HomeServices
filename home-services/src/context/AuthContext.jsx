import React, { createContext, useState, useContext, useEffect } from 'react';
import { authAPI } from '../api/authAPI';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    if (token) {
      verifyToken();
    } else {
      setLoading(false);
    }
    
    // Load notifications from localStorage
    const storedNotifications = JSON.parse(localStorage.getItem('notifications') || '[]');
    setNotifications(storedNotifications);
  }, [token]);

  const verifyToken = async () => {
    try {
      const userData = JSON.parse(localStorage.getItem('userData'));
      if (userData) {
        setUser(userData);
      }
    } catch (error) {
      console.error('Token verification failed:', error);
      logout();
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    try {
      const data = await authAPI.login(email, password);
      const { token, user } = data;
      
      localStorage.setItem('token', token);
      localStorage.setItem('userData', JSON.stringify(user));
      setToken(token);
      setUser(user);
      
      return { success: true };
    } catch (error) {
      return { 
        success: false, 
        message: error.response?.data?.message || 'Login failed' 
      };
    }
  };

  const register = async (userData) => {
    try {
      const data = await authAPI.register(userData);
      const { token, user } = data;
      
      localStorage.setItem('token', token);
      localStorage.setItem('userData', JSON.stringify(user));
      setToken(token);
      setUser(user);
      
      return { success: true };
    } catch (error) {
      return { 
        success: false, 
        message: error.response?.data?.message || 'Registration failed' 
      };
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userData');
    setToken(null);
    setUser(null);
    setNotifications([]);
  };

  // Notification functions
  const addNotification = (notification) => {
    const newNotification = {
      id: Date.now(),
      timestamp: new Date().toISOString(),
      read: false,
      ...notification
    };
    
    setNotifications(prev => [newNotification, ...prev]);
    
    // Store in localStorage for persistence
    const storedNotifications = JSON.parse(localStorage.getItem('notifications') || '[]');
    localStorage.setItem('notifications', JSON.stringify([newNotification, ...storedNotifications]));
    
    return newNotification;
  };

  const markAsRead = (notificationId) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === notificationId ? { ...notif, read: true } : notif
      )
    );
    
    // Update localStorage
    const storedNotifications = JSON.parse(localStorage.getItem('notifications') || '[]');
    const updatedNotifications = storedNotifications.map(notif =>
      notif.id === notificationId ? { ...notif, read: true } : notif
    );
    localStorage.setItem('notifications', JSON.stringify(updatedNotifications));
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(notif => ({ ...notif, read: true })));
    
    // Update localStorage
    const storedNotifications = JSON.parse(localStorage.getItem('notifications') || '[]');
    const updatedNotifications = storedNotifications.map(notif => ({ ...notif, read: true }));
    localStorage.setItem('notifications', JSON.stringify(updatedNotifications));
  };

  const clearAllNotifications = () => {
    setNotifications([]);
    localStorage.setItem('notifications', '[]');
  };

  // Get notifications for current user
  const getUserNotifications = () => {
    if (!user) return [];
    
    return notifications.filter(notification => 
      notification.recipient === user.role || 
      notification.recipient === 'all' ||
      notification.recipient === user.id
    );
  };

  // Get unread notifications count for current user
  const getUnreadNotificationsCount = () => {
    const userNotifications = getUserNotifications();
    return userNotifications.filter(notif => !notif.read).length;
  };

  // Create a booking notification (to be called when customer books a service)
  const createBookingNotification = (bookingData) => {
    const { customer, provider, service, urgency, bookingId } = bookingData;
    
    const providerNotification = {
      type: 'new_booking',
      title: 'New Booking Request',
      message: `New ${service} booking from ${customer.name}`,
      bookingId: bookingId,
      customerName: customer.name,
      customerPhone: customer.phone,
      serviceType: service,
      priority: urgency === 'emergency' ? 'high' : 'normal',
      recipient: 'provider' // In real app, this would be the specific provider's ID
    };

    addNotification(providerNotification);

    // Also create customer confirmation notification
    const customerNotification = {
      type: 'booking_confirmation',
      title: 'Booking Confirmed',
      message: `Your ${service} booking request has been sent to ${provider.name}`,
      bookingId: bookingId,
      providerName: provider.name,
      serviceType: service,
      recipient: 'customer'
    };

    addNotification(customerNotification);
  };

  // Update booking status notification
  const updateBookingStatusNotification = (bookingData, newStatus) => {
    const { customer, provider, service, bookingId } = bookingData;
    
    let title, message;
    
    switch (newStatus) {
      case 'accepted':
        title = 'Booking Accepted';
        message = `${provider.name} has accepted your ${service} booking`;
        break;
      case 'rejected':
        title = 'Booking Declined';
        message = `${provider.name} is unavailable for your ${service} booking`;
        break;
      case 'completed':
        title = 'Service Completed';
        message = `Your ${service} has been completed by ${provider.name}`;
        break;
      case 'cancelled':
        title = 'Booking Cancelled';
        message = `Your ${service} booking has been cancelled`;
        break;
      default:
        return;
    }

    const notification = {
      type: 'booking_update',
      title,
      message,
      bookingId,
      status: newStatus,
      recipient: 'customer'
    };

    addNotification(notification);
  };

  // Create system notification (for admin announcements, etc.)
  const createSystemNotification = (title, message, priority = 'normal') => {
    const notification = {
      type: 'system',
      title,
      message,
      priority,
      recipient: 'all',
      timestamp: new Date().toISOString()
    };

    addNotification(notification);
  };

  const value = {
    user,
    login,
    register,
    logout,
    loading,
    isAuthenticated: !!user,
    // Notification functions
    notifications: getUserNotifications(),
    unreadCount: getUnreadNotificationsCount(),
    addNotification,
    markAsRead,
    markAllAsRead,
    clearAllNotifications,
    createBookingNotification,
    updateBookingStatusNotification,
    createSystemNotification
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};