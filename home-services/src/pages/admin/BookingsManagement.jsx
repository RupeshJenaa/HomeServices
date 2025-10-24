import React, { useState, useEffect } from 'react';
import '../../components/admin/AdminLayout.css';
import './BookingsManagement.css';

const BookingsManagement = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const bookingsPerPage = 8;

  // Dummy data for bookings
  const dummyBookings = [
    {
      id: 'BK001',
      customer: 'John Doe',
      provider: 'Jane Smith',
      service: 'Plumbing Repair',
      amount: 120.50,
      date: '2023-05-15',
      time: '10:00 AM',
      status: 'completed',
      address: '123 Main St, New York, NY'
    },
    {
      id: 'BK002',
      customer: 'Alice Johnson',
      provider: 'Bob Wilson',
      service: 'Electrical Work',
      amount: 85.75,
      date: '2023-05-14',
      time: '2:30 PM',
      status: 'pending',
      address: '456 Oak Ave, Los Angeles, CA'
    },
    {
      id: 'BK003',
      customer: 'Charlie Brown',
      provider: 'Diana Prince',
      service: 'House Cleaning',
      amount: 200.00,
      date: '2023-05-13',
      time: '9:00 AM',
      status: 'accepted',
      address: '789 Pine Rd, Chicago, IL'
    },
    {
      id: 'BK004',
      customer: 'Emma Davis',
      provider: 'Frank Miller',
      service: 'AC Repair',
      amount: 350.25,
      date: '2023-05-12',
      time: '11:00 AM',
      status: 'completed',
      address: '321 Elm St, Houston, TX'
    },
    {
      id: 'BK005',
      customer: 'George Wilson',
      provider: 'Helen Carter',
      service: 'Painting',
      amount: 500.00,
      date: '2023-05-11',
      time: '1:00 PM',
      status: 'cancelled',
      address: '654 Maple Dr, Phoenix, AZ'
    },
    {
      id: 'BK006',
      customer: 'Ivy Thompson',
      provider: 'Jack Roberts',
      service: 'Gardening',
      amount: 150.00,
      date: '2023-05-10',
      time: '8:00 AM',
      status: 'completed',
      address: '987 Cedar Ln, Philadelphia, PA'
    },
    {
      id: 'BK007',
      customer: 'Kevin Lee',
      provider: 'Laura Smith',
      service: 'Carpentry',
      amount: 275.50,
      date: '2023-05-09',
      time: '3:00 PM',
      status: 'pending',
      address: '147 Birch St, San Antonio, TX'
    },
    {
      id: 'BK008',
      customer: 'Megan Clark',
      provider: 'Nathan Young',
      service: 'Appliance Repair',
      amount: 180.75,
      date: '2023-05-08',
      time: '10:30 AM',
      status: 'accepted',
      address: '258 Spruce Ave, San Diego, CA'
    },
    {
      id: 'BK009',
      customer: 'Oliver Harris',
      provider: 'Patricia King',
      service: 'Plumbing',
      amount: 95.25,
      date: '2023-05-07',
      time: '12:00 PM',
      status: 'completed',
      address: '369 Willow Dr, Dallas, TX'
    },
    {
      id: 'BK010',
      customer: 'Quinn Moore',
      provider: 'Rachel Green',
      service: 'Electrical Work',
      amount: 165.00,
      date: '2023-05-06',
      time: '4:00 PM',
      status: 'cancelled',
      address: '741 Poplar St, San Jose, CA'
    }
  ];

  useEffect(() => {
    // Simulate API call
    const fetchData = async () => {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 800));
      setBookings(dummyBookings);
      setLoading(false);
    };

    fetchData();
  }, []);

  const getStatusClass = (status) => {
    switch (status) {
      case 'pending': return 'status-pending';
      case 'accepted': return 'status-accepted';
      case 'completed': return 'status-completed';
      case 'cancelled': return 'status-cancelled';
      default: return '';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'pending': return 'Pending';
      case 'accepted': return 'Accepted';
      case 'completed': return 'Completed';
      case 'cancelled': return 'Cancelled';
      default: return status;
    }
  };

  // Filter bookings based on search term and status
  const filteredBookings = bookings.filter(booking => {
    const matchesSearch = 
      booking.id.toLowerCase().includes(searchTerm.toLowerCase()) || 
      booking.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.provider.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.service.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || booking.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  // Pagination
  const indexOfLastBooking = currentPage * bookingsPerPage;
  const indexOfFirstBooking = indexOfLastBooking - bookingsPerPage;
  const currentBookings = filteredBookings.slice(indexOfFirstBooking, indexOfLastBooking);
  const totalPages = Math.ceil(filteredBookings.length / bookingsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleAcceptBooking = (bookingId) => {
    setBookings(bookings.map(booking => 
      booking.id === bookingId 
        ? { ...booking, status: 'accepted' } 
        : booking
    ));
  };

  const handleCompleteBooking = (bookingId) => {
    setBookings(bookings.map(booking => 
      booking.id === bookingId 
        ? { ...booking, status: 'completed' } 
        : booking
    ));
  };

  const handleCancelBooking = (bookingId) => {
    setBookings(bookings.map(booking => 
      booking.id === bookingId 
        ? { ...booking, status: 'cancelled' } 
        : booking
    ));
  };

  return (
    <div className="bookings-management">
      <div className="page-header">
        <h1 className="page-title">Bookings Management</h1>
        <button className="btn btn-primary">Create New Booking</button>
      </div>

      <div className="filters-section">
        <div className="search-box">
          <input
            type="text"
            placeholder="Search bookings..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          <svg className="search-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        
        <div className="filter-dropdown">
          <select 
            value={filterStatus} 
            onChange={(e) => setFilterStatus(e.target.value)}
            className="status-filter"
          >
            <option value="all">All Statuses</option>
            <option value="pending">Pending</option>
            <option value="accepted">Accepted</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      {loading ? (
        <div className="loading-state">
          <div className="spinner"></div>
          <p>Loading bookings...</p>
        </div>
      ) : (
        <>
          <div className="bookings-table-container">
            <div className="bookings-table-wrapper">
              <table className="bookings-table">
                <thead>
                  <tr>
                    <th>Booking ID</th>
                    <th>Customer</th>
                    <th>Provider</th>
                    <th>Service</th>
                    <th>Amount</th>
                    <th>Date & Time</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {currentBookings.map((booking) => (
                    <tr key={booking.id}>
                      <td className="booking-id">{booking.id}</td>
                      <td>
                        <div className="user-info">
                          <div className="user-avatar-small">
                            <div className="avatar-small">
                              {booking.customer.charAt(0)}
                            </div>
                          </div>
                          <div className="user-name">
                            {booking.customer}
                          </div>
                        </div>
                      </td>
                      <td>
                        <div className="user-info">
                          <div className="user-avatar-small">
                            <div className="avatar-small">
                              {booking.provider.charAt(0)}
                            </div>
                          </div>
                          <div className="user-name">
                            {booking.provider}
                          </div>
                        </div>
                      </td>
                      <td>{booking.service}</td>
                      <td className="amount">${booking.amount.toFixed(2)}</td>
                      <td>
                        <div className="date-time">
                          <div>{booking.date}</div>
                          <div className="time">{booking.time}</div>
                        </div>
                      </td>
                      <td>
                        <span className={`status-badge ${getStatusClass(booking.status)}`}>
                          {getStatusText(booking.status)}
                        </span>
                      </td>
                      <td>
                        <div className="action-buttons">
                          {booking.status === 'pending' && (
                            <button 
                              className="btn btn-sm btn-success"
                              onClick={() => handleAcceptBooking(booking.id)}
                            >
                              Accept
                            </button>
                          )}
                          {booking.status === 'accepted' && (
                            <button 
                              className="btn btn-sm btn-primary"
                              onClick={() => handleCompleteBooking(booking.id)}
                            >
                              Complete
                            </button>
                          )}
                          {(booking.status === 'pending' || booking.status === 'accepted') && (
                            <button 
                              className="btn btn-sm btn-danger"
                              onClick={() => handleCancelBooking(booking.id)}
                            >
                              Cancel
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Booking Details Modal Placeholder */}
          <div className="booking-details-placeholder">
            <h3>Booking Details</h3>
            <p>Select a booking to view details</p>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="pagination">
              <button 
                className="pagination-btn"
                disabled={currentPage === 1}
                onClick={() => handlePageChange(currentPage - 1)}
              >
                Previous
              </button>
              
              {[...Array(totalPages)].map((_, index) => (
                <button
                  key={index + 1}
                  className={`pagination-btn ${currentPage === index + 1 ? 'active' : ''}`}
                  onClick={() => handlePageChange(index + 1)}
                >
                  {index + 1}
                </button>
              ))}
              
              <button 
                className="pagination-btn"
                disabled={currentPage === totalPages}
                onClick={() => handlePageChange(currentPage + 1)}
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default BookingsManagement;