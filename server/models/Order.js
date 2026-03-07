const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  orderId: { type: String, unique: true, sparse: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  items: [{
    product: { type: String, required: true },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
    image: { type: String }
  }],
  totalAmount: { type: Number, required: true },
  deliveryType: { type: String, enum: ['pickup', 'delivery'], default: 'pickup' },
  deliveryAddress: {
    fullName: String,
    phone: String,
    addressLine: String,
    city: String,
    state: String,
    pincode: String
  },
  customerName: { type: String, required: true },
  customerEmail: { type: String, required: true },
  customerPhone: { type: String },
  status: { type: String, enum: ['pending', 'confirmed', 'processing', 'completed', 'cancelled'], default: 'pending' },
  paymentStatus: { type: String, enum: ['pending', 'paid', 'failed'], default: 'pending' }
}, { timestamps: true });

orderSchema.pre('save', async function(next) {
  if (!this.orderId) {
    try {
      const year = new Date().getFullYear();
      const count = await mongoose.model('Order').countDocuments({ orderId: { $regex: `ORD-${year}` } });
      this.orderId = `ORD-${year}-${String(count + 1).padStart(4, '0')}`;
    } catch (error) {
      next(error);
      return;
    }
  }
  next()
});

module.exports = mongoose.model('Order', orderSchema);
