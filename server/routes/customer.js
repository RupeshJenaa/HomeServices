import express from 'express';
import { protect } from '../middleware/auth.js';
import { 
  getServices, 
  bookService, 
  getBookings, 
  cancelBooking,
  addToFavorites,
  getFavorites 
} from '../controllers/customerController.js';

const router = express.Router();

// Protect all customer routes
router.use(protect);

router.get('/services', getServices);
router.post('/bookings', bookService);
router.get('/bookings', getBookings);
router.put('/bookings/:id/cancel', cancelBooking);
router.post('/favorites', addToFavorites);
router.get('/favorites', getFavorites);

export default router;