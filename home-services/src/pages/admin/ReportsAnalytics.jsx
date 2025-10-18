import React, { useState, useEffect } from 'react';
// Removed adminAPI import since we're using dummy data
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import '../../components/admin/AdminLayout.css'; // Corrected import path

const ReportsAnalytics = () => {
  const [reports, setReports] = useState({
    usersByRole: [
      { _id: 'customer', count: 1242 },
      { _id: 'provider', count: 87 },
      { _id: 'admin', count: 3 }
    ],
    totalServices: 15,
    bookingStats: [
      { _id: 'pending', count: 24, totalRevenue: 1250.75 },
      { _id: 'accepted', count: 42, totalRevenue: 3120.50 },
      { _id: 'completed', count: 290, totalRevenue: 28750.25 },
      { _id: 'cancelled', count: 15, totalRevenue: 0 },
      { _id: 'rejected', count: 5, totalRevenue: 0 }
    ],
    revenueOverTime: [
      { _id: '2023-06-01', dailyRevenue: 1250.75, bookingsCount: 12 },
      { _id: '2023-06-02', dailyRevenue: 980.50, bookingsCount: 8 },
      { _id: '2023-06-03', dailyRevenue: 1750.25, bookingsCount: 15 },
      { _id: '2023-06-04', dailyRevenue: 2100.00, bookingsCount: 18 },
      { _id: '2023-06-05', dailyRevenue: 1850.75, bookingsCount: 16 },
      { _id: '2023-06-06', dailyRevenue: 2300.50, bookingsCount: 20 },
      { _id: '2023-06-07', dailyRevenue: 1950.25, bookingsCount: 17 }
    ]
  });
  
  const [loading, setLoading] = useState(false); // Remove loading simulation
  const [period, setPeriod] = useState('month');
  const [revenueData, setRevenueData] = useState([
    { date: '2023-06-01', revenue: 1250.75, bookings: 12 },
    { date: '2023-06-02', revenue: 980.50, bookings: 8 },
    { date: '2023-06-03', revenue: 1750.25, bookings: 15 },
    { date: '2023-06-04', revenue: 2100.00, bookings: 18 },
    { date: '2023-06-05', revenue: 1850.75, bookings: 16 },
    { date: '2023-06-06', revenue: 2300.50, bookings: 20 },
    { date: '2023-06-07', revenue: 1950.25, bookings: 17 }
  ]);

  // Remove the useEffect that simulates API calls
  // useEffect(() => {
  //   const fetchReports = async () => {
  //     setLoading(true);
  //     // Simulate API delay
  //     await new Promise(resolve => setTimeout(resolve, 1000));
  //     setLoading(false);
  //   };

  //   fetchReports();
  // }, [period]);

  // Format user data for pie chart
  const userData = reports.usersByRole.map(item => ({
    name: item._id,
    value: item.count
  }));

  // Format booking stats for bar chart
  const bookingData = reports.bookingStats.map(item => ({
    name: item._id,
    count: item.count,
    revenue: item.totalRevenue
  }));

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

  // Remove the loading check
  // if (loading) {
  //   return (
  //     <div className="admin-page">
  //       <h1 className="dashboard-title">Reports & Analytics</h1>
  //       <div className="loading-container">
  //         <div className="spinner"></div>
  //       </div>
  //     </div>
  //   );
  // }

  return (
    <div className="admin-page">
      <h1 className="dashboard-title">Reports & Analytics</h1>
      
      {/* Period Selector */}
      <div className="admin-filters">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-800">Analytics Overview</h2>
          <div className="flex space-x-2">
            <button
              onClick={() => setPeriod('week')}
              className={`px-4 py-2 rounded-md text-sm font-medium ${
                period === 'week'
                  ? 'quick-action-button btn-blue'
                  : 'quick-action-button'
              }`}
              style={{margin: '0'}}
            >
              Week
            </button>
            <button
              onClick={() => setPeriod('month')}
              className={`px-4 py-2 rounded-md text-sm font-medium ${
                period === 'month'
                  ? 'quick-action-button btn-blue'
                  : 'quick-action-button'
              }`}
              style={{margin: '0'}}
            >
              Month
            </button>
            <button
              onClick={() => setPeriod('year')}
              className={`px-4 py-2 rounded-md text-sm font-medium ${
                period === 'year'
                  ? 'quick-action-button btn-blue'
                  : 'quick-action-button'
              }`}
              style={{margin: '0'}}
            >
              Year
            </button>
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-card-content">
            <div className="stat-card-header">
              <div className="stat-card-icon bg-blue-500">
                <svg className="stat-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <div className="stat-card-info">
                <div className="stat-card-title">Total Users</div>
                <div className="stat-card-value">
                  {reports.usersByRole.reduce((sum, role) => sum + role.count, 0)}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-card-content">
            <div className="stat-card-header">
              <div className="stat-card-icon bg-green-500">
                <svg className="stat-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                </svg>
              </div>
              <div className="stat-card-info">
                <div className="stat-card-title">Total Services</div>
                <div className="stat-card-value">{reports.totalServices}</div>
              </div>
            </div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-card-content">
            <div className="stat-card-header">
              <div className="stat-card-icon bg-purple-500">
                <svg className="stat-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="stat-card-info">
                <div className="stat-card-title">Total Revenue</div>
                <div className="stat-card-value">
                  ${reports.bookingStats.reduce((sum, stat) => sum + stat.totalRevenue, 0).toFixed(2)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="charts-section">
        {/* User Distribution Pie Chart */}
        <div className="chart-card">
          <h3 className="chart-title">User Distribution</h3>
          <div className="chart-container">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={userData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                >
                  {userData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Booking Status Bar Chart */}
        <div className="chart-card">
          <h3 className="chart-title">Booking Status Distribution</h3>
          <div className="chart-container">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart
                data={bookingData}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="count" name="Bookings Count" fill="#8884d8" />
                <Bar dataKey="revenue" name="Revenue ($)" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Revenue Over Time */}
      <div className="chart-card">
        <h3 className="chart-title">Revenue Over Time</h3>
        <div className="chart-container">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={revenueData}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="revenue" name="Daily Revenue ($)" fill="#8884d8" />
              <Bar dataKey="bookings" name="Bookings Count" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default ReportsAnalytics;