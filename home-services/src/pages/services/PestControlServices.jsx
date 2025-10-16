import React from 'react';
import ServiceTemplate from './ServiceTemplate';

const PestControlServices = () => {
  const mockProviders = [
    {
      id: 1,
      name: 'Bug Busters',
      rating: 4.9,
      reviews: 234,
      distance: 3.5,
      price: '$120 - $250',
      services: ['Insect Control', 'Rodent Removal', 'Termite Treatment', 'Prevention'],
      location: 'Green Valley',
      available: true,
      responseTime: 'Same day',
      experience: '8 years'
    }
  ];

  return (
    <ServiceTemplate
      serviceName="Pest Control"
      serviceIcon="🐛"
      serviceDescription="Effective pest control and prevention services"
      mockProviders={mockProviders}
      serviceColor="#EF4444"
    />
  );
};

export default PestControlServices;