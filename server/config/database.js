import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/servicebooking', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 30s
      heartbeatFrequencyMS: 1000, // Check connection every second
      socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
      family: 4 // Use IPv4, skip trying IPv6
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);

    // Add reconnection handling
    mongoose.connection.on('disconnected', () => {
      console.log('Lost MongoDB connection... Retrying...');
      setTimeout(() => {
        connectDB();
      }, 5000); // Retry after 5 seconds
    });

  } catch (error) {
    console.error('Database connection error:', error);
    // Don't exit the process, try to reconnect instead
    setTimeout(() => {
      connectDB();
    }, 5000); // Retry after 5 seconds
  }
};

// Handle MongoDB connection events
mongoose.connection.on('disconnected', () => {
  console.log('MongoDB disconnected');
});

mongoose.connection.on('error', (err) => {
  console.error('MongoDB connection error:', err);
});

export default connectDB;