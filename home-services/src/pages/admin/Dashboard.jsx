import React, { useState, useEffect } from 'react';
import './Dashboard.css';
import '../../components/admin/AdminLayout.css'; // Import admin layout styles for consistency

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalUsers: 1242,
    totalProviders: 87,
    totalBookings: 356,
    pendingApprovals: 12,
  });
  
  const [recentBookings, setRecentBookings] = useState([
    {
      id: 'BK001',
      customer: 'John Smith',
      provider: 'Mike Johnson',
      service: 'Plumbing Repair',
      amount: 120.00,
      status: 'completed',
      date: '2023-06-15'
    },
    {
      id: 'BK002',
      customer: 'Sarah Williams',
      provider: 'Anna Davis',
      service: 'Electrical Work',
      amount: 85.50,
      status: 'pending',
      date: '2023-06-14'
    },
    {
      id: 'BK003',
      customer: 'Robert Brown',
      provider: 'David Wilson',
      service: 'AC Service',
      amount: 200.00,
      status: 'accepted',
      date: '2023-06-14'
    },
    {
      id: 'BK004',
      customer: 'Emily Davis',
      provider: 'James Miller',
      service: 'Cleaning Service',
      amount: 95.75,
      status: 'completed',
      date: '2023-06-13'
    },
    {
      id: 'BK005',
      customer: 'Michael Wilson',
      provider: 'Lisa Taylor',
      service: 'Painting',
      amount: 350.00,
      status: 'cancelled',
      date: '2023-06-12'
    }
  ]);
  
  const [recentUsers, setRecentUsers] = useState([
    {
      id: 1,
      name: 'John Smith',
      email: 'john.smith@example.com',
      role: 'customer',
      joinDate: '2023-06-10',
      status: 'active'
    },
    {
      id: 2,
      name: 'Anna Davis',
      email: 'anna.davis@example.com',
      role: 'provider',
      joinDate: '2023-06-08',
      status: 'active'
    },
    {
      id: 3,
      name: 'Robert Brown',
      email: 'robert.brown@example.com',
      role: 'customer',
      joinDate: '2023-06-05',
      status: 'active'
    },
    {
      id: 4,
      name: 'Lisa Taylor',
      email: 'lisa.taylor@example.com',
      role: 'provider',
      joinDate: '2023-06-01',
      status: 'pending'
    }
  ]);
  
  const [loading, setLoading] = useState(false); // Remove loading simulation

  // Remove the useEffect that simulates API calls
  // useEffect(() => {
  //   const fetchDashboardStats = async () => {
  //     setLoading(true);
  //     // Simulate API delay
  //     await new Promise(resolve => setTimeout(resolve, 1000));
  //     setLoading(false);
  //   };

  //   fetchDashboardStats();
  // }, []);

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'pending':
        return 'status-badge pending';
      case 'accepted':
        return 'status-badge active';
      case 'completed':
        return 'status-badge active';
      case 'cancelled':
        return 'status-badge inactive';
      default:
        return 'status-badge default';
    }
  };

  // Remove the loading check
  // if (loading) {
  //   return (
  //     <div className="admin-dashboard">
  //       <h1 className="dashboard-title">Admin Dashboard</h1>
  //       <div className="loading-container">
  //         <div className="spinner"></div>
  //       </div>
  //     </div>
  //   );
  // }

  return (
    <div className="admin-dashboard">
      <h1 className="dashboard-title">Admin Dashboard</h1>
      
      {/* Stats Cards */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-card-content">
            <div className="stat-card-header">
              <div className="stat-card-icon bg-blue-500">
                <svg className="stat-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <div className="stat-card-info">
                <div className="stat-card-title">Total Users</div>
                <div className="stat-card-value">{stats.totalUsers}</div>
              </div>
            </div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-card-content">
            <div className="stat-card-header">
              <div className="stat-card-icon bg-green-500">
                <svg className="stat-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <div className="stat-card-info">
                <div className="stat-card-title">Total Providers</div>
                <div className="stat-card-value">{stats.totalProviders}</div>
              </div>
            </div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-card-content">
            <div className="stat-card-header">
              <div className="stat-card-icon bg-yellow-500">
                <svg className="stat-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <div className="stat-card-info">
                <div className="stat-card-title">Total Bookings</div>
                <div className="stat-card-value">{stats.totalBookings}</div>
              </div>
            </div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-card-content">
            <div className="stat-card-header">
              <div className="stat-card-icon bg-red-500">
                <svg className="stat-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <div className="stat-card-info">
                <div className="stat-card-title">Pending Approvals</div>
                <div className="stat-card-value">{stats.pendingApprovals}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="quick-actions">
        <h2 className="quick-actions-title">Quick Actions</h2>
        <div className="quick-actions-grid">
          <button className="quick-action-button btn-blue">
            <svg className="quick-action-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
            Manage Users
          </button>
          <button className="quick-action-button btn-green">
            <svg className="quick-action-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            Approve Providers
          </button>
          <button className="quick-action-button btn-purple">
            <svg className="quick-action-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
            View Reports
          </button>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="recent-activity">
        <h2 className="recent-activity-title">Recent Bookings</h2>
        <div className="admin-table-container">
          <div className="admin-table-wrapper">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Booking ID</th>
                  <th>Customer</th>
                  <th>Provider</th>
                  <th>Service</th>
                  <th>Amount</th>
                  <th>Status</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {recentBookings.map((booking) => (
                  <tr key={booking.id}>
                    <td>{booking.id}</td>
                    <td>{booking.customer}</td>
                    <td>{booking.provider}</td>
                    <td>{booking.service}</td>
                    <td>${booking.amount.toFixed(2)}</td>
                    <td>
                      <span className={getStatusBadgeClass(booking.status)}>
                        {booking.status}
                      </span>
                    </td>
                    <td>{booking.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Recent Users */}
      <div className="recent-activity">
        <h2 className="recent-activity-title">Recent Users</h2>
        <div className="admin-table-container">
          <div className="admin-table-wrapper">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>User</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Join Date</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {recentUsers.map((user) => (
                  <tr key={user.id}>
                    <td>
                      <div className="user-info">
                        <div className="user-avatar-small">
                          <div className="avatar-small">
                            {user.name.charAt(0)}
                          </div>
                        </div>
                        <div className="user-name">
                          {user.name}
                        </div>
                      </div>
                    </td>
                    <td>{user.email}</td>
                    <td>
                      <span className={`role-badge ${user.role}`}>
                        {user.role}
                      </span>
                    </td>
                    <td>{user.joinDate}</td>
                    <td>
                      <span className={`status-badge ${user.status === 'active' ? 'active' : 'pending'}`}>
                        {user.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;