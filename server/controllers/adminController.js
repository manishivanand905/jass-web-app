const Product = require('../models/Product');
const Service = require('../models/Service');
const Booking = require('../models/Booking');
const Order = require('../models/Order');
const Contact = require('../models/Contact');

exports.getAdminStats = async (req, res) => {
  try {
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const startOfWeek = new Date(now.setDate(now.getDate() - now.getDay()));

    const [
      totalProducts,
      totalServices,
      totalBookings,
      totalOrders,
      pendingBookings,
      productsThisMonth,
      bookingsThisWeek,
      ordersThisMonth,
      recentBookings,
      recentOrders,
      allBookings,
      allOrders
    ] = await Promise.all([
      Product.countDocuments(),
      Service.countDocuments(),
      Booking.countDocuments(),
      Order.countDocuments(),
      Booking.countDocuments({ status: 'pending' }),
      Product.countDocuments({ createdAt: { $gte: startOfMonth } }),
      Booking.countDocuments({ createdAt: { $gte: startOfWeek } }),
      Order.countDocuments({ createdAt: { $gte: startOfMonth } }),
      Booking.find().sort({ createdAt: -1 }).limit(5),
      Order.find().sort({ createdAt: -1 }).limit(5),
      Booking.find(),
      Order.find()
    ]);

    const totalRevenue = allOrders.reduce((sum, order) => sum + order.totalAmount, 0);
    const revenueThisMonth = allOrders
      .filter(order => new Date(order.createdAt) >= startOfMonth)
      .reduce((sum, order) => sum + order.totalAmount, 0);

    const monthlyRevenue = Array.from({ length: 12 }, (_, i) => {
      const monthStart = new Date(now.getFullYear(), i, 1);
      const monthEnd = new Date(now.getFullYear(), i + 1, 0);
      return allOrders
        .filter(order => {
          const orderDate = new Date(order.createdAt);
          return orderDate >= monthStart && orderDate <= monthEnd;
        })
        .reduce((sum, order) => sum + order.totalAmount, 0);
    });

    const serviceBreakdown = allBookings.reduce((acc, booking) => {
      const service = booking.servicePackage || 'Other';
      acc[service] = (acc[service] || 0) + 1;
      return acc;
    }, {});

    res.json({
      stats: {
        totalProducts,
        totalServices,
        totalBookings,
        totalOrders,
        pendingBookings,
        productsThisMonth,
        bookingsThisWeek,
        ordersThisMonth,
        totalRevenue,
        revenueThisMonth
      },
      recentBookings,
      recentOrders,
      monthlyRevenue,
      serviceBreakdown
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
