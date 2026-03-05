const ServiceBooking = require('../models/ServiceBooking');

exports.createServiceBooking = async (req, res) => {
  try {
    const booking = await ServiceBooking.create({ ...req.body, user: req.user?._id });
    res.status(201).json({ success: true, booking, bookingRef: booking.bookingId });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getServiceBookings = async (req, res) => {
  try {
    const { page = 1, limit = 10, search = '', status = '' } = req.query;
    
    const query = {};
    if (search) {
      query.$or = [
        { bookingId: { $regex: search, $options: 'i' } },
        { customerName: { $regex: search, $options: 'i' } },
        { customerEmail: { $regex: search, $options: 'i' } }
      ];
    }
    if (status) query.status = status;

    const total = await ServiceBooking.countDocuments(query);
    const bookings = await ServiceBooking.find(query)
      .populate('user', 'name email')
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort({ createdAt: -1 });

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

exports.getUserServiceBookings = async (req, res) => {
  try {
    const bookings = await ServiceBooking.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json({ success: true, bookings });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getServiceBookingById = async (req, res) => {
  try {
    const booking = await ServiceBooking.findById(req.params.id).populate('user', 'name email');
    if (!booking) {
      return res.status(404).json({ success: false, message: 'Booking not found' });
    }
    res.json({ success: true, booking });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.updateServiceBookingStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const booking = await ServiceBooking.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    );
    if (!booking) {
      return res.status(404).json({ success: false, message: 'Booking not found' });
    }
    res.json({ success: true, booking });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
