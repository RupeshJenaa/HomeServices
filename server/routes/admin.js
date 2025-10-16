import express from 'express';
import { protect, admin } from '../middleware/auth.js';
import { 
  getUsers,
  updateUserStatus,
  getProviders,
  approveProvider,
  getAllBookings,
  getReports
} from '../controllers/adminController.js';

const router = express.Router();

// Protect all admin routes and check if user is admin
router.use(protect);
router.use(admin);

router.get('/users', getUsers);
router.put('/users/:id/status', updateUserStatus);
router.get('/providers', getProviders);
router.put('/providers/:id/approve', approveProvider);
router.get('/bookings', getAllBookings);
router.get('/reports', getReports);

export default router;