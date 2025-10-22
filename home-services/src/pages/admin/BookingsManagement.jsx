import React, { useState, useEffect } from 'react';
import { adminAPI } from '../../api/adminAPI';
import '../../components/admin/AdminLayout.css'; // Corrected import path

const BookingsManagement = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        setLoading(true);
        const response = await adminAPI.getBookings({
          page: currentPage,
          limit: 10,
          search: searchTerm,
          status: statusFilter
        });
        
        setBookings(response.data || []);
        setTotalPages(response.totalPages || 1);
      } catch (err) {
        console.error('Error fetching bookings:', err);
        setError('Failed to load bookings');
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [currentPage, searchTerm, statusFilter]);

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'pending':
        return 'pending';
      case 'accepted':
        return 'active';
      case 'completed':
        return 'active';
      case 'cancelled':
        return 'inactive';
      case 'rejected':
        return 'inactive';
      default:
        return 'default';
    }
  };

  const filteredBookings = bookings.filter(booking => 
    (booking.service?.name && booking.service.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (booking.customer?.name && booking.customer.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (booking.provider?.name && booking.provider.name.toLowerCase().includes(searchTerm.toLowerCase()))
  ).filter(booking => 
    statusFilter ? booking.status === statusFilter : true
  );

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  if (loading) {
    return (
      <div className="admin-page">
        <h1 className="dashboard-title">Bookings Management</h1>
        <div className="loading-container">
          <div className="spinner"></div>
          <p>Loading bookings...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="admin-page">
        <h1 className="dashboard-title">Bookings Management</h1>
        <div className="error-container">
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-page">
      <h1 className="dashboard-title">Bookings Management</h1>
      
      {/* Filters */}
      <div className="admin-filters">
        <div className="admin-filter-group">
          <div>
            <label htmlFor="search" className="admin-filter-label">
              Search Bookings
            </label>
            <input
              type="text"
              id="search"
              placeholder="Search by service, customer or provider"
              className="admin-filter-input"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div>
            <label htmlFor="status" className="admin-filter-label">
              Filter by Status
            </label>
            <select
              id="status"
              className="admin-filter-input"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="">All Statuses</option>
              <option value="pending">Pending</option>
              <option value="accepted">Accepted</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
              <option value="rejected">Rejected</option>
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

      {/* Bookings Table */}
      <div className="admin-table-container">
        <div className="admin-table-wrapper">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Booking ID</th>
                <th>Service</th>
                <th>Customer</th>
                <th>Provider</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {filteredBookings.map((booking) => (
                <tr key={booking._id}>
                  <td>
                    {booking._id || 'N/A'}
                  </td>
                  <td>
                    {booking.service?.name || 'N/A'}
                  </td>
                  <td>
                    {booking.customer?.name || 'N/A'}
                  </td>
                  <td>
                    {booking.provider?.name || 'N/A'}
                  </td>
                  <td>
                    ${booking.totalAmount?.toFixed(2) || '0.00'}
                  </td>
                  <td>
                    <span className={`status-badge ${getStatusBadgeClass(booking.status)}`}>
                      {booking.status || 'N/A'}
                    </span>
                  </td>
                  <td>
                    {booking.createdAt ? new Date(booking.createdAt).toLocaleDateString() : 'N/A'}
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

export default BookingsManagement;