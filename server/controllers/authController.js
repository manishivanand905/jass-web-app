const User = require('../models/User');
const crypto = require('crypto');
const { generateToken } = require('../utils/jwt');
const { sendRegistrationEmail, sendLoginEmail, sendPasswordResetOtpEmail } = require('../services/emailService');

const hashOtp = (otp) => crypto.createHash('sha256').update(otp).digest('hex');
const GMAIL_PATTERN = /^[a-z0-9._%+-]+@gmail\.com$/i;
const PHONE_PATTERN = /^\d{10}$/;

const normalizePhone = (phone) => phone?.replace(/\D/g, '').trim();
const isGmail = (value) => GMAIL_PATTERN.test(value || '');
const isPhone = (value) => PHONE_PATTERN.test(value || '');

const sanitizeAddress = (address = {}) => ({
  fullName: address.fullName?.trim() || '',
  phone: address.phone?.trim() || '',
  addressLine: address.addressLine?.trim() || '',
  city: address.city?.trim() || '',
  state: address.state?.trim() || '',
  pincode: address.pincode?.trim() || '',
  isDefault: Boolean(address.isDefault)
});

const buildSeedAddress = ({ fullName, phone, addressLine, city }) => {
  if (!addressLine?.trim()) return null;

  return {
    fullName: fullName?.trim() || '',
    phone: phone?.trim() || '',
    addressLine: addressLine.trim(),
    city: city?.trim() || '',
    state: '',
    pincode: '',
    isDefault: true
  };
};

const syncDefaultAddress = (user, { fullName, phone, addressLine, city }) => {
  const seedAddress = buildSeedAddress({ fullName, phone, addressLine, city });
  if (!seedAddress) return;

  const defaultIndex = user.addresses.findIndex((item) => item.isDefault);
  if (defaultIndex >= 0) {
    user.addresses[defaultIndex].fullName = seedAddress.fullName;
    user.addresses[defaultIndex].phone = seedAddress.phone;
    user.addresses[defaultIndex].addressLine = seedAddress.addressLine;
    user.addresses[defaultIndex].city = seedAddress.city;
  } else {
    user.addresses.push(seedAddress);
  }
};

const formatUserResponse = (user) => ({
  id: user._id,
  name: user.name,
  email: user.email,
  phone: user.phone,
  city: user.city,
  address: user.address,
  addresses: user.addresses || [],
  role: user.role
});

exports.register = async (req, res) => {
  try {
    const { name, firstName, lastName, email, password, phone, city, address } = req.body;
    const normalizedEmail = email?.toLowerCase().trim();
    const normalizedPhone = normalizePhone(phone);
    const normalizedAddress = address?.trim();
    
    const fullName = name || `${firstName || ''} ${lastName || ''}`.trim();

    if (!isGmail(normalizedEmail)) {
      return res.status(400).json({ success: false, message: 'Please enter a valid Gmail address' });
    }

    if (!isPhone(normalizedPhone)) {
      return res.status(400).json({ success: false, message: 'Please enter a valid 10-digit mobile number' });
    }

    const userExists = await User.findOne({ email: normalizedEmail });
    if (userExists) {
      return res.status(400).json({ success: false, message: 'User already exists' });
    }

    const phoneExists = await User.findOne({ phone: normalizedPhone });
    if (phoneExists) {
      return res.status(400).json({ success: false, message: 'Mobile number already in use' });
    }

    const user = await User.create({
      name: fullName,
      email: normalizedEmail,
      password,
      phone: normalizedPhone,
      city,
      address: normalizedAddress,
      addresses: buildSeedAddress({
        fullName,
        phone: normalizedPhone,
        addressLine: normalizedAddress,
        city
      }) ? [
        buildSeedAddress({
          fullName,
          phone: normalizedPhone,
          addressLine: normalizedAddress,
          city
        })
      ] : []
    });
    const token = generateToken(user._id);

    sendRegistrationEmail(user);

    res.status(201).json({
      success: true,
      user: formatUserResponse(user),
      token
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const identifier = email?.trim();
    const normalizedEmail = identifier?.toLowerCase();
    const normalizedPhone = normalizePhone(identifier);
    const query = isPhone(normalizedPhone)
      ? { phone: normalizedPhone }
      : { email: normalizedEmail };

    const user = await User.findOne(query).select('+password');
    if (!user) {
      return res.status(404).json({ success: false, message: 'Account not registered with us. Please subscribe.' });
    }

    if (!(await user.comparePassword(password))) {
      return res.status(401).json({ success: false, message: 'Invalid password' });
    }

    const token = generateToken(user._id);

    sendLoginEmail(user);

    res.json({
      success: true,
      user: formatUserResponse(user),
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
    res.json({ success: true, user: formatUserResponse(req.user) });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const { name, phone, email, city, address } = req.body;
    const normalizedEmail = email?.toLowerCase().trim();
    const normalizedPhone = normalizePhone(phone);
    const normalizedAddress = address?.trim();
    
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    if (normalizedEmail && normalizedEmail !== user.email) {
      if (!isGmail(normalizedEmail)) {
        return res.status(400).json({ success: false, message: 'Please enter a valid Gmail address' });
      }

      const emailExists = await User.findOne({ email: normalizedEmail });
      if (emailExists) {
        return res.status(400).json({ success: false, message: 'Email already in use' });
      }
    }

    if (normalizedPhone && normalizedPhone !== user.phone) {
      if (!isPhone(normalizedPhone)) {
        return res.status(400).json({ success: false, message: 'Please enter a valid 10-digit mobile number' });
      }

      const phoneExists = await User.findOne({ phone: normalizedPhone });
      if (phoneExists) {
        return res.status(400).json({ success: false, message: 'Mobile number already in use' });
      }
    }

    user.name = name || user.name;
    user.phone = normalizedPhone || user.phone;
    user.email = normalizedEmail || user.email;
    user.city = city || user.city;
    user.address = normalizedAddress !== undefined ? normalizedAddress : user.address;
    syncDefaultAddress(user, {
      fullName: user.name,
      phone: user.phone,
      addressLine: user.address,
      city: user.city
    });

    await user.save();

    res.json({
      success: true,
      user: formatUserResponse(user)
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.addAddress = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    const address = sanitizeAddress(req.body);
    if (!address.fullName || !address.phone || !address.addressLine || !address.city) {
      return res.status(400).json({ success: false, message: 'Full name, phone, city and address are required' });
    }

    if (address.isDefault || user.addresses.length === 0) {
      user.addresses.forEach((item) => {
        item.isDefault = false;
      });
      address.isDefault = true;
    }

    user.addresses.push(address);

    if (address.isDefault) {
      user.address = address.addressLine;
      user.city = address.city;
      user.phone = address.phone || user.phone;
    }

    await user.save();

    res.status(201).json({
      success: true,
      message: 'Address added successfully',
      user: formatUserResponse(user)
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
