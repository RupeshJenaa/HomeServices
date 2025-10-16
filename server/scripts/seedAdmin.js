import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../models/User.js';
import Service from '../models/Service.js';

dotenv.config();

const defaultUsers = [
  {
    name: 'System Administrator',
    email: 'admin@homeservices.com',
    password: 'Admin123!',
    phone: '+1-555-0100',
    role: 'admin',
    isVerified: true,
    address: {
      street: '123 Admin Street',
      city: 'Admin City',
      state: 'AS',
      zipCode: '12345'
    }
  },
  {
    name: 'John Customer',
    email: 'customer@homeservices.com',
    password: 'Customer123!',
    phone: '+1-555-0101',
    role: 'customer',
    isVerified: true,
    address: {
      street: '456 Customer Ave',
      city: 'Customer City',
      state: 'CS',
      zipCode: '67890'
    }
  },
  {
    name: 'Mike Plumber',
    email: 'provider@homeservices.com',
    password: 'Provider123!',
    phone: '+1-555-0102',
    role: 'provider',
    isVerified: true,
    providerInfo: {
      experience: 5,
      qualifications: ['Licensed Plumber', '5 Years Experience'],
      isApproved: true,
      rating: 4.8
    },
    address: {
      street: '789 Provider Lane',
      city: 'Provider City',
      state: 'PS',
      zipCode: '11223'
    }
  }
];

const sampleServices = [
  {
    title: 'Emergency Plumbing Repair',
    description: '24/7 emergency plumbing services for leaks, clogs, and repairs.',
    category: 'plumbing',
    price: 89.99,
    duration: 2
  },
  {
    title: 'Electrical Installation',
    description: 'Professional electrical installation and repair services.',
    category: 'electrical',
    price: 120.00,
    duration: 3
  },
  {
    title: 'Deep Cleaning Service',
    description: 'Comprehensive deep cleaning for homes and offices.',
    category: 'cleaning',
    price: 150.00,
    duration: 4
  }
];

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/servicebooking', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('Connected to MongoDB');

    // Clear existing data (optional - be careful in production)
    // await User.deleteMany({});
    // await Service.deleteMany({});

    // Create users
    const createdUsers = await User.insertMany(defaultUsers);
    console.log('✅ Default users created');

    // Find the provider user and create services for them
    const providerUser = createdUsers.find(user => user.role === 'provider');
    
    if (providerUser) {
      const servicesWithProvider = sampleServices.map(service => ({
        ...service,
        provider: providerUser._id
      }));

      await Service.insertMany(servicesWithProvider);
      console.log('✅ Sample services created');

      // Update provider with services
      await User.findByIdAndUpdate(providerUser._id, {
        $set: {
          'providerInfo.services': servicesWithProvider.map(s => s._id)
        }
      });
    }

    console.log('\n📋 Default Login Credentials:');
    console.log('============================');
    createdUsers.forEach(user => {
      console.log(`\n👤 ${user.name} (${user.role})`);
      console.log(`📧 Email: ${user.email}`);
      console.log(`🔑 Password: ${user.name.split(' ')[0]}123!`);
    });

    console.log('\n⚠️  Please change passwords after first login!');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();