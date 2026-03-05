const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true, enum: ['PPF', 'Ceramic Coating', 'Accessories'] },
  brand: { type: String, required: true },
  badge: String,
  image: { type: String, required: true },
  price: { type: Number, required: true },
  stock: { type: Number, required: true, default: 0 },
  rating: { type: Number, default: 0, min: 0, max: 5 },
  ratingCount: { type: Number, default: 0 },
  shortDescription: { type: String, required: true },
  fullDescription: String,
  durability: String,
  warranty: String,
  featured: { type: Boolean, default: false },
  available: { type: Boolean, default: true },
  specifications: [{ label: String, value: String }],
  features: [String],
  tags: [String]
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);
