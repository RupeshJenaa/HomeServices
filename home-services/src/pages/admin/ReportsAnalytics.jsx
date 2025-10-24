import React, { useState, useEffect } from 'react';
import '../../components/admin/AdminLayout.css';
import './ReportsAnalytics.css';

const ReportsAnalytics = () => {
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const [timeRange, setTimeRange] = useState('monthly');

  // Dummy data for reports
  const [revenueData, setRevenueData] = useState({
    totalRevenue: 12450.75,
    bookingsCount: 127,
    providersCount: 42,
    customersCount: 185
  });

  const [chartData, setChartData] = useState({
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    revenue: [1800, 2200, 1900, 2500, 3100, 2850],
    bookings: [22, 28, 25, 32, 41, 37]
  });

  const [topServices, setTopServices] = useState([
    { service: 'Plumbing', bookings: 24, revenue: 2850.00 },
    { service: 'Electrical Work', bookings: 19, revenue: 1980.50 },
    { service: 'House Cleaning', bookings: 16, revenue: 3200.00 },
    { service: 'AC Repair', bookings: 14, revenue: 4900.25 },
    { service: 'Painting', bookings: 12, revenue: 1800.00 }
  ]);

  const [recentActivity, setRecentActivity] = useState([
    { id: 1, action: 'New booking created', user: 'John Doe', time: '2 hours ago', type: 'booking' },
    { id: 2, action: 'Provider approved', user: 'Jane Smith', time: '5 hours ago', type: 'provider' },
    { id: 3, action: 'Booking completed', user: 'Alice Johnson', time: '1 day ago', type: 'booking' },
    { id: 4, action: 'New user registered', user: 'Bob Wilson', time: '1 day ago', type: 'user' },
    { id: 5, action: 'Service cancelled', user: 'Charlie Brown', time: '2 days ago', type: 'booking' }
  ]);

  useEffect(() => {
    // Simulate API call
    const fetchData = async () => {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1000));
      setLoading(false);
    };

    fetchData();
  }, []);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const generateReport = () => {
    alert('Report generation started. This is a demo - in a real application, this would generate a downloadable report.');
  };

  // Simple bar chart component
  const BarChart = ({ data, labels, title, color }) => {
    const maxValue = Math.max(...data);
    
    return (
      <div className="chart-container">
        <h3 className="chart-title">{title}</h3>
        <div className="chart-wrapper">
          <div className="y-axis">
            {Array.from({ length: 5 }, (_, i) => (
              <div key={i} className="y-axis-label">
                {Math.round((maxValue / 4) * (4 - i))}
              </div>
            ))}
          </div>
          <div className="bars-container">
            {data.map((value, index) => (
              <div key={index} className="bar-wrapper">
                <div 
                  className="bar" 
                  style={{ 
                    height: `${(value / maxValue) * 100}%`,
                    backgroundColor: color
                  }}
                >
                  <div className="bar-value">{value}</div>
                </div>
                <div className="bar-label">{labels[index]}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="reports-analytics">
      <div className="page-header">
        <h1 className="page-title">Reports & Analytics</h1>
        <div className="header-actions">
          <select 
            value={timeRange} 
            onChange={(e) => setTimeRange(e.target.value)}
            className="time-range-selector"
          >
            <option value="weekly">Last 7 Days</option>
            <option value="monthly">Last 30 Days</option>
            <option value="quarterly">Last 90 Days</option>
            <option value="yearly">Last Year</option>
          </select>
          <button className="btn btn-primary" onClick={generateReport}>
            Generate Report
          </button>
        </div>
      </div>

      {loading ? (
        <div className="loading-state">
          <div className="spinner"></div>
          <p>Loading analytics data...</p>
        </div>
      ) : (
        <>
          {/* Stats Overview */}
          <div className="stats-overview">
            <div className="stat-card">
              <div className="stat-card-icon revenue">
                <svg className="stat-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="stat-card-info">
                <div className="stat-card-title">Total Revenue</div>
                <div className="stat-card-value">{formatCurrency(revenueData.totalRevenue)}</div>
                <div className="stat-card-change positive">+12.5% from last period</div>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-card-icon bookings">
                <svg className="stat-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <div className="stat-card-info">
                <div className="stat-card-title">Total Bookings</div>
                <div className="stat-card-value">{revenueData.bookingsCount}</div>
                <div className="stat-card-change positive">+8.3% from last period</div>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-card-icon providers">
                <svg className="stat-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <div className="stat-card-info">
                <div className="stat-card-title">Total Providers</div>
                <div className="stat-card-value">{revenueData.providersCount}</div>
                <div className="stat-card-change neutral">+2.1% from last period</div>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-card-icon users">
                <svg className="stat-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <div className="stat-card-info">
                <div className="stat-card-title">Total Customers</div>
                <div className="stat-card-value">{revenueData.customersCount}</div>
                <div className="stat-card-change positive">+15.7% from last period</div>
              </div>
            </div>
          </div>

          {/* Charts Section */}
          <div className="charts-section">
            <div className="chart-grid">
              <BarChart 
                data={chartData.revenue} 
                labels={chartData.labels} 
                title="Revenue Trend" 
                color="linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
              />
              <BarChart 
                data={chartData.bookings} 
                labels={chartData.labels} 
                title="Bookings Trend" 
                color="linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)"
              />
            </div>
          </div>

          {/* Top Services */}
          <div className="top-services-section">
            <h2 className="section-title">Top Services</h2>
            <div className="services-table-container">
              <div className="services-table-wrapper">
                <table className="services-table">
                  <thead>
                    <tr>
                      <th>Service</th>
                      <th>Bookings</th>
                      <th>Revenue</th>
                      <th>Avg. Rating</th>
                    </tr>
                  </thead>
                  <tbody>
                    {topServices.map((service, index) => (
                      <tr key={index}>
                        <td>{service.service}</td>
                        <td>{service.bookings}</td>
                        <td>{formatCurrency(service.revenue)}</td>
                        <td>
                          <div className="rating">
                            <svg className="star-icon" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                            </svg>
                            {(4.5 + (index * 0.1)).toFixed(1)}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="recent-activity-section">
            <h2 className="section-title">Recent Activity</h2>
            <div className="activity-list">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="activity-item">
                  <div className="activity-icon">
                    {activity.type === 'booking' && (
                      <svg className="icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    )}
                    {activity.type === 'provider' && (
                      <svg className="icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                    )}
                    {activity.type === 'user' && (
                      <svg className="icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    )}
                  </div>
                  <div className="activity-content">
                    <div className="activity-action">{activity.action}</div>
                    <div className="activity-user">by {activity.user}</div>
                  </div>
                  <div className="activity-time">{activity.time}</div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ReportsAnalytics;