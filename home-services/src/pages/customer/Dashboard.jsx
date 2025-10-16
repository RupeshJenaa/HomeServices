import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Header from '../../components/Header';
import HeroSlider from '../../components/HeroSlider';
import LocationSearchBar from '../../components/LocationSearchBar';
import ServiceIconsGrid from '../../components/ServiceIconsGrid';
import '../../style/customer/Dashboard.css';

const CustomerDashboard = () => {
  const { user } = useAuth();
  const [upcomingServices, setUpcomingServices] = useState([]);
  const [recentBookings, setRecentBookings] = useState([]);
  const [serviceStats, setServiceStats] = useState({
    totalBookings: 0,
    pendingServices: 0,
    completedServices: 0
  });

  useEffect(() => {
    setUpcomingServices([
      {
        id: 1,
        service: 'Plumbing Repair',
        professional: 'John Smith',
        date: '2024-01-15',
        time: '10:00 AM',
        status: 'confirmed'
      },
      {
        id: 2,
        service: 'AC Maintenance',
        professional: 'Mike Johnson',
        date: '2024-01-18',
        time: '2:00 PM',
        status: 'scheduled'
      }
    ]);

    setRecentBookings([
      {
        id: 1,
        service: 'Electrical Wiring',
        date: '2024-01-10',
        amount: '$120',
        status: 'completed'
      },
      {
        id: 2,
        service: 'Carpet Cleaning',
        date: '2024-01-08',
        amount: '$85',
        status: 'completed'
      }
    ]);

    setServiceStats({
      totalBookings: 12,
      pendingServices: 2,
      completedServices: 10
    });
  }, []);

  const StatCard = ({ title, value, icon, color }) => (
    <div className="stat-card">
      <div className="stat-icon" style={{ backgroundColor: color }}>
        {icon}
      </div>
      <div className="stat-content">
        <h3>{value}</h3>
        <p>{title}</p>
      </div>
    </div>
  );

  const ServiceCard = ({ service, date, time, professional, status }) => (
    <div className="service-card">
      <div className="service-header">
        <h4>{service}</h4>
        <span className={`status-badge ${status}`}>{status}</span>
      </div>
      <div className="service-details">
        <p><strong>Professional:</strong> {professional}</p>
        <p><strong>Date:</strong> {date} at {time}</p>
      </div>
      <div className="service-actions">
        <button className="btn-primary">View Details</button>
        <button className="btn-secondary">Reschedule</button>
      </div>
    </div>
  );

  return (
    <div className="customer-dashboard">
      <Header />
      
      <div className="location-search-section">
        <div className="container">
          <LocationSearchBar />
        </div>
      </div>

      <div className="hero-slider-section">
        <HeroSlider />
      </div>

      <div className="services-icons-section">
        <div className="container">
          <div className="section-header">
            <h2>Popular Services</h2>
            <p>Choose from our wide range of professional services</p>
          </div>
          <ServiceIconsGrid />
        </div>
      </div>

      <div className="dashboard-main-content">
        <div className="container">
          <div className="dashboard-header">
            <div className="welcome-section">
              <h1>Welcome back, {user?.name || 'Customer'}!</h1>
              <p>Here's what's happening with your home services</p>
            </div>
            <Link to="/book-service" className="btn-primary">
              Book New Service
            </Link>
          </div>

          <div className="stats-grid">
            <StatCard
              title="Total Bookings"
              value={serviceStats.totalBookings}
              icon="📊"
              color="#4f46e5"
            />
            <StatCard
              title="Pending Services"
              value={serviceStats.pendingServices}
              icon="⏳"
              color="#f59e0b"
            />
            <StatCard
              title="Completed Services"
              value={serviceStats.completedServices}
              icon="✅"
              color="#10b981"
            />
            <StatCard
              title="Loyalty Points"
              value="250"
              icon="⭐"
              color="#f97316"
            />
          </div>

          <div className="dashboard-content">
            <div className="content-section">
              <div className="section-header">
                <h2>Upcoming Services</h2>
                <Link to="/my-bookings" className="view-all-link">
                  View All
                </Link>
              </div>
              <div className="services-grid">
                {upcomingServices.map(service => (
                  <ServiceCard
                    key={service.id}
                    service={service.service}
                    professional={service.professional}
                    date={service.date}
                    time={service.time}
                    status={service.status}
                  />
                ))}
              </div>
            </div>

            <div className="content-section">
              <h2>Quick Actions</h2>
              <div className="quick-actions-grid">
                <Link to="/book-service" className="quick-action-card">
                  <div className="action-icon">🔧</div>
                  <h4>Book Service</h4>
                  <p>Schedule a new home service</p>
                </Link>
                <Link to="/my-bookings" className="quick-action-card">
                  <div className="action-icon">📋</div>
                  <h4>My Bookings</h4>
                  <p>View all your bookings</p>
                </Link>
                <Link to="/service-history" className="quick-action-card">
                  <div className="action-icon">📊</div>
                  <h4>Service History</h4>
                  <p>Past services and reviews</p>
                </Link>
                <Link to="/payment-methods" className="quick-action-card">
                  <div className="action-icon">💳</div>
                  <h4>Payment Methods</h4>
                  <p>Manage your payments</p>
                </Link>
              </div>
            </div>

            <div className="content-section">
              <div className="section-header">
                <h2>Recent Bookings</h2>
                <Link to="/service-history" className="view-all-link">
                  View History
                </Link>
              </div>
              <div className="bookings-table">
                <table>
                  <thead>
                    <tr>
                      <th>Service</th>
                      <th>Date</th>
                      <th>Amount</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentBookings.map(booking => (
                      <tr key={booking.id}>
                        <td>{booking.service}</td>
                        <td>{booking.date}</td>
                        <td>{booking.amount}</td>
                        <td>
                          <span className={`status-badge ${booking.status}`}>
                            {booking.status}
                          </span>
                        </td>
                        <td>
                          <button className="btn-outline">View Details</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerDashboard;