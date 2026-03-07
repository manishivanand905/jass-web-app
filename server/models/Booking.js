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
  service: {
    type: String,
    required: true
  },
  serviceType: {
    type: String,
    required: true
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
  pickupOption: {
    type: String,
    enum: ['pickup', 'drop'],
    default: 'pickup'
  },
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
  isCombo: {
    type: Boolean,
    default: false
  },
  originalPrice: {
    type: Number
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
    let isUnique = false;
    let counter = 1;
    
    while (!isUnique) {
      const count = await mongoose.model('Booking').countDocuments();
      const potentialId = `JASS-${year}-${String(count + counter).padStart(3, '0')}`;
      
      const existing = await mongoose.model('Booking').findOne({ bookingId: potentialId });
      if (!existing) {
        this.bookingId = potentialId;
        isUnique = true;
      } else {
        counter++;
      }
    }
  }
  next();
});

module.exports = mongoose.model('Booking', bookingSchema);
