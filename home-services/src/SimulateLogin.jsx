import React from 'react';

const SimulateLogin = () => {
  const simulateAdminLogin = () => {
    // Create a mock admin user
    const adminUser = {
      id: 'admin123',
      name: 'Admin User',
      email: 'admin@homeservices.com',
      role: 'admin',
      isActive: true
    };
    
    // Store in localStorage
    localStorage.setItem('userData', JSON.stringify(adminUser));
    localStorage.setItem('token', 'mock-jwt-token');
    
    // Redirect to admin dashboard
    window.location.href = '/admin/dashboard';
  };
  
  const clearLogin = () => {
    localStorage.removeItem('userData');
    localStorage.removeItem('token');
    window.location.reload();
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>Simulate Login</h1>
      <p>Use these buttons to simulate login/logout for testing purposes.</p>
      
      <div style={{ marginTop: '20px' }}>
        <button 
          onClick={simulateAdminLogin}
          style={{
            padding: '10px 20px',
            backgroundColor: '#4f46e5',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            marginRight: '10px'
          }}
        >
          Simulate Admin Login
        </button>
        
        <button 
          onClick={clearLogin}
          style={{
            padding: '10px 20px',
            backgroundColor: '#ef4444',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer'
          }}
        >
          Clear Login
        </button>
      </div>
      
      <div style={{ marginTop: '20px', padding: '10px', backgroundColor: '#f0f0f0', borderRadius: '5px' }}>
        <h2>Current Login Status</h2>
        <p>User Data: {localStorage.getItem('userData') || 'None'}</p>
        <p>Token: {localStorage.getItem('token') || 'None'}</p>
      </div>
    </div>
  );
};

export default SimulateLogin;