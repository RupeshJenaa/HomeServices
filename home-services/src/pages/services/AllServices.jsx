import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/Header';
import LocationSearchBar from '../../components/LocationSearchBar';
import './Services.css';

const AllServices = () => {
  const services = [
    {
      id: 1,
      name: 'Plumbing',
      icon: '🚰',
      path: '/services/plumbing',
      color: '#3B82F6',
      description: 'Pipe repair, installation & maintenance',
      popular: true
    },
    {
      id: 2,
      name: 'Electrical',
      icon: '💡',
      path: '/services/electrical',
      color: '#F59E0B',
      description: 'Wiring, repairs & installations',
      popular: true
    },
    {
      id: 3,
      name: 'Cleaning',
      icon: '🧹',
      path: '/services/cleaning',
      color: '#10B981',
      description: 'Home & office cleaning services',
      popular: true
    },
    {
      id: 4,
      name: 'AC Repair',
      icon: '❄️',
      path: '/services/ac-repair',
      color: '#06B6D4',
      description: 'AC maintenance & repair',
      popular: false
    },
    {
      id: 5,
      name: 'Painting',
      icon: '🎨',
      path: '/services/painting',
      color: '#8B5CF6',
      description: 'Interior & exterior painting',
      popular: false
    },
    {
      id: 6,
      name: 'Carpentry',
      icon: '🪚',
      path: '/services/carpentry',
      color: '#F97316',
      description: 'Furniture & woodwork',
      popular: false
    },
    {
      id: 7,
      name: 'Pest Control',
      icon: '🐛',
      path: '/services/pest-control',
      color: '#EF4444',
      description: 'Pest removal & prevention',
      popular: true
    },
    {
      id: 8,
      name: 'Appliance Repair',
      icon: '🔧',
      path: '/services/appliance-repair',
      color: '#6B7280',
      description: 'Home appliance repairs',
      popular: false
    }
  ];

  const popularServices = services.filter(service => service.popular);
  const allServices = services;

  return (
    <div className="services-page">
      <Header />
      
      {/* Hero Section */}
      <div className="services-hero">
        <div className="container">
          <div className="hero-content">
            <h1>Professional Home Services</h1>
            <p>Book trusted professionals for all your home maintenance needs</p>
            <LocationSearchBar onSearch={(location) => console.log('Search:', location)} />
          </div>
        </div>
      </div>

      {/* Popular Services */}
      <div className="services-section">
        <div className="container">
          <div className="section-header">
            <h2>Most Popular Services</h2>
            <p>Quick solutions for your common home needs</p>
          </div>
          <div className="services-grid">
            {popularServices.map(service => (
              <Link key={service.id} to={service.path} className="service-card-large">
                <div 
                  className="service-icon-large"
                  style={{ backgroundColor: `${service.color}20`, color: service.color }}
                >
                  {service.icon}
                </div>
                <div className="service-content">
                  <h3>{service.name}</h3>
                  <p>{service.description}</p>
                  <span className="service-link">Book Now →</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* All Services */}
      <div className="services-section bg-gray-50">
        <div className="container">
          <div className="section-header">
            <h2>All Services</h2>
            <p>Complete home maintenance solutions</p>
          </div>
          <div className="all-services-grid">
            {allServices.map(service => (
              <Link key={service.id} to={service.path} className="service-item">
                <div 
                  className="service-item-icon"
                  style={{ backgroundColor: `${service.color}20`, color: service.color }}
                >
                  {service.icon}
                </div>
                <div className="service-item-info">
                  <h4>{service.name}</h4>
                  <p>{service.description}</p>
                </div>
                <div className="service-item-arrow">→</div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Why Choose Us */}
      <div className="features-section">
        <div className="container">
          <div className="section-header">
            <h2>Why Choose HomeServices?</h2>
          </div>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">🔒</div>
              <h3>Verified Professionals</h3>
              <p>All service providers are background-checked and verified</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">💰</div>
              <h3>Best Price Guarantee</h3>
              <p>Get competitive prices with our rate matching</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">⚡</div>
              <h3>Quick Response</h3>
              <p>Most services available within 24 hours</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🛡️</div>
              <h3>Quality Assured</h3>
              <p>100% satisfaction guarantee on all services</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllServices;