const Notification = require('../models/Notification');
const User = require('../models/User');

// Create notification for all users
const createNotificationForAllUsers = async (type, title, message, icon, relatedId = null, relatedModel = null) => {
  try {
    const users = await User.find({}, '_id');
    const notifications = users.map(user => ({
      userId: user._id,
      type,
      title,
      message,
      icon,
      relatedId,
      relatedModel
    }));
    
    await Notification.insertMany(notifications);
  } catch (error) {
    console.error('Error creating notifications:', error);
  }
};

// Create notification for admin
const createNotificationForAdmin = async (type, title, message, icon, relatedId = null, relatedModel = null) => {
  try {
    // Find admin users (assuming role field exists)
    const admins = await User.find({ role: 'admin' }, '_id');
    const notifications = admins.map(admin => ({
      adminId: admin._id,
      type,
      title,
      message,
      icon,
      relatedId,
      relatedModel
    }));
    
    await Notification.insertMany(notifications);
  } catch (error) {
    console.error('Error creating admin notifications:', error);
  }
};

// Create notification for specific user
const createNotificationForUser = async (userId, type, title, message, icon, relatedId = null, relatedModel = null) => {
  try {
    await Notification.create({
      userId,
      type,
      title,
      message,
      icon,
      relatedId,
      relatedModel
    });
  } catch (error) {
    console.error('Error creating notification:', error);
  }
};

// Get user notifications
const getUserNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find({ 
      userId: req.user._id,
      $or: [
        { isRead: false },
        { expiresAt: { $gt: new Date() } }
      ]
    })
    .sort({ createdAt: -1 })
    .limit(20);

    res.json({
      success: true,
      notifications,
      unreadCount: notifications.filter(n => !n.isRead).length
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch notifications' });
  }
};

// Get admin notifications
const getAdminNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find({ 
      adminId: req.user._id,
      $or: [
        { isRead: false },
        { expiresAt: { $gt: new Date() } }
      ]
    })
    .sort({ createdAt: -1 })
    .limit(20);

    res.json({
      success: true,
      notifications,
      unreadCount: notifications.filter(n => !n.isRead).length
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch notifications' });
  }
};

// Mark notification as read
const markAsRead = async (req, res) => {
  try {
    const { notificationId } = req.params;
    const readAt = new Date();
    const expiresAt = new Date(readAt.getTime() + 24 * 60 * 60 * 1000); // 24 hours from read time

    await Notification.findByIdAndUpdate(notificationId, {
      isRead: true,
      readAt,
      expiresAt
    });

    res.json({ success: true, message: 'Notification marked as read' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to mark notification as read' });
  }
};

// Mark all notifications as read
const markAllAsRead = async (req, res) => {
  try {
    const readAt = new Date();
    const expiresAt = new Date(readAt.getTime() + 24 * 60 * 60 * 1000);

    await Notification.updateMany(
      { userId: req.user._id, isRead: false },
      { isRead: true, readAt, expiresAt }
    );

    res.json({ success: true, message: 'All notifications marked as read' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to mark all notifications as read' });
  }
};

module.exports = {
  createNotificationForAllUsers,
  createNotificationForUser,
  createNotificationForAdmin,
  getUserNotifications,
  getAdminNotifications,
  markAsRead,
  markAllAsRead
};