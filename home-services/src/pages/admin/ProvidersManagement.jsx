import React, { useState, useEffect } from 'react';
import '../../components/admin/AdminLayout.css'; // Corrected import path

const ProvidersManagement = () => {
  const [providers, setProviders] = useState([
    {
      _id: '1',
      name: 'Anna Davis',
      email: 'anna.davis@example.com',
      phone: '+1 (555) 987-6543',
      providerInfo: {
        isApproved: true,
        services: [
          { name: 'Plumbing Repair' },
          { name: 'Pipe Installation' }
        ]
      },
      createdAt: '2023-02-20T14:45:00Z'
    },
    {
      _id: '2',
      name: 'Lisa Taylor',
      email: 'lisa.taylor@example.com',
      phone: '+1 (555) 234-5678',
      providerInfo: {
        isApproved: true,
        services: [
          { name: 'Electrical Work' },
          { name: 'Lighting Installation' }
        ]
      },
      createdAt: '2023-04-05T16:20:00Z'
    },
    {
      _id: '3',
      name: 'James Miller',
      email: 'james.miller@example.com',
      phone: '+1 (555) 567-8901',
      providerInfo: {
        isApproved: false,
        services: [
          { name: 'AC Service' },
          { name: 'Heating Repair' }
        ]
      },
      createdAt: '2023-05-18T10:30:00Z'
    },
    {
      _id: '4',
      name: 'David Wilson',
      email: 'david.wilson@example.com',
      phone: '+1 (555) 345-6789',
      providerInfo: {
        isApproved: true,
        services: [
          { name: 'Cleaning Service' },
          { name: 'Carpet Cleaning' }
        ]
      },
      createdAt: '2023-03-22T13:15:00Z'
    },
    {
      _id: '5',
      name: 'Mike Johnson',
      email: 'mike.johnson@example.com',
      phone: '+1 (555) 789-0123',
      providerInfo: {
        isApproved: false,
        services: [
          { name: 'Painting' },
          { name: 'Wallpaper Removal' }
        ]
      },
      createdAt: '2023-06-01T09:45:00Z'
    }
  ]);
  
  const [loading, setLoading] = useState(false); // Remove loading simulation
  const [searchTerm, setSearchTerm] = useState('');
  const [approvalFilter, setApprovalFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Remove the useEffect that simulates API calls
  // useEffect(() => {
  //   const fetchProviders = async () => {
  //     setLoading(true);
  //     // Simulate API delay
  //     await new Promise(resolve => setTimeout(resolve, 1000));
  //     setLoading(false);
  //   };

  //   fetchProviders();
  // }, [currentPage, approvalFilter]);

  const handleApprovalChange = async (providerId, isApproved) => {
    // Update provider approval status in the local state
    setProviders(providers.map(provider => 
      provider._id === providerId 
        ? {...provider, providerInfo: {...provider.providerInfo, isApproved}} 
        : provider
    ));
  };

  const filteredProviders = providers.filter(provider => 
    provider.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    provider.email.toLowerCase().includes(searchTerm.toLowerCase())
  ).filter(provider => 
    approvalFilter !== '' ? provider.providerInfo?.isApproved.toString() === approvalFilter : true
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
  //       <h1 className="dashboard-title">Providers Management</h1>
  //       <div className="loading-container">
  //         <div className="spinner"></div>
  //       </div>
  //     </div>
  //   );
  // }

  return (
    <div className="admin-page">
      <h1 className="dashboard-title">Providers Management</h1>
      
      {/* Filters */}
      <div className="admin-filters">
        <div className="admin-filter-group">
          <div>
            <label htmlFor="search" className="admin-filter-label">
              Search Providers
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
            <label htmlFor="approval" className="admin-filter-label">
              Filter by Approval
            </label>
            <select
              id="approval"
              className="admin-filter-input"
              value={approvalFilter}
              onChange={(e) => setApprovalFilter(e.target.value)}
            >
              <option value="">All Providers</option>
              <option value="true">Approved</option>
              <option value="false">Pending Approval</option>
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

      {/* Providers Table */}
      <div className="admin-table-container">
        <div className="admin-table-wrapper">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Provider</th>
                <th>Services</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Approval Status</th>
                <th>Joined</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredProviders.map((provider) => (
                <tr key={provider._id}>
                  <td>
                    <div className="user-info">
                      <div className="user-avatar-small">
                        <div className="avatar-small">
                          {provider.name.charAt(0).toUpperCase()}
                        </div>
                      </div>
                      <div className="user-name">
                        {provider.name}
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="provider-services">
                      {provider.providerInfo?.services?.map(service => service.name).join(', ') || 'N/A'}
                    </div>
                  </td>
                  <td>
                    {provider.email}
                  </td>
                  <td>
                    {provider.phone || 'N/A'}
                  </td>
                  <td>
                    <span className={`status-badge ${provider.providerInfo?.isApproved ? 'active' : 'pending'}`}>
                      {provider.providerInfo?.isApproved ? 'Approved' : 'Pending'}
                    </span>
                  </td>
                  <td>
                    {new Date(provider.createdAt).toLocaleDateString()}
                  </td>
                  <td>
                    {!provider.providerInfo?.isApproved ? (
                      <button
                        onClick={() => handleApprovalChange(provider._id, true)}
                        className="status-toggle activate"
                      >
                        Approve
                      </button>
                    ) : (
                      <button
                        onClick={() => handleApprovalChange(provider._id, false)}
                        className="status-toggle deactivate"
                      >
                        Disapprove
                      </button>
                    )}
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

export default ProvidersManagement;