import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/database.js';
import { initAdminUser } from './scripts/initAdmin.js'; // Add this import

// Import routes
import authRoutes from './routes/auth.js';
import customerRoutes from './routes/customer.js';
import providerRoutes from './routes/provider.js';
import adminRoutes from './routes/admin.js';

dotenv.config();

const app = express();

// Connect to MongoDB
connectDB();

// Initialize admin user after DB connection
initAdminUser(); // Add this line

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/customer', customerRoutes);
app.use('/api/provider', providerRoutes);
app.use('/api/admin', adminRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.status(200).json({ message: 'Server is running!' });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});