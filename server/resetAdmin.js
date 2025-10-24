import mongoose from 'mongoose';
import dotenv from 'dotenv';
import connectDB from './config/database.js';

dotenv.config();

const resetAdmin = async () => {
  try {
    await connectDB();
    await mongoose.connection.collection('users').deleteMany({ role: 'admin' });
    console.log('Admin user reset successful');
    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
};

resetAdmin();
