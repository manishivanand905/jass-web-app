const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
  title: { type: String, required: function() { return this.category !== 'combo'; } },
  category: { type: String, required: true },
  description: { type: String, required: function() { return this.category !== 'combo'; } },
  image: { type: String, required: function() { return this.category !== 'combo'; } },
  name: String,
  icon: String,
  includes: [String],
  originalPrice: Number,
  price: Number,
  popular: { type: Boolean, default: false },
  benefits: [String],
  tiers: [{
    id: String,
    name: String,
    icon: String,
    coverage: String,
    price: Number,
    tier: String,
    popular: Boolean
  }],
  combos: [{
    id: String,
    name: String,
    icon: String,
    includes: [String],
    originalPrice: Number,
    price: Number,
    popular: Boolean
  }],
  featured: { type: Boolean, default: false },
  available: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('Service', serviceSchema);
