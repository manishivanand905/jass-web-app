const Order = require('../models/Order');
const User = require('../models/User');
const { sendOrderConfirmationEmail, sendOrderStatusUpdateEmail } = require('../services/emailService');
const { createNotificationForUser, createNotificationForAdmin } = require('./notificationController');

exports.createOrder = async (req, res) => {
  try {
    const user = await User.findById(req.user?._id);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    const customerName = req.body.customerName || user.name;
    const customerEmail = req.body.customerEmail || user.email;
    const customerPhone = req.body.customerPhone || user.phone;

    if (!customerName || !customerEmail) {
      return res.status(400).json({
        success: false,
        message: 'Customer profile is incomplete. Please update your name and email before placing an order.'
      });
    }

    const order = await Order.create({
      ...req.body,
      user: req.user?._id,
      customerName,
      customerEmail,
      customerPhone
    });

    if (user) {
      sendOrderConfirmationEmail(order, user);
    }

    // Create notification for user
    await createNotificationForUser(
      req.user._id,
      'order_confirmation',
      'Order Placed',
      `Your order #${order.orderId} has been placed successfully.`,
      'fa-solid fa-shopping-bag',
      order._id,
      'Order'
    );

    // Create notification for admin
    await createNotificationForAdmin(
      'new_order',
      'New Order Received!',
      `Order #${order.orderId} placed by ${user.name} for ₹${order.totalAmount}`,
      'fa-solid fa-shopping-cart',
      order._id,
      'Order'
    );
    
    res.status(201).json({ success: true, data: { orderId: order.orderId }, order });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate('user', 'name email').sort({ createdAt: -1 });
    res.json({ success: true, orders });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json({ success: true, orders });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const existingOrder = await Order.findById(req.params.id);
    if (!existingOrder) return res.status(404).json({ success: false, message: 'Order not found' });

    const order = await Order.findByIdAndUpdate(req.params.id, { status }, { new: true });
    
    const user = await User.findById(order.user);
    if (user) {
      sendOrderStatusUpdateEmail(order, user);

      if (status === 'confirmed' && existingOrder.status !== 'confirmed') {
        await createNotificationForUser(
          order.user,
          'order_confirmation',
          'Order Confirmed',
          `Your order #${order.orderId} has been confirmed by our team.`,
          'fa-solid fa-shopping-bag',
          order._id,
          'Order'
        );
      }
    }
    
    res.json({ success: true, order });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
