const express = require('express');
const router = express.Router();
const { protect, adminOnly } = require('../middlewares/auth');
const { upload } = require('../utils/cloudinary');
const {
  getAllServices,
  getService,
  createService,
  updateService,
  deleteService
} = require('../controllers/serviceController');

router.get('/', getAllServices);
router.get('/:id', getService);
router.post('/', protect, adminOnly, upload.single('image'), createService);
router.put('/:id', protect, adminOnly, upload.single('image'), updateService);
router.delete('/:id', protect, adminOnly, deleteService);

module.exports = router;
