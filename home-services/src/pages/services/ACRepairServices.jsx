import React from 'react';
import ServiceTemplate from './ServiceTemplate';

const ACRepairServices = () => {
  const mockProviders = [
    {
      id: 1,
      name: 'CoolBreeze AC',
      rating: 4.8,
      reviews: 203,
      distance: 5.2,
      price: '$90 - $200',
      services: ['AC Repair', 'Maintenance', 'Installation', 'Gas Refill'],
      location: 'Central',
      available: true,
      responseTime: '2 hours',
      experience: '8 years'
    }
  ];

  return (
    <ServiceTemplate
      serviceName="AC Repair"
      serviceIcon="❄️"
      serviceDescription="Professional AC repair, maintenance and installation services"
      mockProviders={mockProviders}
      serviceColor="#06B6D4"
    />
  );
};

export default ACRepairServices;