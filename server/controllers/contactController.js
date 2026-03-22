const Contact = require('../models/Contact');
const { createNotificationForAdmin } = require('./notificationController');

exports.createContact = async (req, res) => {
  try {
    const requestType = req.body.requestType === 'ticket' ? 'ticket' : 'enquiry';
    const contactPayload = {
      ...req.body,
      requestType
    };
    const contact = await Contact.create(contactPayload);
    const requestLabel = requestType === 'ticket' ? 'Ticket' : 'Enquiry';
    
    // Create notification for admin
    await createNotificationForAdmin(
      'new_contact',
      `New ${requestLabel} Received!`,
      `${contact.name} submitted a ${requestType}: "${contact.message.substring(0, 50)}..."`,
      'fa-solid fa-envelope',
      contact._id,
      'Contact'
    );
    
    res.status(201).json({
      success: true,
      contact,
      message: requestType === 'ticket' ? 'Ticket raised successfully' : 'Enquiry sent successfully'
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getContacts = async (req, res) => {
  try {
    const { page = 1, limit = 10, status = '', requestType = '' } = req.query;
    
    const query = {};

    if (status) {
      query.status = status;
    }

    if (requestType) {
      query.requestType = requestType;
    }

    const total = await Contact.countDocuments(query);
    const contacts = await Contact.find(query)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      contacts,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.updateContactStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const contact = await Contact.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    );
    if (!contact) {
      return res.status(404).json({ success: false, message: 'Contact not found' });
    }
    res.json({ success: true, contact });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
