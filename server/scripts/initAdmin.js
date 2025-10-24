import User from '../models/User.js';

export const initAdminUser = async () => {
  try {
    const adminExists = await User.findOne({ 
      email: 'admin@homeservices.com',
      role: 'admin' 
    });

    if (!adminExists) {
      const adminUser = new User({
        name: 'System Administrator',
        email: 'admin@homeservices.com',
        password: 'Admin123!', // This will be hashed by the pre-save middleware
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
      
      await adminUser.save(); // This will trigger the password hashing
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