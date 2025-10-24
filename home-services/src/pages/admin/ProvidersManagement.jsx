import React, { useState, useEffect } from 'react';
import '../../components/admin/AdminLayout.css';
import './ProvidersManagement.css';

const ProvidersManagement = () => {
  const [providers, setProviders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const providersPerPage = 6;

  // Dummy data for providers
  const dummyProviders = [
    {
      id: 1,
      name: 'Jane Smith',
      email: 'jane.smith@example.com',
      phone: '+1 (555) 123-4567',
      service: 'Plumbing',
      rating: 4.8,
      totalJobs: 42,
      joinDate: '2023-01-15',
      status: 'approved',
      avatar: 'JS',
      verified: true
    },
    {
      id: 2,
      name: 'Emily Davis',
      email: 'emily.davis@example.com',
      phone: '+1 (555) 987-6543',
      service: 'Electrical Work',
      rating: 4.9,
      totalJobs: 38,
      joinDate: '2023-02-10',
      status: 'approved',
      avatar: 'ED',
      verified: true
    },
    {
      id: 3,
      name: 'Sarah Brown',
      email: 'sarah.brown@example.com',
      phone: '+1 (555) 456-7890',
      service: 'House Cleaning',
      rating: 4.7,
      totalJobs: 56,
      joinDate: '2023-03-05',
      status: 'pending',
      avatar: 'SB',
      verified: false
    },
    {
      id: 4,
      name: 'Lisa Anderson',
      email: 'lisa.a@example.com',
      phone: '+1 (555) 234-5678',
      service: 'AC Repair',
      rating: 4.6,
      totalJobs: 31,
      joinDate: '2023-01-30',
      status: 'approved',
      avatar: 'LA',
      verified: true
    },
    {
      id: 5,
      name: 'Jennifer Lee',
      email: 'j.lee@example.com',
      phone: '+1 (555) 876-5432',
      service: 'Painting',
      rating: 4.9,
      totalJobs: 27,
      joinDate: '2023-02-14',
      status: 'pending',
      avatar: 'JL',
      verified: false
    },
    {
      id: 6,
      name: 'Michael Wilson',
      email: 'm.wilson@example.com',
      phone: '+1 (555) 345-6789',
      service: 'Gardening',
      rating: 4.5,
      totalJobs: 22,
      joinDate: '2023-04-11',
      status: 'approved',
      avatar: 'MW',
      verified: true
    },
    {
      id: 7,
      name: 'Robert Johnson',
      email: 'robert.j@example.com',
      phone: '+1 (555) 567-8901',
      service: 'Carpentry',
      rating: 4.8,
      totalJobs: 35,
      joinDate: '2023-03-17',
      status: 'pending',
      avatar: 'RJ',
      verified: false
    },
    {
      id: 8,
      name: 'David Taylor',
      email: 'd.taylor@example.com',
      phone: '+1 (555) 678-9012',
      service: 'Appliance Repair',
      rating: 4.7,
      totalJobs: 29,
      joinDate: '2023-01-22',
      status: 'approved',
      avatar: 'DT',
      verified: true
    }
  ];

  useEffect(() => {
    // Simulate API call
    const fetchData = async () => {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 800));
      setProviders(dummyProviders);
      setLoading(false);
    };

    fetchData();
  }, []);

  const getStatusClass = (status) => {
    switch (status) {
      case 'approved': return 'status-approved';
      case 'pending': return 'status-pending';
      case 'rejected': return 'status-rejected';
      default: return '';
    }
  };

  // Filter providers based on search term and status
  const filteredProviders = providers.filter(provider => {
    const matchesSearch = provider.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          provider.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          provider.service.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || provider.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  // Pagination
  const indexOfLastProvider = currentPage * providersPerPage;
  const indexOfFirstProvider = indexOfLastProvider - providersPerPage;
  const currentProviders = filteredProviders.slice(indexOfFirstProvider, indexOfLastProvider);
  const totalPages = Math.ceil(filteredProviders.length / providersPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleApproveProvider = (providerId) => {
    setProviders(providers.map(provider => 
      provider.id === providerId 
        ? { ...provider, status: 'approved' } 
        : provider
    ));
  };

  const handleRejectProvider = (providerId) => {
    setProviders(providers.map(provider => 
      provider.id === providerId 
        ? { ...provider, status: 'rejected' } 
        : provider
    ));
  };

  const handleDeleteProvider = (providerId) => {
    if (window.confirm('Are you sure you want to delete this provider?')) {
      setProviders(providers.filter(provider => provider.id !== providerId));
    }
  };

  return (
    <div className="providers-management">
      <div className="page-header">
        <h1 className="page-title">Providers Management</h1>
        <button className="btn btn-primary">Add New Provider</button>
      </div>

      <div className="filters-section">
        <div className="search-box">
          <input
            type="text"
            placeholder="Search providers..."
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
            <option value="approved">Approved</option>
            <option value="pending">Pending</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>
      </div>

      {loading ? (
        <div className="loading-state">
          <div className="spinner"></div>
          <p>Loading providers...</p>
        </div>
      ) : (
        <>
          <div className="providers-grid">
            {currentProviders.map((provider) => (
              <div key={provider.id} className="provider-card">
                <div className="provider-header">
                  <div className="provider-avatar-large">
                    <div className="avatar-large">
                      {provider.avatar}
                    </div>
                  </div>
                  <div className="provider-info">
                    <div className="provider-name">{provider.name}</div>
                    <div className="provider-id">ID: {provider.id}</div>
                  </div>
                  {provider.verified && (
                    <div className="verified-badge">
                      <svg className="verified-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                    </div>
                  )}
                </div>

                <div className="provider-details">
                  <div className="detail-row">
                    <span className="detail-label">Email:</span>
                    <span className="detail-value">{provider.email}</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">Phone:</span>
                    <span className="detail-value">{provider.phone}</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">Service:</span>
                    <span className="detail-value service-tag">{provider.service}</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">Rating:</span>
                    <span className="detail-value">
                      <div className="rating">
                        <svg className="star-icon" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                        </svg>
                        {provider.rating} ({provider.totalJobs} jobs)
                      </div>
                    </span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">Join Date:</span>
                    <span className="detail-value">{provider.joinDate}</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">Status:</span>
                    <span className={`status-badge ${getStatusClass(provider.status)}`}>
                      {provider.status}
                    </span>
                  </div>
                </div>

                <div className="provider-actions">
                  {provider.status === 'pending' && (
                    <>
                      <button 
                        className="btn btn-sm btn-success"
                        onClick={() => handleApproveProvider(provider.id)}
                      >
                        Approve
                      </button>
                      <button 
                        className="btn btn-sm btn-danger"
                        onClick={() => handleRejectProvider(provider.id)}
                      >
                        Reject
                      </button>
                    </>
                  )}
                  <button 
                    className="btn btn-sm btn-outline"
                    onClick={() => handleDeleteProvider(provider.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
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

export default ProvidersManagement;