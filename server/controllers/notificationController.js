const Notification = require('../models/Notification');
const User = require('../models/User');

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

const createNotificationForAdmin = async (type, title, message, icon, relatedId = null, relatedModel = null) => {
  try {
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

const markAsRead = async (req, res) => {
  try {
    const { notificationId } = req.params;
    const readAt = new Date();
    const expiresAt = new Date(readAt.getTime() + 24 * 60 * 60 * 1000);
    const query = req.user.role === 'admin'
      ? { _id: notificationId, adminId: req.user._id }
      : { _id: notificationId, userId: req.user._id };

    const notification = await Notification.findOneAndUpdate(query, {
      isRead: true,
      readAt,
      expiresAt
    });

    if (!notification) {
      return res.status(404).json({ success: false, message: 'Notification not found' });
    }

    res.json({ success: true, message: 'Notification marked as read' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to mark notification as read' });
  }
};

const markAllAsRead = async (req, res) => {
  try {
    const readAt = new Date();
    const expiresAt = new Date(readAt.getTime() + 24 * 60 * 60 * 1000);
    const filter = req.user.role === 'admin'
      ? { adminId: req.user._id, isRead: false }
      : { userId: req.user._id, isRead: false };

    await Notification.updateMany(filter, { isRead: true, readAt, expiresAt });

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
