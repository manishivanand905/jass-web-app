const express = require('express');
const router = express.Router();
const { getUserNotifications, getAdminNotifications, markAsRead, markAllAsRead } = require('../controllers/notificationController');
const { protect } = require('../middlewares/auth');

// Get user notifications
router.get('/', protect, getUserNotifications);

// Get admin notifications
router.get('/admin', protect, getAdminNotifications);

// Mark notification as read
router.put('/:notificationId/read', protect, markAsRead);

// Mark all notifications as read
router.put('/read-all', protect, markAllAsRead);

module.exports = router;