import React from 'react';
import ServiceTemplate from './ServiceTemplate';

const CarpentryServices = () => {
  const mockProviders = [
    {
      id: 1,
      name: 'Wood Craft Masters',
      rating: 4.8,
      reviews: 145,
      distance: 6.8,
      price: '$100 - $300',
      services: ['Furniture Repair', 'Custom Cabinets', 'Door Installation', 'Wood Flooring'],
      location: 'North Woods',
      available: true,
      responseTime: '3 days',
      experience: '10 years'
    }
  ];

  return (
    <ServiceTemplate
      serviceName="Carpentry"
      serviceIcon="🪚"
      serviceDescription="Expert carpentry and woodworking services"
      mockProviders={mockProviders}
      serviceColor="#F97316"
    />
  );
};

export default CarpentryServices;