const express = require('express');
const router = express.Router();
const { protect, adminOnly } = require('../middlewares/auth');
const { getAdminStats } = require('../controllers/adminController');

router.get('/stats', protect, adminOnly, getAdminStats);

module.exports = router;
