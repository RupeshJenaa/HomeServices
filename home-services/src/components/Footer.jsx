import React, { useState, useEffect } from 'react';

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');

  // Check if user is logged in (you can replace this with your actual auth logic)
  useEffect(() => {
    // Simulating authentication check
    const checkAuthStatus = () => {
      const token = localStorage.getItem('authToken');
      const user = localStorage.getItem('userName');
      if (token && user) {
        setIsLoggedIn(true);
        setUserName(user);
      }
    };

    checkAuthStatus();
  }, []);

  const handleLogin = () => {
    // Simulate login - replace with your actual login logic
    localStorage.setItem('authToken', 'dummy-token');
    localStorage.setItem('userName', 'John Doe');
    setIsLoggedIn(true);
    setUserName('John Doe');
  };

  const handleLogout = () => {
    // Simulate logout - replace with your actual logout logic
    localStorage.removeItem('authToken');
    localStorage.removeItem('userName');
    setIsLoggedIn(false);
    setUserName('');
  };

  const handleSignup = () => {
    // Redirect to signup page or show signup modal
    console.log('Redirect to signup');
  };

  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Company Name */}
          <div className="flex-shrink-0">
            <h1 className="text-2xl font-bold text-gray-800">Home Services</h1>
          </div>

          {/* Auth Section */}
          <div className="flex items-center space-x-4">
            {isLoggedIn ? (
              // Show user name and logout when logged in
              <div className="flex items-center space-x-4">
                <span className="text-gray-700">Welcome, {userName}</span>
                <button
                  onClick={handleLogout}
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md text-sm font-medium transition duration-200"
                >
                  Logout
                </button>
              </div>
            ) : (
              // Show login/signup when not logged in
              <div className="flex items-center space-x-4">
                <button
                  onClick={handleLogin}
                  className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition duration-200"
                >
                  Login
                </button>
                <button
                  onClick={handleSignup}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium transition duration-200"
                >
                  Sign Up
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;