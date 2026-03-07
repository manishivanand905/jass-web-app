const Service = require('../models/Service');
const { uploadToCloudinary } = require('../utils/cloudinary');
const { createNotificationForAllUsers } = require('./notificationController');

exports.getAllServices = async (req, res) => {
  try {
    const { search = '', category = '' } = req.query;
    const query = {};
    
    if (search) query.name = { $regex: search, $options: 'i' };
    if (category) query.category = category;

    const services = await Service.find(query).sort({ createdAt: -1 });
    res.json(services);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getService = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);
    if (!service) return res.status(404).json({ message: 'Service not found' });
    res.json(service);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createService = async (req, res) => {
  try {
    let imageUrl = req.body.image;

    if (req.file) {
      const result = await uploadToCloudinary(req.file.buffer, 'jass_automotives/services');
      imageUrl = result.secure_url;
    }

    const service = new Service({
      ...req.body,
      image: imageUrl
    });
    await service.save();

    // Create notification for all users
    await createNotificationForAllUsers(
      'new_service',
      'New Service Available!',
      `We now offer ${service.title}! Book your appointment today.`,
      'fa-solid fa-wrench',
      service._id,
      'Service'
    );

    res.status(201).json(service);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.updateService = async (req, res) => {
  try {
    let updateData = { ...req.body };

    if (req.file) {
      const result = await uploadToCloudinary(req.file.buffer, 'jass_automotives/services');
      updateData.image = result.secure_url;
    }

    const service = await Service.findByIdAndUpdate(req.params.id, updateData, { new: true });
    if (!service) return res.status(404).json({ message: 'Service not found' });
    res.json(service);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteService = async (req, res) => {
  try {
    const service = await Service.findByIdAndDelete(req.params.id);
    if (!service) return res.status(404).json({ message: 'Service not found' });
    res.json({ message: 'Service deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
