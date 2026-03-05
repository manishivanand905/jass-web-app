const express = require('express');
const router = express.Router();
const {
  createContact,
  getContacts,
  updateContactStatus
} = require('../controllers/contactController');
const { protect, adminOnly } = require('../middlewares/auth');

router.post('/', createContact);
router.get('/', protect, adminOnly, getContacts);
router.patch('/:id/status', protect, adminOnly, updateContactStatus);

module.exports = router;
