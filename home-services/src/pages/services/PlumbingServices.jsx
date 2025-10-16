import React from 'react';
import ServiceTemplate from './ServiceTemplate';

const PlumbingServices = () => {
  const mockProviders = [
    {
      id: 1,
      name: 'QuickFix Plumbing',
      rating: 4.8,
      reviews: 127,
      distance: 2.5,
      price: '$80 - $120',
      services: ['Leak Repair', 'Pipe Installation', 'Drain Cleaning', 'Faucet Repair'],
      location: 'Downtown',
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
      services: ['Emergency Repair', 'Water Heater', 'Bathroom Plumbing', 'Gas Line'],
      location: 'North Area',
      available: true,
      responseTime: '45 mins',
      experience: '8 years'
    }
  ];

  return (
    <ServiceTemplate
      serviceName="Plumbing"
      serviceIcon="🚰"
      serviceDescription="Professional plumbing services for repairs, installations, and maintenance"
      mockProviders={mockProviders}
      serviceColor="#3B82F6"
    />
  );
};

export default PlumbingServices;