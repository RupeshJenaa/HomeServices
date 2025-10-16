import React from 'react';
import { Link } from 'react-router-dom';
import './ServiceIconsGrid.css';

const ServiceIconsGrid = () => {
  const services = [
    { 
      id: 1, 
      name: 'Plumbing', 
      icon: '🚰', 
      path: '/services/plumbing', 
      color: '#3B82F6',
      description: 'Pipe repair, installation & maintenance'
    },
    // ... other services
  ];

  return (
    <div className="service-icons-grid">
      {services.map(service => (
        <Link key={service.id} to={service.path} className="service-icon-card">
          <div 
            className="service-icon"
            style={{ backgroundColor: `${service.color}20`, color: service.color }}
          >
            {service.icon}
          </div>
          <span className="service-name">{service.name}</span>
          <p className="service-description">{service.description}</p>
        </Link>
      ))}
    </div>
  );
};

export default ServiceIconsGrid;