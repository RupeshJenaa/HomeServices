import React from 'react';
import ServiceTemplate from './ServiceTemplate';

const CleaningServices = () => {
  const mockProviders = [
    {
      id: 1,
      name: 'Sparkle Clean',
      rating: 4.7,
      reviews: 289,
      distance: 1.8,
      price: '$60 - $100',
      services: ['Deep Cleaning', 'Move In/Out', 'Office Cleaning', 'Carpet Cleaning'],
      location: 'Downtown',
      available: true,
      responseTime: '24 hours',
      experience: '4 years'
    }
  ];

  return (
    <ServiceTemplate
      serviceName="Cleaning"
      serviceIcon="🧹"
      serviceDescription="Professional cleaning services for homes and offices"
      mockProviders={mockProviders}
      serviceColor="#10B981"
    />
  );
};

export default CleaningServices;