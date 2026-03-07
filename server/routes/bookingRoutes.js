const express = require('express');
const router = express.Router();
const {
  createBooking,
  getBookings,
  getUserBookings,
  getBookingById,
  updateBookingStatus,
  getStats
} = require('../controllers/bookingController');
const { protect, adminOnly } = require('../middlewares/auth');

router.post('/', protect, createBooking);
router.get('/user', protect, getUserBookings);
router.get('/stats', protect, adminOnly, getStats);
router.get('/', protect, adminOnly, getBookings);
router.get('/:id', getBookingById);
router.patch('/:id/status', protect, adminOnly, updateBookingStatus);

module.exports = router;
