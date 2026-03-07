const Product = require('../models/Product');
const { uploadToCloudinary } = require('../utils/cloudinary');
const { createNotificationForAllUsers } = require('./notificationController');

exports.getAllProducts = async (req, res) => {
  try {
    const { page = 1, limit = 10, search = '', category = '' } = req.query;
    const query = {};
    
    if (search) query.name = { $regex: search, $options: 'i' };
    if (category) query.category = category;

    const products = await Product.find(query)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort({ createdAt: -1 });

    const count = await Product.countDocuments(query);

    res.json({
      products,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
      total: count
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createProduct = async (req, res) => {
  try {
    let imageUrl = req.body.image;

    if (req.file) {
      const result = await uploadToCloudinary(req.file.buffer, 'jass_automotives/products');
      imageUrl = result.secure_url;
    }

    const product = new Product({
      ...req.body,
      image: imageUrl
    });
    await product.save();

    // Create notification for all users
    await createNotificationForAllUsers(
      'new_product',
      'New Product Available!',
      `Check out our latest ${product.category}: ${product.name}`,
      'fa-solid fa-box',
      product._id,
      'Product'
    );

    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    let updateData = { ...req.body };

    if (req.file) {
      const result = await uploadToCloudinary(req.file.buffer, 'jass_automotives/products');
      updateData.image = result.secure_url;
    }

    const product = await Product.findByIdAndUpdate(req.params.id, updateData, { new: true });
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
