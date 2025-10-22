import React, { useState, useEffect } from 'react';
import { adminAPI } from '../../api/adminAPI';
import '../../components/admin/AdminLayout.css'; // Corrected import path

const ProvidersManagement = () => {
  const [providers, setProviders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [approvalFilter, setApprovalFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchProviders = async () => {
      try {
        setLoading(true);
        const response = await adminAPI.getProviders({
          page: currentPage,
          limit: 10,
          search: searchTerm,
          approved: approvalFilter
        });
        
        setProviders(response.data || []);
        setTotalPages(response.totalPages || 1);
      } catch (err) {
        console.error('Error fetching providers:', err);
        setError('Failed to load providers');
      } finally {
        setLoading(false);
      }
    };

    fetchProviders();
  }, [currentPage, searchTerm, approvalFilter]);

  const handleApprovalChange = async (providerId, isApproved) => {
    try {
      await adminAPI.approveProvider(providerId, isApproved);
      // Update provider approval status in the local state
      setProviders(providers.map(provider => 
        provider._id === providerId 
          ? {...provider, providerInfo: {...provider.providerInfo, isApproved}} 
          : provider
      ));
    } catch (err) {
      console.error('Error updating provider approval status:', err);
      setError('Failed to update provider approval status');
    }
  };

  const filteredProviders = providers.filter(provider => 
    (provider.name && provider.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (provider.email && provider.email.toLowerCase().includes(searchTerm.toLowerCase()))
  ).filter(provider => 
    approvalFilter !== '' ? provider.providerInfo?.isApproved.toString() === approvalFilter : true
  );

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  if (loading) {
    return (
      <div className="admin-page">
        <h1 className="dashboard-title">Providers Management</h1>
        <div className="loading-container">
          <div className="spinner"></div>
          <p>Loading providers...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="admin-page">
        <h1 className="dashboard-title">Providers Management</h1>
        <div className="error-container">
          <p>{error}</p>
        </div>
      </div>
    );
  }

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
                          {provider.name ? provider.name.charAt(0).toUpperCase() : 'P'}
                        </div>
                      </div>
                      <div className="user-name">
                        {provider.name || 'Unknown'}
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="provider-services">
                      {provider.providerInfo?.services?.map(service => service.name).join(', ') || 'N/A'}
                    </div>
                  </td>
                  <td>
                    {provider.email || 'N/A'}
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
                    {provider.createdAt ? new Date(provider.createdAt).toLocaleDateString() : 'N/A'}
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