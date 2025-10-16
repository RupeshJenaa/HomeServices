import React from 'react';
import ServiceTemplate from './ServiceTemplate';

const ElectricalServices = () => {
  const mockProviders = [
    {
      id: 1,
      name: 'Spark Electric',
      rating: 4.9,
      reviews: 156,
      distance: 3.2,
      price: '$75 - $130',
      services: ['Wiring Installation', 'Outlet Repair', 'Lighting', 'Panel Upgrade'],
      location: 'Central District',
      available: true,
      responseTime: '40 mins',
      experience: '7 years'
    }
  ];

  return (
    <ServiceTemplate
      serviceName="Electrical"
      serviceIcon="💡"
      serviceDescription="Certified electrical services for your home and office"
      mockProviders={mockProviders}
      serviceColor="#F59E0B"
    />
  );
};

export default ElectricalServices;