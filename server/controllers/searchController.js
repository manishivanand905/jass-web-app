const Product = require('../models/Product');
const Service = require('../models/Service');

exports.globalSearch = async (req, res) => {
  try {
    const { q } = req.query;
    
    if (!q || q.trim().length < 2) {
      return res.json({ success: true, results: [] });
    }

    const searchQuery = { $regex: q.trim(), $options: 'i' };
    
    // Search products
    const products = await Product.find({
      $or: [
        { name: searchQuery },
        { category: searchQuery },
        { brand: searchQuery },
        { shortDescription: searchQuery }
      ],
      available: true
    }).limit(5).select('_id name category brand price image');

    // Search services
    const services = await Service.find({
      $or: [
        { title: searchQuery },
        { category: searchQuery },
        { description: searchQuery }
      ],
      available: true
    }).limit(5).select('_id title category description image');

    const results = [
      ...products.map(product => ({
        id: product._id,
        title: product.name,
        category: product.category,
        type: 'product',
        image: product.image,
        price: product.price,
        url: `/products/${product._id}`
      })),
      ...services.map(service => ({
        id: service._id,
        title: service.title,
        category: service.category,
        type: 'service',
        image: service.image,
        url: '/services'
      }))
    ];

    res.json({ success: true, results });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};