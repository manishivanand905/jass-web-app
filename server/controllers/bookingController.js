const Booking = require('../models/Booking');
const { sendBookingConfirmationEmail, sendBookingStatusUpdateEmail } = require('../services/emailService');
const User = require('../models/User');
const Service = require('../models/Service');
const { createNotificationForUser, createNotificationForAdmin } = require('./notificationController');

exports.createBooking = async (req, res) => {
  try {
    console.log('Create booking - req.user:', req.user);
    const userId = req.user?._id;
    if (!userId) {
      console.log('No user ID found');
      return res.status(401).json({ success: false, message: 'User not authenticated' });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    const customerName = req.body.customerName || user.name;
    const customerEmail = req.body.customerEmail || user.email;
    const customerPhone = req.body.customerPhone || user.phone;

    if (!customerName || !customerEmail || !customerPhone) {
      return res.status(400).json({
        success: false,
        message: 'Customer profile is incomplete. Please update your name, email and phone before booking.'
      });
    }
    
    const bookingData = {
      ...req.body,
      user: userId,
      customerName,
      customerEmail,
      customerPhone,
      status: 'pending',
      isCombo: req.body.isCombo || false,
      originalPrice: req.body.originalPrice || null
    };

    console.log('Creating booking with user ID:', userId);
    const booking = await Booking.create(bookingData);
    console.log('Booking created with ID:', booking._id, 'User:', booking.user);

    // Find service to get image
    let serviceImage = 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=200&fit=crop';
    try {
      if (booking.isCombo) {
        // For combo packages, find the combo service
        const comboService = await Service.findOne({ category: 'combo' });
        if (comboService && comboService.image) {
          serviceImage = comboService.image;
        }
      } else {
        // For regular services, find by title
        const service = await Service.findOne({ title: booking.service });
        if (service && service.image) {
          serviceImage = service.image;
        }
      }
    } catch (error) {
      console.log('Could not fetch service image:', error.message);
    }
    
    if (user) {
      sendBookingConfirmationEmail(booking, user, serviceImage);
    }

    // Create notification for user
    await createNotificationForUser(
      userId,
      'booking_confirmation',
      'Booking Placed',
      `Your booking for ${booking.servicePackage || booking.service} on ${new Date(booking.date).toLocaleDateString()} has been placed successfully.`,
      'fa-solid fa-calendar-check',
      booking._id,
      'Booking'
    );

    // Create notification for admin
    await createNotificationForAdmin(
      'new_booking',
      'New Booking Received!',
      `${booking.service} booking by ${booking.customerName} for ${new Date(booking.date).toLocaleDateString()}`,
      'fa-solid fa-calendar-plus',
      booking._id,
      'Booking'
    );
    
    res.status(201).json({ success: true, booking, bookingRef: booking.bookingId });
  } catch (error) {
    console.error('Booking creation error:', error.message);
    res.status(400).json({ success: false, message: error.message });
  }
};

exports.getBookings = async (req, res) => {
  try {
    const { page = 1, limit = 10, search = '', status = '' } = req.query;
    
    const query = {};
    if (search) {
      query.$or = [
        { bookingId: { $regex: search, $options: 'i' } },
        { customerName: { $regex: search, $options: 'i' } },
        { customerEmail: { $regex: search, $options: 'i' } },
        { customerPhone: { $regex: search, $options: 'i' } }
      ];
    }
    if (status) query.status = status;

    const total = await Booking.countDocuments(query);
    const bookings = await Booking.find(query)
      .populate('user', 'name email')
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort({ createdAt: -1 });

    console.log('Admin fetching bookings, found:', bookings.length, 'User IDs:', bookings.map(b => b.user?._id));

    res.json({
      success: true,
      bookings,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getUserBookings = async (req, res) => {
  try {
    const userId = req.user._id;
    if (!userId) {
      return res.status(401).json({ success: false, message: 'User not authenticated' });
    }
    console.log('Fetching bookings for user:', userId);
    const bookings = await Booking.find({ user: userId }).sort({ createdAt: -1 });
    console.log('Found bookings:', bookings.length);
    res.json({ success: true, bookings });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getBookingById = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id).populate('user', 'name email');
    if (!booking) {
      return res.status(404).json({ success: false, message: 'Booking not found' });
    }
    res.json({ success: true, booking });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.updateBookingStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const existingBooking = await Booking.findById(req.params.id);
    if (!existingBooking) {
      return res.status(404).json({ success: false, message: 'Booking not found' });
    }

    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    );
    
    const user = await User.findById(booking.user);
    if (user) {
      sendBookingStatusUpdateEmail(booking, user);

      if (status === 'confirmed' && existingBooking.status !== 'confirmed') {
        await createNotificationForUser(
          booking.user,
          'booking_confirmation',
          'Booking Confirmed',
          `Your booking for ${booking.servicePackage || booking.service} on ${new Date(booking.date).toLocaleDateString()} has been confirmed by our team.`,
          'fa-solid fa-calendar-check',
          booking._id,
          'Booking'
        );
      }
    }
    
    res.json({ success: true, booking });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getStats = async (req, res) => {
  try {
    const totalBookings = await Booking.countDocuments();
    const pendingBookings = await Booking.countDocuments({ status: 'pending' });
    const completedBookings = await Booking.countDocuments({ status: 'completed' });
    
    const revenueData = await Booking.aggregate([
      { $match: { paymentStatus: 'paid' } },
      { $group: { _id: null, total: { $sum: '$totalAmount' } } }
    ]);
    const totalRevenue = revenueData[0]?.total || 0;

    res.json({
      success: true,
      stats: {
        totalBookings,
        pendingBookings,
        completedBookings,
        totalRevenue
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
