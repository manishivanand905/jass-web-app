const express = require('express');
const router = express.Router();
const { protect, adminOnly } = require('../middlewares/auth');
const {
  getAllServices,
  getService,
  createService,
  updateService,
  deleteService
} = require('../controllers/serviceController');

router.get('/', getAllServices);
router.get('/:id', getService);
router.post('/', protect, adminOnly, createService);
router.put('/:id', protect, adminOnly, updateService);
router.delete('/:id', protect, adminOnly, deleteService);

module.exports = router;
