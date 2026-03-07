const express = require('express');
const router = express.Router();
const { protect, adminOnly } = require('../middlewares/auth');
const { upload } = require('../utils/cloudinary');
const {
  getAllProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct
} = require('../controllers/productController');

router.get('/', getAllProducts);
router.get('/:id', getProduct);
router.post('/', protect, adminOnly, upload.single('image'), createProduct);
router.put('/:id', protect, adminOnly, upload.single('image'), updateProduct);
router.delete('/:id', protect, adminOnly, deleteProduct);

module.exports = router;
