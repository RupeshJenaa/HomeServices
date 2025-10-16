import connectDB from './config/database.js';
import User from './models/User.js';

const testConnection = async () => {
  try {
    await connectDB();
    
    // Test creating a user
    const testUser = await User.create({
      name: 'Test User',
      email: 'test@example.com',
      password: 'password123',
      phone: '1234567890',
      role: 'customer'
    });
    
    console.log('✅ Test user created:', testUser.email);
    
    // Clean up
    await User.deleteOne({ email: 'test@example.com' });
    console.log('✅ Test user deleted');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Test failed:', error);
    process.exit(1);
  }
};

testConnection();