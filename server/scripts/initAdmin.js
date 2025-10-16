import User from '../models/User.js';

export const initAdminUser = async () => {
  try {
    const adminExists = await User.findOne({ 
      email: 'admin@homeservices.com',
      role: 'admin' 
    });

    if (!adminExists) {
      await User.create({
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
      });
      console.log('✅ Default admin user created');
      console.log('📧 Email: admin@homeservices.com');
      console.log('🔑 Password: Admin123!');
    } else {
      console.log('ℹ️  Admin user already exists');
    }
  } catch (error) {
    console.error('❌ Error initializing admin user:', error);
  }
};