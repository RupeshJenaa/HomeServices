import React from 'react';
import ServiceTemplate from './ServiceTemplate';

const ApplianceRepairServices = () => {
  const mockProviders = [
    {
      id: 1,
      name: 'Appliance Pro Fix',
      rating: 4.7,
      reviews: 189,
      distance: 4.8,
      price: '$80 - $180',
      services: ['Refrigerator Repair', 'Washing Machine', 'Oven/Stove', 'Dishwasher'],
      location: 'Tech Park',
      available: true,
      responseTime: '1 day',
      experience: '7 years'
    }
  ];

  return (
    <ServiceTemplate
      serviceName="Appliance Repair"
      serviceIcon="🔧"
      serviceDescription="Professional repair services for all home appliances"
      mockProviders={mockProviders}
      serviceColor="#6B7280"
    />
  );
};

export default ApplianceRepairServices;