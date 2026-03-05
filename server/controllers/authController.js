const User = require('../models/User');
const { generateToken } = require('../utils/jwt');

exports.register = async (req, res) => {
  try {
    const { name, firstName, lastName, email, password, phone, city, vehicleModel } = req.body;
    
    const fullName = name || `${firstName || ''} ${lastName || ''}`.trim();

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ success: false, message: 'User already exists' });
    }

    const user = await User.create({ name: fullName, email, password, phone, city, vehicleModel });
    const token = generateToken(user._id);

    res.status(201).json({
      success: true,
      user: { id: user._id, name: user.name, email: user.email, phone: user.phone, city: user.city, vehicleModel: user.vehicleModel, role: user.role },
      token
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select('+password');
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    const token = generateToken(user._id);

    res.json({
      success: true,
      user: { id: user._id, name: user.name, email: user.email, phone: user.phone, city: user.city, vehicleModel: user.vehicleModel, role: user.role },
      token
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getMe = async (req, res) => {
  try {
    res.json({ success: true, user: req.user });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const { name, phone, email, city, vehicleModel } = req.body;
    
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    if (email && email !== user.email) {
      const emailExists = await User.findOne({ email });
      if (emailExists) {
        return res.status(400).json({ success: false, message: 'Email already in use' });
      }
    }

    user.name = name || user.name;
    user.phone = phone || user.phone;
    user.email = email || user.email;
    user.city = city || user.city;
    user.vehicleModel = vehicleModel || user.vehicleModel;

    await user.save();

    res.json({
      success: true,
      user: { id: user._id, name: user.name, email: user.email, phone: user.phone, city: user.city, vehicleModel: user.vehicleModel, role: user.role }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
