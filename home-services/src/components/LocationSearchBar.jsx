import React, { useState } from 'react';
import './LocationSearchBar.css';

const LocationSearchBar = ({ onSearch }) => {
  const [location, setLocation] = useState('');

  const handleSearch = () => {
    if (location.trim() && onSearch) {
      onSearch(location.trim());
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          // In real app, you would reverse geocode to get address
          const currentLocation = `Current Location (${latitude.toFixed(4)}, ${longitude.toFixed(4)})`;
          setLocation(currentLocation);
          if (onSearch) {
            onSearch(currentLocation);
          }
        },
        (error) => {
          alert('Unable to get your current location. Please enter manually.');
        }
      );
    }
  };

  return (
    <div className="location-search-bar">
      <div className="search-container">
        <div className="search-input-wrapper">
          <span className="location-icon">📍</span>
          <input
            type="text"
            placeholder="Enter your location to find plumbers near you..."
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            onKeyPress={handleKeyPress}
            className="location-input"
          />
        </div>
        <div className="search-buttons">
          <button onClick={handleCurrentLocation} className="btn-current-location">
            Use Current Location
          </button>
          <button onClick={handleSearch} className="search-btn">
            Find Plumbers
          </button>
        </div>
      </div>
    </div>
  );
};

export default LocationSearchBar;