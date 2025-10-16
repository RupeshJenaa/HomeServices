import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Header from './Header';
import LocationSearchBar from './LocationSearchBar';
import './PlumbingServices.css';

const PlumbingServices = () => {
  const { user } = useAuth();
  const [userLocation, setUserLocation] = useState('');
  const [providers, setProviders] = useState([]);
  const [filteredProviders, setFilteredProviders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedProvider, setSelectedProvider] = useState(null);
  const [showBookingModal, setShowBookingModal] = useState(false);

  // Mock data - replace with actual API calls
  const mockProviders = [
    {
      id: 1,
      name: 'QuickFix Plumbing',
      rating: 4.8,
      reviews: 127,
      distance: 2.5,
      price: '$80 - $120',
      services: ['Leak Repair', 'Pipe Installation', 'Drain Cleaning'],
      location: 'Downtown',
      image: '/images/plumbing1.jpg',
      available: true,
      responseTime: '30 mins',
      experience: '5 years'
    },
    {
      id: 2,
      name: 'ProPipe Solutions',
      rating: 4.9,
      reviews: 89,
      distance: 5.2,
      price: '$90 - $150',
      services: ['Emergency Repair', 'Water Heater', 'Bathroom Plumbing'],
      location: 'North Area',
      image: '/images/plumbing2.jpg',
      available: true,
      responseTime: '45 mins',
      experience: '8 years'
    },
    {
      id: 3,
      name: 'Drain Masters',
      rating: 4.7,
      reviews: 203,
      distance: 8.1,
      price: '$70 - $100',
      services: ['Drain Cleaning', 'Sewer Repair', 'Pipe Inspection'],
      location: 'East Side',
      image: '/images/plumbing3.jpg',
      available: true,
      responseTime: '25 mins',
      experience: '6 years'
    },
    {
      id: 4,
      name: 'Emergency Plumbers',
      rating: 4.6,
      reviews: 156,
      distance: 12.3,
      price: '$100 - $200',
      services: ['24/7 Emergency', 'Gas Line Repair', 'Water Line'],
      location: 'West End',
      image: '/images/plumbing4.jpg',
      available: true,
      responseTime: '15 mins',
      experience: '10 years'
    },
    {
      id: 5,
      name: 'Eco Plumbing',
      rating: 4.9,
      reviews: 94,
      distance: 18.7,
      price: '$85 - $130',
      services: ['Eco-friendly Solutions', 'Tankless Water Heater'],
      location: 'South District',
      image: '/images/plumbing5.jpg',
      available: false,
      responseTime: '60 mins',
      experience: '7 years'
    }
  ];

  useEffect(() => {
    // Load all providers initially
    setProviders(mockProviders);
    setFilteredProviders(mockProviders);
    
    // Get user's current location if available
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          console.log('User location:', position);
          // In real app, you would reverse geocode to get address
        },
        (error) => {
          console.log('Location access denied');
        }
      );
    }
  }, []);

  const handleLocationSearch = (location) => {
    setUserLocation(location);
    setLoading(true);
    
    // Simulate API call to filter providers within 100km
    setTimeout(() => {
      const filtered = mockProviders.filter(provider => 
        provider.distance <= 100 // Within 100km
      );
      setFilteredProviders(filtered);
      setLoading(false);
    }, 1000);
  };

  const handleBookService = (provider) => {
    setSelectedProvider(provider);
    setShowBookingModal(true);
  };

  const handleConfirmBooking = (bookingData) => {
    // Handle booking confirmation
    console.log('Booking confirmed:', bookingData);
    setShowBookingModal(false);
    // Redirect to bookings page or show success message
  };

  const ProviderCard = ({ provider }) => (
    <div className="provider-card">
      <div className="provider-header">
        <div className="provider-image">
          <img src={provider.image} alt={provider.name} />
          {provider.available && <span className="available-badge">Available</span>}
        </div>
        <div className="provider-info">
          <h3>{provider.name}</h3>
          <div className="rating">
            <span className="stars">⭐ {provider.rating}</span>
            <span className="reviews">({provider.reviews} reviews)</span>
          </div>
          <div className="distance">
            <span className="location-icon">📍</span>
            {provider.distance} km away • {provider.location}
          </div>
        </div>
      </div>
      
      <div className="provider-details">
        <div className="price-section">
          <span className="price">{provider.price}</span>
          <span className="response-time">Response: {provider.responseTime}</span>
        </div>
        
        <div className="services-list">
          <h4>Services Offered:</h4>
          <div className="service-tags">
            {provider.services.map((service, index) => (
              <span key={index} className="service-tag">{service}</span>
            ))}
          </div>
        </div>
        
        <div className="experience">
          <span>Experience: {provider.experience}</span>
        </div>
      </div>
      
      <div className="provider-actions">
        <button 
          className="btn-primary"
          onClick={() => handleBookService(provider)}
          disabled={!provider.available}
        >
          {provider.available ? 'Book Now' : 'Not Available'}
        </button>
        <button className="btn-outline">View Profile</button>
        <button className="btn-secondary">Message</button>
      </div>
    </div>
  );

  const BookingModal = ({ provider, onClose, onConfirm }) => {
    const [bookingData, setBookingData] = useState({
      date: '',
      time: '',
      address: userLocation,
      problemDescription: '',
      urgency: 'normal'
    });

    const handleSubmit = (e) => {
      e.preventDefault();
      onConfirm({
        ...bookingData,
        provider: provider,
        totalPrice: provider.price
      });
    };

    return (
      <div className="modal-overlay">
        <div className="booking-modal">
          <div className="modal-header">
            <h2>Book Plumbing Service</h2>
            <button className="close-btn" onClick={onClose}>×</button>
          </div>
          
          <div className="provider-summary">
            <h3>{provider.name}</h3>
            <p>Rating: ⭐ {provider.rating} • {provider.reviews} reviews</p>
            <p className="price">Estimated Cost: {provider.price}</p>
          </div>

          <form onSubmit={handleSubmit} className="booking-form">
            <div className="form-group">
              <label>Service Address</label>
              <input
                type="text"
                value={bookingData.address}
                onChange={(e) => setBookingData({...bookingData, address: e.target.value})}
                required
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Preferred Date</label>
                <input
                  type="date"
                  value={bookingData.date}
                  onChange={(e) => setBookingData({...bookingData, date: e.target.value})}
                  required
                />
              </div>
              
              <div className="form-group">
                <label>Preferred Time</label>
                <select
                  value={bookingData.time}
                  onChange={(e) => setBookingData({...bookingData, time: e.target.value})}
                  required
                >
                  <option value="">Select Time</option>
                  <option value="09:00">9:00 AM</option>
                  <option value="10:00">10:00 AM</option>
                  <option value="11:00">11:00 AM</option>
                  <option value="12:00">12:00 PM</option>
                  <option value="14:00">2:00 PM</option>
                  <option value="15:00">3:00 PM</option>
                  <option value="16:00">4:00 PM</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label>Urgency Level</label>
              <select
                value={bookingData.urgency}
                onChange={(e) => setBookingData({...bookingData, urgency: e.target.value})}
              >
                <option value="normal">Normal</option>
                <option value="urgent">Urgent (Today)</option>
                <option value="emergency">Emergency (Within 2 hours)</option>
              </select>
            </div>

            <div className="form-group">
              <label>Problem Description</label>
              <textarea
                placeholder="Describe your plumbing issue in detail..."
                value={bookingData.problemDescription}
                onChange={(e) => setBookingData({...bookingData, problemDescription: e.target.value})}
                rows="4"
                required
              />
            </div>

            <div className="form-actions">
              <button type="button" className="btn-secondary" onClick={onClose}>
                Cancel
              </button>
              <button type="submit" className="btn-primary">
                Confirm Booking
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  return (
    <div className="plumbing-services-page">
      <Header />
      
      {/* Location Search Section */}
      <div className="location-search-section">
        <div className="container">
          <div className="search-header">
            <h1>Plumbing Services</h1>
            <p>Find professional plumbers near your location</p>
          </div>
          <LocationSearchBar onSearch={handleLocationSearch} />
        </div>
      </div>

      {/* Results Section */}
      <div className="results-section">
        <div className="container">
          <div className="results-header">
            <h2>
              {loading ? 'Finding plumbers...' : `${filteredProviders.length} Plumbers Available`}
              {userLocation && ` near ${userLocation}`}
            </h2>
            <div className="filter-options">
              <select className="filter-select">
                <option>Sort by: Distance</option>
                <option>Sort by: Rating</option>
                <option>Sort by: Price</option>
              </select>
              <select className="filter-select">
                <option>All Services</option>
                <option>Emergency</option>
                <option>Installation</option>
                <option>Repair</option>
              </select>
            </div>
          </div>

          {loading ? (
            <div className="loading-section">
              <div className="loading-spinner"></div>
              <p>Searching for plumbers in your area...</p>
            </div>
          ) : (
            <div className="providers-grid">
              {filteredProviders.map(provider => (
                <ProviderCard key={provider.id} provider={provider} />
              ))}
            </div>
          )}

          {filteredProviders.length === 0 && !loading && (
            <div className="no-results">
              <h3>No plumbers found in your area</h3>
              <p>Try searching a different location or expand your search radius</p>
              <button className="btn-primary" onClick={() => setFilteredProviders(mockProviders)}>
                Show All Providers
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Additional Info Section */}
      <div className="info-section">
        <div className="container">
          <div className="info-grid">
            <div className="info-card">
              <div className="info-icon">⚡</div>
              <h3>Emergency Service</h3>
              <p>24/7 emergency plumbing services available for urgent issues</p>
            </div>
            <div className="info-card">
              <div className="info-icon">💰</div>
              <h3>Price Guarantee</h3>
              <p>Get the best prices with our competitive rate matching</p>
            </div>
            <div className="info-card">
              <div className="info-icon">🛡️</div>
              <h3>Quality Assured</h3>
              <p>All plumbers are verified, licensed, and insured</p>
            </div>
          </div>
        </div>
      </div>

      {/* Booking Modal */}
      {showBookingModal && (
        <BookingModal
          provider={selectedProvider}
          onClose={() => setShowBookingModal(false)}
          onConfirm={handleConfirmBooking}
        />
      )}
    </div>
  );
};

export default PlumbingServices;