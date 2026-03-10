const User = require('../models/User');
const crypto = require('crypto');
const { generateToken } = require('../utils/jwt');
const { sendRegistrationEmail, sendLoginEmail, sendPasswordResetOtpEmail } = require('../services/emailService');

const hashOtp = (otp) => crypto.createHash('sha256').update(otp).digest('hex');

exports.register = async (req, res) => {
  try {
    const { name, firstName, lastName, email, password, phone, city, vehicleModel } = req.body;
    const normalizedEmail = email?.toLowerCase().trim();
    
    const fullName = name || `${firstName || ''} ${lastName || ''}`.trim();

    const userExists = await User.findOne({ email: normalizedEmail });
    if (userExists) {
      return res.status(400).json({ success: false, message: 'User already exists' });
    }

    const user = await User.create({ name: fullName, email: normalizedEmail, password, phone, city, vehicleModel });
    const token = generateToken(user._id);

    sendRegistrationEmail(user);

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
    const normalizedEmail = email?.toLowerCase().trim();

    const user = await User.findOne({ email: normalizedEmail }).select('+password');
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    const token = generateToken(user._id);

    sendLoginEmail(user);

    res.json({
      success: true,
      user: { id: user._id, name: user.name, email: user.email, phone: user.phone, city: user.city, vehicleModel: user.vehicleModel, role: user.role },
      token
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.requestPasswordResetOtp = async (req, res) => {
  try {
    const normalizedEmail = req.body.email?.toLowerCase().trim();

    if (!normalizedEmail) {
      return res.status(400).json({ success: false, message: 'Email is required' });
    }

    const user = await User.findOne({ email: normalizedEmail }).select('+passwordResetOtp +passwordResetOtpExpires');
    if (!user) {
      return res.status(404).json({ success: false, message: 'No account found with this email' });
    }

    const otp = `${Math.floor(100000 + Math.random() * 900000)}`;
    user.passwordResetOtp = hashOtp(otp);
    user.passwordResetOtpExpires = new Date(Date.now() + 10 * 60 * 1000);
    await user.save();

    await sendPasswordResetOtpEmail(user, otp);

    res.json({
      success: true,
      message: 'OTP sent to your email address'
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.verifyPasswordResetOtp = async (req, res) => {
  try {
    const normalizedEmail = req.body.email?.toLowerCase().trim();
    const otp = req.body.otp?.trim();

    if (!normalizedEmail || !otp) {
      return res.status(400).json({ success: false, message: 'Email and OTP are required' });
    }

    const user = await User.findOne({ email: normalizedEmail }).select('+passwordResetOtp +passwordResetOtpExpires');
    if (!user || !user.passwordResetOtp || !user.passwordResetOtpExpires) {
      return res.status(400).json({ success: false, message: 'Reset OTP not requested or already used' });
    }

    if (user.passwordResetOtpExpires.getTime() < Date.now()) {
      user.passwordResetOtp = undefined;
      user.passwordResetOtpExpires = undefined;
      await user.save();
      return res.status(400).json({ success: false, message: 'OTP has expired. Please request a new one' });
    }

    if (user.passwordResetOtp !== hashOtp(otp)) {
      return res.status(400).json({ success: false, message: 'Invalid OTP' });
    }

    res.json({
      success: true,
      message: 'OTP verified successfully'
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.resetPasswordWithOtp = async (req, res) => {
  try {
    const normalizedEmail = req.body.email?.toLowerCase().trim();
    const otp = req.body.otp?.trim();
    const newPassword = req.body.newPassword;

    if (!normalizedEmail || !otp || !newPassword) {
      return res.status(400).json({ success: false, message: 'Email, OTP and new password are required' });
    }

    const user = await User.findOne({ email: normalizedEmail }).select('+password +passwordResetOtp +passwordResetOtpExpires');
    if (!user || !user.passwordResetOtp || !user.passwordResetOtpExpires) {
      return res.status(400).json({ success: false, message: 'Reset OTP not requested or already used' });
    }

    if (user.passwordResetOtpExpires.getTime() < Date.now()) {
      user.passwordResetOtp = undefined;
      user.passwordResetOtpExpires = undefined;
      await user.save();
      return res.status(400).json({ success: false, message: 'OTP has expired. Please request a new one' });
    }

    if (user.passwordResetOtp !== hashOtp(otp)) {
      return res.status(400).json({ success: false, message: 'Invalid OTP' });
    }

    user.password = newPassword;
    user.passwordResetOtp = undefined;
    user.passwordResetOtpExpires = undefined;
    await user.save();

    res.json({
      success: true,
      message: 'Password reset successful. Please sign in with your new password'
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
    const normalizedEmail = email?.toLowerCase().trim();
    
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    if (normalizedEmail && normalizedEmail !== user.email) {
      const emailExists = await User.findOne({ email: normalizedEmail });
      if (emailExists) {
        return res.status(400).json({ success: false, message: 'Email already in use' });
      }
    }

    user.name = name || user.name;
    user.phone = phone || user.phone;
    user.email = normalizedEmail || user.email;
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
