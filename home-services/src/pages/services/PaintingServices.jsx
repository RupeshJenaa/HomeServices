import React from 'react';
import ServiceTemplate from './ServiceTemplate';

const PaintingServices = () => {
  const mockProviders = [
    {
      id: 1,
      name: 'Color Masters',
      rating: 4.7,
      reviews: 178,
      distance: 4.2,
      price: '$200 - $500',
      services: ['Interior Painting', 'Exterior Painting', 'Wall Texture', 'Color Consultation'],
      location: 'Arts District',
      available: true,
      responseTime: '2 days',
      experience: '6 years'
    }
  ];

  return (
    <ServiceTemplate
      serviceName="Painting"
      serviceIcon="🎨"
      serviceDescription="Professional painting services for interior and exterior"
      mockProviders={mockProviders}
      serviceColor="#8B5CF6"
    />
  );
};

export default PaintingServices;