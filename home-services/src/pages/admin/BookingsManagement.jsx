import React, { useState, useEffect } from 'react';
import '../../components/admin/AdminLayout.css'; // Corrected import path

const BookingsManagement = () => {
  const [bookings, setBookings] = useState([
    {
      _id: 'BK001',
      service: { name: 'Plumbing Repair' },
      customer: { name: 'John Smith' },
      provider: { name: 'Mike Johnson' },
      totalAmount: 120.00,
      status: 'completed',
      createdAt: '2023-06-15T10:30:00Z'
    },
    {
      _id: 'BK002',
      service: { name: 'Electrical Work' },
      customer: { name: 'Sarah Williams' },
      provider: { name: 'Anna Davis' },
      totalAmount: 85.50,
      status: 'pending',
      createdAt: '2023-06-14T14:45:00Z'
    },
    {
      _id: 'BK003',
      service: { name: 'AC Service' },
      customer: { name: 'Robert Brown' },
      provider: { name: 'David Wilson' },
      totalAmount: 200.00,
      status: 'accepted',
      createdAt: '2023-06-14T09:15:00Z'
    },
    {
      _id: 'BK004',
      service: { name: 'Cleaning Service' },
      customer: { name: 'Emily Davis' },
      provider: { name: 'James Miller' },
      totalAmount: 95.75,
      status: 'completed',
      createdAt: '2023-06-13T16:20:00Z'
    },
    {
      _id: 'BK005',
      service: { name: 'Painting' },
      customer: { name: 'Michael Wilson' },
      provider: { name: 'Lisa Taylor' },
      totalAmount: 350.00,
      status: 'cancelled',
      createdAt: '2023-06-12T11:30:00Z'
    },
    {
      _id: 'BK006',
      service: { name: 'Pipe Installation' },
      customer: { name: 'David Thompson' },
      provider: { name: 'Anna Davis' },
      totalAmount: 150.00,
      status: 'rejected',
      createdAt: '2023-06-11T13:45:00Z'
    },
    {
      _id: 'BK007',
      service: { name: 'Lighting Installation' },
      customer: { name: 'Jennifer Lee' },
      provider: { name: 'Lisa Taylor' },
      totalAmount: 175.25,
      status: 'pending',
      createdAt: '2023-06-10T08:30:00Z'
    }
  ]);
  
  const [loading, setLoading] = useState(false); // Remove loading simulation
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Remove the useEffect that simulates API calls
  // useEffect(() => {
  //   const fetchBookings = async () => {
  //     setLoading(true);
  //     // Simulate API delay
  //     await new Promise(resolve => setTimeout(resolve, 1000));
  //     setLoading(false);
  //   };

  //   fetchBookings();
  // }, [currentPage, statusFilter]);

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
    booking.service?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    booking.customer?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    booking.provider?.name.toLowerCase().includes(searchTerm.toLowerCase())
  ).filter(booking => 
    statusFilter ? booking.status === statusFilter : true
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
  //       <h1 className="dashboard-title">Bookings Management</h1>
  //       <div className="loading-container">
  //         <div className="spinner"></div>
  //       </div>
  //     </div>
  //   );
  // }

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
                    {booking._id}
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
                      {booking.status}
                    </span>
                  </td>
                  <td>
                    {new Date(booking.createdAt).toLocaleDateString()}
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