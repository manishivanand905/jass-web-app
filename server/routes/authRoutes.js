const express = require('express');
const router = express.Router();
const {
  register,
  login,
  requestPasswordResetOtp,
  verifyPasswordResetOtp,
  resetPasswordWithOtp,
  getMe,
  updateProfile,
  addAddress
} = require('../controllers/authController');
const { protect } = require('../middlewares/auth');

router.post('/register', register);
router.post('/login', login);
router.post('/forgot-password/request-otp', requestPasswordResetOtp);
router.post('/forgot-password/verify-otp', verifyPasswordResetOtp);
router.post('/forgot-password/reset', resetPasswordWithOtp);
router.get('/me', protect, getMe);
router.put('/update-profile', protect, updateProfile);
router.post('/addresses', protect, addAddress);

module.exports = router;
