const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  bookingId: {
    type: String,
    unique: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  serviceType: {
    type: String,
    required: true,
    enum: ['ppf', 'ceramic', 'combo']
  },
  serviceTier: {
    type: String,
    required: true
  },
  servicePackage: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  timeSlot: {
    type: String,
    required: true
  },
  carBrand: {
    type: String,
    required: true
  },
  carModel: {
    type: String,
    required: true
  },
  carYear: {
    type: Number,
    required: true
  },
  carType: String,
  carColor: String,
  customerName: {
    type: String,
    required: true
  },
  customerEmail: {
    type: String,
    required: true
  },
  customerPhone: {
    type: String,
    required: true
  },
  totalAmount: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'in-progress', 'completed', 'cancelled'],
    default: 'pending'
  },
  paymentStatus: {
    type: String,
    enum: ['pending', 'paid', 'failed'],
    default: 'pending'
  },
  notes: String
}, { timestamps: true });

bookingSchema.pre('save', async function(next) {
  if (!this.bookingId) {
    const year = new Date().getFullYear();
    const count = await mongoose.model('Booking').countDocuments();
    this.bookingId = `JASS-${year}-${String(count + 1).padStart(3, '0')}`;
  }
  next();
});

module.exports = mongoose.model('Booking', bookingSchema);
