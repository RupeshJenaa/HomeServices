import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Header from '../../components/Header';
import LocationSearchBar from '../../components/LocationSearchBar';
import './Services.css';

const ServiceTemplate = ({ 
  serviceName, 
  serviceIcon, 
  serviceDescription, 
  mockProviders,
  serviceColor = '#3B82F6'
}) => {
  const { user, createBookingNotification } = useAuth();
  const navigate = useNavigate();
  const [userLocation, setUserLocation] = useState('');
  const [providers, setProviders] = useState([]);
  const [filteredProviders, setFilteredProviders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedProvider, setSelectedProvider] = useState(null);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);

  useEffect(() => {
    setProviders(mockProviders);
    setFilteredProviders(mockProviders);
  }, [mockProviders]);

  const handleLocationSearch = (location) => {
    setUserLocation(location);
    setLoading(true);
    
    setTimeout(() => {
      const filtered = mockProviders.filter(provider => provider.distance <= 100);
      setFilteredProviders(filtered);
      setLoading(false);
    }, 1000);
  };

  const handleBookService = (provider) => {
    if (!user) {
      alert('Please login to book a service');
      navigate('/login', { state: { returnUrl: `/services/${serviceName.toLowerCase()}` } });
      return;
    }
    setSelectedProvider(provider);
    setShowBookingModal(true);
  };

  const handleConfirmBooking = (bookingData) => {
    const bookingId = `BK${Date.now()}`;
    
    // Create the booking object
    const booking = {
      id: bookingId,
      customer: {
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone || 'Not provided'
      },
      provider: bookingData.provider,
      service: serviceName,
      date: bookingData.date,
      time: bookingData.time,
      address: bookingData.address,
      problemDescription: bookingData.problemDescription,
      urgency: bookingData.urgency,
      price: bookingData.provider.price,
      status: 'pending',
      timestamp: new Date().toISOString(),
      serviceIcon: serviceIcon,
      serviceColor: serviceColor
    };

    // Save booking to localStorage (in real app, this would be an API call)
    const existingBookings = JSON.parse(localStorage.getItem('bookings') || '[]');
    localStorage.setItem('bookings', JSON.stringify([booking, ...existingBookings]));

    // Create notifications for provider and customer
    createBookingNotification({
      customer: user,
      provider: bookingData.provider,
      service: serviceName,
      urgency: bookingData.urgency,
      bookingId: bookingId
    });

    console.log('Booking confirmed:', booking);
    setShowBookingModal(false);
    setBookingSuccess(true);
    
    // Auto-hide success message after 5 seconds
    setTimeout(() => {
      setBookingSuccess(false);
    }, 5000);
  };

  const ProviderCard = ({ provider }) => (
    <div className="provider-card">
      <div className="provider-header">
        <div className="provider-image">
          <div 
            className="service-image-placeholder"
            style={{ backgroundColor: `${serviceColor}20`, color: serviceColor }}
          >
            {serviceIcon}
          </div>
          {provider.available && <span className="available-badge">Available</span>}
          {!provider.available && <span className="unavailable-badge">Busy</span>}
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
          {provider.specialty && (
            <div className="specialty">
              <span className="specialty-badge">Specialist</span>
            </div>
          )}
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
        
        <div className="provider-meta">
          <div className="experience">
            <span>📅 {provider.experience}</span>
          </div>
          {provider.certified && (
            <div className="certified">
              <span>✅ Certified Professional</span>
            </div>
          )}
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
      address: userLocation || user?.address || '',
      problemDescription: '',
      urgency: 'normal'
    });

    const [errors, setErrors] = useState({});

    const handleSubmit = (e) => {
      e.preventDefault();
      
      // Validate form
      const newErrors = {};
      if (!bookingData.date) newErrors.date = 'Please select a date';
      if (!bookingData.time) newErrors.time = 'Please select a time';
      if (!bookingData.address.trim()) newErrors.address = 'Please enter your address';
      if (!bookingData.problemDescription.trim()) newErrors.problemDescription = 'Please describe the issue';

      if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors);
        return;
      }

      setErrors({});
      onConfirm({
        ...bookingData,
        provider: provider,
        totalPrice: provider.price,
        service: serviceName
      });
    };

    const today = new Date().toISOString().split('T')[0];

    return (
      <div className="modal-overlay">
        <div className="booking-modal">
          <div className="modal-header">
            <h2>Book {serviceName} Service</h2>
            <button className="close-btn" onClick={onClose}>×</button>
          </div>
          
          <div className="provider-summary">
            <div className="provider-badge">
              <div 
                className="provider-icon"
                style={{ backgroundColor: `${serviceColor}20`, color: serviceColor }}
              >
                {serviceIcon}
              </div>
              <div className="provider-details">
                <h3>{provider.name}</h3>
                <p>⭐ {provider.rating} • {provider.reviews} reviews</p>
                <p className="price">Estimated Cost: {provider.price}</p>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="booking-form">
            <div className="form-group">
              <label>Service Address *</label>
              <input
                type="text"
                value={bookingData.address}
                onChange={(e) => setBookingData({...bookingData, address: e.target.value})}
                placeholder="Enter your complete address for service"
                className={errors.address ? 'error' : ''}
              />
              {errors.address && <span className="error-message">{errors.address}</span>}
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Preferred Date *</label>
                <input
                  type="date"
                  value={bookingData.date}
                  onChange={(e) => setBookingData({...bookingData, date: e.target.value})}
                  min={today}
                  className={errors.date ? 'error' : ''}
                />
                {errors.date && <span className="error-message">{errors.date}</span>}
              </div>
              
              <div className="form-group">
                <label>Preferred Time *</label>
                <select
                  value={bookingData.time}
                  onChange={(e) => setBookingData({...bookingData, time: e.target.value})}
                  className={errors.time ? 'error' : ''}
                >
                  <option value="">Select Time</option>
                  <option value="08:00">8:00 AM</option>
                  <option value="09:00">9:00 AM</option>
                  <option value="10:00">10:00 AM</option>
                  <option value="11:00">11:00 AM</option>
                  <option value="12:00">12:00 PM</option>
                  <option value="13:00">1:00 PM</option>
                  <option value="14:00">2:00 PM</option>
                  <option value="15:00">3:00 PM</option>
                  <option value="16:00">4:00 PM</option>
                  <option value="17:00">5:00 PM</option>
                </select>
                {errors.time && <span className="error-message">{errors.time}</span>}
              </div>
            </div>

            <div className="form-group">
              <label>Urgency Level</label>
              <select
                value={bookingData.urgency}
                onChange={(e) => setBookingData({...bookingData, urgency: e.target.value})}
              >
                <option value="normal">🟢 Normal (Within 2-3 days)</option>
                <option value="urgent">🟡 Urgent (Tomorrow)</option>
                <option value="emergency">🔴 Emergency (Today - Extra charges may apply)</option>
              </select>
              <small className="helper-text">
                {bookingData.urgency === 'emergency' && 
                 'Emergency bookings may include additional charges for immediate service'}
              </small>
            </div>

            <div className="form-group">
              <label>Service Description *</label>
              <textarea
                placeholder={`Describe your ${serviceName.toLowerCase()} issue in detail. This helps the professional come prepared with the right tools and parts.`}
                value={bookingData.problemDescription}
                onChange={(e) => setBookingData({...bookingData, problemDescription: e.target.value})}
                rows="4"
                className={errors.problemDescription ? 'error' : ''}
              />
              {errors.problemDescription && <span className="error-message">{errors.problemDescription}</span>}
            </div>

            <div className="booking-summary">
              <h4>Booking Summary</h4>
              <div className="summary-item">
                <span>Service:</span>
                <span>{serviceName}</span>
              </div>
              <div className="summary-item">
                <span>Professional:</span>
                <span>{provider.name}</span>
              </div>
              <div className="summary-item">
                <span>Estimated Cost:</span>
                <span className="price">{provider.price}</span>
              </div>
            </div>

            <div className="form-actions">
              <button type="button" className="btn-secondary" onClick={onClose}>
                Cancel
              </button>
              <button type="submit" className="btn-primary">
                Confirm Booking - {provider.price}
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  const SuccessMessage = () => (
    <div className="success-message">
      <div className="success-content">
        <div className="success-icon">✅</div>
        <div className="success-text">
          <h3>Booking Confirmed!</h3>
          <p>Your {serviceName} service has been booked successfully. The professional has been notified and will contact you soon.</p>
          <div className="success-actions">
            <Link to="/customer/bookings" className="btn-primary">
              View My Bookings
            </Link>
            <button 
              className="btn-outline" 
              onClick={() => setBookingSuccess(false)}
            >
              Continue Browsing
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="services-page">
      <Header />
      
      {/* Success Message */}
      {bookingSuccess && <SuccessMessage />}

      <div className="location-search-section">
        <div className="container">
          <div className="search-header">
            <div className="service-title">
              <span className="service-icon-large" style={{ color: serviceColor }}>
                {serviceIcon}
              </span>
              <div>
                <h1>{serviceName} Services</h1>
                <p>{serviceDescription}</p>
              </div>
            </div>
          </div>
          <LocationSearchBar onSearch={handleLocationSearch} />
        </div>
      </div>

      <div className="results-section">
        <div className="container">
          <div className="results-header">
            <h2>
              {loading ? `Finding ${serviceName.toLowerCase()} professionals...` : 
               `${filteredProviders.length} ${serviceName} Professionals Available`}
              {userLocation && ` near ${userLocation}`}
            </h2>
            <div className="sort-options">
              <span>Sort by:</span>
              <select onChange={(e) => {
                // Add sorting logic here
                console.log('Sort by:', e.target.value);
              }}>
                <option value="distance">Distance</option>
                <option value="rating">Rating</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="experience">Experience</option>
              </select>
            </div>
          </div>

          {loading ? (
            <div className="loading-section">
              <div className="loading-spinner"></div>
              <p>Searching for professionals in your area...</p>
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
              <h3>No {serviceName.toLowerCase()} professionals found in your area</h3>
              <p>Try searching a different location or expand your search radius</p>
              <button 
                className="btn-primary" 
                onClick={() => setFilteredProviders(providers)}
              >
                Show All Professionals
              </button>
            </div>
          )}
        </div>
      </div>

      {showBookingModal && selectedProvider && (
        <BookingModal
          provider={selectedProvider}
          onClose={() => setShowBookingModal(false)}
          onConfirm={handleConfirmBooking}
        />
      )}
    </div>
  );
};

export default ServiceTemplate;