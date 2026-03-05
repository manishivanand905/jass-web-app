const ProductOrder = require('../models/ProductOrder');

exports.createProductOrder = async (req, res) => {
  try {
    const order = await ProductOrder.create({ ...req.body, user: req.user._id });
    res.status(201).json({ success: true, order, orderRef: order.orderId });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getProductOrders = async (req, res) => {
  try {
    const { page = 1, limit = 10, search = '', status = '' } = req.query;
    
    const query = {};
    if (search) {
      query.$or = [
        { orderId: { $regex: search, $options: 'i' } },
        { 'shippingAddress.name': { $regex: search, $options: 'i' } }
      ];
    }
    if (status) query.status = status;

    const total = await ProductOrder.countDocuments(query);
    const orders = await ProductOrder.find(query)
      .populate('user', 'name email')
      .populate('items.product', 'name image')
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      orders,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getUserProductOrders = async (req, res) => {
  try {
    const orders = await ProductOrder.find({ user: req.user._id })
      .populate('items.product', 'name image')
      .sort({ createdAt: -1 });
    res.json({ success: true, orders });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getProductOrderById = async (req, res) => {
  try {
    const order = await ProductOrder.findById(req.params.id)
      .populate('user', 'name email')
      .populate('items.product', 'name image price');
    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }
    res.json({ success: true, order });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.updateProductOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const order = await ProductOrder.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    );
    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }
    res.json({ success: true, order });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
