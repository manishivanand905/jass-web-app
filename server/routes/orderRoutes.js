const express = require('express');
const router = express.Router();
const { createOrder, getOrders, getUserOrders, updateOrderStatus } = require('../controllers/orderController');
const { protect, adminOnly } = require('../middlewares/auth');

router.post('/', protect, createOrder);
router.get('/', protect, adminOnly, getOrders);
router.get('/user', protect, getUserOrders);
router.patch('/:id/status', protect, adminOnly, updateOrderStatus);

module.exports = router;
