import express from 'express';
import { protect } from '../middleware/auth.js';
import { 
  getProviderServices,
  addService,
  updateService,
  deleteService,
  getProviderBookings,
  updateBookingStatus,
  getEarnings
} from '../controllers/providerController.js';

const router = express.Router();

// Protect all provider routes
router.use(protect);

router.get('/services', getProviderServices);
router.post('/services', addService);
router.put('/services/:id', updateService);
router.delete('/services/:id', deleteService);
router.get('/bookings', getProviderBookings);
router.put('/bookings/:id/status', updateBookingStatus);
router.get('/earnings', getEarnings);

export default router;