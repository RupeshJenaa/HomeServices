import React, { useState, useEffect } from 'react';
import '../../components/admin/AdminLayout.css'; // Corrected import path

const UsersManagement = () => {
  const [users, setUsers] = useState([
    {
      _id: '1',
      name: 'John Smith',
      email: 'john.smith@example.com',
      phone: '+1 (555) 123-4567',
      role: 'customer',
      isActive: true,
      createdAt: '2023-01-15T10:30:00Z'
    },
    {
      _id: '2',
      name: 'Anna Davis',
      email: 'anna.davis@example.com',
      phone: '+1 (555) 987-6543',
      role: 'provider',
      isActive: true,
      createdAt: '2023-02-20T14:45:00Z'
    },
    {
      _id: '3',
      name: 'Robert Brown',
      email: 'robert.brown@example.com',
      phone: '+1 (555) 456-7890',
      role: 'customer',
      isActive: false,
      createdAt: '2023-03-10T09:15:00Z'
    },
    {
      _id: '4',
      name: 'Lisa Taylor',
      email: 'lisa.taylor@example.com',
      phone: '+1 (555) 234-5678',
      role: 'provider',
      isActive: true,
      createdAt: '2023-04-05T16:20:00Z'
    },
    {
      _id: '5',
      name: 'Michael Wilson',
      email: 'michael.wilson@example.com',
      phone: '+1 (555) 876-5432',
      role: 'customer',
      isActive: true,
      createdAt: '2023-05-12T11:30:00Z'
    },
    {
      _id: '6',
      name: 'Sarah Johnson',
      email: 'sarah.johnson@example.com',
      phone: '+1 (555) 345-6789',
      role: 'admin',
      isActive: true,
      createdAt: '2023-01-01T08:00:00Z'
    }
  ]);
  
  const [loading, setLoading] = useState(false); // Remove loading simulation
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Remove the useEffect that simulates API calls
  // useEffect(() => {
  //   const fetchUsers = async () => {
  //     setLoading(true);
  //     // Simulate API delay
  //     await new Promise(resolve => setTimeout(resolve, 1000));
  //     setLoading(false);
  //   };

  //   fetchUsers();
  // }, [currentPage, roleFilter]);

  const handleStatusChange = async (userId, currentStatus) => {
    // Update user status in the local state
    setUsers(users.map(user => 
      user._id === userId ? {...user, isActive: !currentStatus} : user
    ));
  };

  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  ).filter(user => 
    roleFilter ? user.role === roleFilter : true
  );

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  // Remove the loading check
  // if (loading) {
  //   return (
  //     <div className="admin-page">
  //       <h1 className="dashboard-title">Users Management</h1>
  //       <div className="loading-container">
  //         <div className="spinner"></div>
  //       </div>
  //     </div>
  //   );
  // }

  return (
    <div className="admin-page">
      <h1 className="dashboard-title">Users Management</h1>
      
      {/* Filters */}
      <div className="admin-filters">
        <div className="admin-filter-group">
          <div>
            <label htmlFor="search" className="admin-filter-label">
              Search Users
            </label>
            <input
              type="text"
              id="search"
              placeholder="Search by name or email"
              className="admin-filter-input"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div>
            <label htmlFor="role" className="admin-filter-label">
              Filter by Role
            </label>
            <select
              id="role"
              className="admin-filter-input"
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
            >
              <option value="">All Roles</option>
              <option value="customer">Customer</option>
              <option value="provider">Provider</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          
          <div className="admin-filter-actions">
            <button
              onClick={() => {}}
              className="quick-action-button btn-blue"
              style={{width: 'auto', marginTop: '1.5rem'}}
            >
              Apply Filters
            </button>
          </div>
        </div>
      </div>

      {/* Users Table */}
      <div className="admin-table-container">
        <div className="admin-table-wrapper">
          <table className="admin-table">
            <thead>
              <tr>
                <th>User</th>
                <th>Role</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Status</th>
                <th>Joined</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr key={user._id}>
                  <td>
                    <div className="user-info">
                      <div className="user-avatar-small">
                        <div className="avatar-small">
                          {user.name.charAt(0).toUpperCase()}
                        </div>
                      </div>
                      <div className="user-name">
                        {user.name}
                      </div>
                    </div>
                  </td>
                  <td>
                    <span className={`role-badge ${user.role}`}>
                      {user.role}
                    </span>
                  </td>
                  <td>
                    {user.email}
                  </td>
                  <td>
                    {user.phone || 'N/A'}
                  </td>
                  <td>
                    <span className={`status-badge ${user.isActive ? 'active' : 'inactive'}`}>
                      {user.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td>
                    {new Date(user.createdAt).toLocaleDateString()}
                  </td>
                  <td>
                    <button
                      onClick={() => handleStatusChange(user._id, user.isActive)}
                      className={`status-toggle ${user.isActive ? 'deactivate' : 'activate'}`}
                    >
                      {user.isActive ? 'Deactivate' : 'Activate'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="admin-pagination">
          <div className="pagination-info">
            <p>
              Showing page {currentPage} of {totalPages}
            </p>
          </div>
          <div className="pagination-controls">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="pagination-btn"
            >
              Previous
            </button>
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="pagination-btn"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UsersManagement;