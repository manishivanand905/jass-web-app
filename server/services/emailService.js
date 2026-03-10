const { sendEmail } = require("../utils/emailConfig");

const emailTemplate = (content) => `
<!DOCTYPE html>
<html>
<head>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    body { margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f4f4f4; }
    .container { max-width: 600px; margin: 0 auto; background-color: #ffffff; }
    .header { 
      background: linear-gradient(135deg, rgba(0, 0, 0, 0.85) 0%, rgba(10, 10, 10, 0.75) 100%), url('https://images.pexels.com/photos/31154218/pexels-photo-31154218.jpeg') center/cover;
      padding: 30px; 
      text-align: center; 
    }
    .logo { width: 150px; height: auto; max-width: 100%; }
    .content { padding: 40px 30px; color: #333333; }
    .content h2 { color: #C90000; margin-top: 0; }
    .info-box { background-color: #f9f9f9; border-left: 4px solid #C90000; padding: 15px; margin: 20px 0; }
    .info-row { margin: 10px 0; }
    .label { font-weight: bold; color: #2a2a2a; }
    .value { color: #555555; }
    .footer { background-color: #2a2a2a; color: #ECECEC; padding: 20px; text-align: center; font-size: 14px; }
    .button { display: inline-block; background-color: #C90000; color: #ffffff; padding: 12px 30px; text-decoration: none; border-radius: 5px; margin: 20px 0; }
    
    @media only screen and (max-width: 600px) {
      .container { width: 100% !important; }
      .header { padding: 20px !important; }
      .content { padding: 20px !important; }
      .logo { width: 120px !important; }
      .info-box { padding: 12px !important; margin: 15px 0 !important; }
      .info-row { margin: 8px 0 !important; font-size: 14px !important; }
      .footer { padding: 15px !important; font-size: 12px !important; }
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <img src="https://res.cloudinary.com/dqcdwpr9y/image/upload/v1771493154/jass-logo_ixxpng.png" alt="Jass Automotives" class="logo">
    </div>
    <div class="content">
      ${content}
    </div>
    <div class="footer">
      <p>© 2024 Jass Automotives. All rights reserved.</p>
      <p>Contact us: jassautomotives@gmail.com</p>
    </div>
  </div>
</body>
</html>
`;

const sendRegistrationEmail = async (user) => {
  const content = `
    <h2>Welcome to Jass Automotives!</h2>
    <p>Hi <strong>${user.name}</strong>,</p>
    <p>Thank you for registering with us. Your account has been created successfully.</p>
    <div class="info-box">
      <div class="info-row"><span class="label">Email:</span> <span class="value">${user.email}</span></div>
      <div class="info-row"><span class="label">Phone:</span> <span class="value">${user.phone || "N/A"}</span></div>
    </div>
    <p>You can now log in and explore our premium automotive services.</p>
    <a href="${process.env.FRONTEND_URL}/login" class="button">Login Now</a>
    <p>Best regards,<br><strong>Jass Automotives Team</strong></p>
  `;
  await sendEmail(
    user.email,
    "Welcome to Jass Automotives",
    emailTemplate(content),
  );
};

const sendLoginEmail = async (user) => {
  const content = `
    <h2>Login Alert</h2>
    <p>Hi <strong>${user.name}</strong>,</p>
    <p>You have successfully logged into your Jass Automotives account.</p>
    <div class="info-box">
      <div class="info-row"><span class="label">Time:</span> <span class="value">${new Date().toLocaleString()}</span></div>
      <div class="info-row"><span class="label">Email:</span> <span class="value">${user.email}</span></div>
    </div>
    <p>If this wasn't you, please contact us immediately.</p>
    <p>Best regards,<br><strong>Jass Automotives Team</strong></p>
  `;
  await sendEmail(
    user.email,
    "Login Alert - Jass Automotives",
    emailTemplate(content),
  );
};

const sendPasswordResetOtpEmail = async (user, otp) => {
  const content = `
    <h2>Password Reset OTP</h2>
    <p>Hi <strong>${user.name}</strong>,</p>
    <p>Use the OTP below to reset your Jass Automotives account password.</p>
    <div class="info-box" style="text-align: center;">
      <div class="info-row">
        <span class="label" style="display: block; margin-bottom: 8px;">Your OTP</span>
        <span class="value" style="font-size: 32px; letter-spacing: 8px; font-weight: bold; color: #C90000;">${otp}</span>
      </div>
      <div class="info-row"><span class="label">Valid for:</span> <span class="value">10 minutes</span></div>
    </div>
    <p>If you did not request this, you can ignore this email. Your password will remain unchanged.</p>
    <p>Best regards,<br><strong>Jass Automotives Team</strong></p>
  `;
  await sendEmail(
    user.email,
    "Password Reset OTP - Jass Automotives",
    emailTemplate(content),
  );
};

const sendBookingConfirmationEmail = async (booking, user, serviceImage = 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=200&fit=crop') => {
  console.log('Booking isCombo flag:', booking.isCombo);
  
  const content = `
    <h2>Booking Confirmation</h2>
    <p>Hi <strong>${user.name}</strong>,</p>
    <p>Your booking has been confirmed successfully!</p>
    
    ${!booking.isCombo ? `<div style="text-align: center; margin: 20px 0;">
      <img src="${serviceImage}" alt="Service Image" style="width: 100%; max-width: 400px; height: 200px; object-fit: cover; border-radius: 8px;">
    </div>` : ''}
    
    <div class="info-box">
      <div class="info-row"><span class="label">Booking ID:</span> <span class="value">${booking.bookingId}</span></div>
      <div class="info-row"><span class="label">Service:</span> <span class="value">${booking.service}</span></div>
      <div class="info-row"><span class="label">${booking.isCombo ? 'Included Services:' : 'Plan:'}</span> <span class="value">${booking.serviceTier}</span></div>
      ${booking.isCombo && booking.originalPrice ? `<div class="info-row"><span class="label">Original Price:</span> <span class="value" style="text-decoration: line-through; color: #999;">₹${booking.originalPrice.toLocaleString()}</span></div>` : ''}
      <div class="info-row"><span class="label">${booking.isCombo ? 'Discounted Price:' : 'Service Price:'}</span> <span class="value">₹${(booking.totalAmount - (booking.pickupOption === 'pickup' ? 499 : 0)).toLocaleString()}</span></div>
      <div class="info-row"><span class="label">Date:</span> <span class="value">${new Date(booking.date).toLocaleDateString('en-GB')}</span></div>
      <div class="info-row"><span class="label">Time:</span> <span class="value">${booking.timeSlot}</span></div>
      <div class="info-row"><span class="label">Vehicle:</span> <span class="value">${booking.carBrand} ${booking.carModel} (${booking.carYear})</span></div>
      ${booking.pickupOption === 'pickup' ? '<div class="info-row"><span class="label">Pickup Charge:</span> <span class="value">₹499</span></div>' : ''}
      <div class="info-row"><span class="label">Total Amount:</span> <span class="value">₹${booking.totalAmount.toLocaleString()}</span></div>
      <div class="info-row"><span class="label">Status:</span> <span class="value">${booking.status.toUpperCase()}</span></div>
    </div>
    <p>We will contact you soon with more details.</p>
    <p>Best regards,<br><strong>Jass Automotives Team</strong></p>
  `;
  await sendEmail(
    user.email,
    "Booking Confirmation - Jass Automotives",
    emailTemplate(content),
  );
};

const sendBookingStatusUpdateEmail = async (booking, user) => {
  const content = `
    <h2>Booking Status Update</h2>
    <p>Hi <strong>${user.name}</strong>,</p>
    <p>Your booking status has been updated.</p>
    
    <div style="text-align: center; margin: 20px 0;">
      <img src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=200&fit=crop" alt="Service Image" style="width: 100%; max-width: 400px; height: 200px; object-fit: cover; border-radius: 8px;">
    </div>
    
    <div class="info-box">
      <div class="info-row"><span class="label">Booking ID:</span> <span class="value">${booking.bookingId}</span></div>
      <div class="info-row"><span class="label">Service:</span> <span class="value">${booking.service}</span></div>
      <div class="info-row"><span class="label">Plan:</span> <span class="value">${booking.serviceTier}</span></div>
      <div class="info-row"><span class="label">New Status:</span> <span class="value" style="color: #C90000; font-weight: bold;">${booking.status.toUpperCase()}</span></div>
      <div class="info-row"><span class="label">Date:</span> <span class="value">${new Date(booking.date).toLocaleDateString('en-GB')}</span></div>
      <div class="info-row"><span class="label">Time:</span> <span class="value">${booking.timeSlot}</span></div>
      <div class="info-row"><span class="label">Vehicle:</span> <span class="value">${booking.carBrand} ${booking.carModel}</span></div>
    </div>
    <p>Thank you for choosing Jass Automotives!</p>
    <p>Best regards,<br><strong>Jass Automotives Team</strong></p>
  `;
  await sendEmail(
    user.email,
    "Booking Status Update - Jass Automotives",
    emailTemplate(content),
  );
};

const sendOrderConfirmationEmail = async (order, user) => {
  const itemsHtml = order.items.map(item => `
    <tr>
      <td style="padding: 15px; border-bottom: 1px solid #f0f0f0;">
        <img src="${item.image}" alt="${item.name}" style="width: 80px; height: 80px; object-fit: cover; border-radius: 8px;">
      </td>
      <td style="padding: 15px; border-bottom: 1px solid #f0f0f0;">
        <strong style="color: #2a2a2a; font-size: 14px;">${item.name}</strong>
      </td>
      <td style="padding: 15px; border-bottom: 1px solid #f0f0f0; text-align: center;">
        <span style="color: #555555;">Qty: ${item.quantity}</span>
      </td>
      <td style="padding: 15px; border-bottom: 1px solid #f0f0f0; text-align: right;">
        <strong style="color: #C90000;">₹${item.price}</strong>
      </td>
      <td style="padding: 15px; border-bottom: 1px solid #f0f0f0; text-align: right;">
        <strong style="color: #2a2a2a;">₹${item.price * item.quantity}</strong>
      </td>
    </tr>
  `).join('');

  const content = `
    <h2>Order Confirmation</h2>
    <p>Hi <strong>${user.name}</strong>,</p>
    <p>Your order has been confirmed successfully!</p>
    <div class="info-box">
      <div class="info-row"><span class="label">Order ID:</span> <span class="value">${order.orderId}</span></div>
      <div class="info-row"><span class="label">Total Amount:</span> <span class="value">₹${order.totalAmount}</span></div>
      <div class="info-row"><span class="label">Status:</span> <span class="value">${order.status.toUpperCase()}</span></div>
    </div>
    <h3 style="color: #2a2a2a; margin-top: 30px; margin-bottom: 15px;">Order Items:</h3>
    <table style="width: 100%; border-collapse: collapse; background: white; border-radius: 8px; overflow: hidden;">
      <thead>
        <tr style="background: #f9f9f9;">
          <th style="padding: 12px; text-align: left; color: #2a2a2a; font-size: 12px; text-transform: uppercase;">Image</th>
          <th style="padding: 12px; text-align: left; color: #2a2a2a; font-size: 12px; text-transform: uppercase;">Product</th>
          <th style="padding: 12px; text-align: center; color: #2a2a2a; font-size: 12px; text-transform: uppercase;">Quantity</th>
          <th style="padding: 12px; text-align: right; color: #2a2a2a; font-size: 12px; text-transform: uppercase;">Price</th>
          <th style="padding: 12px; text-align: right; color: #2a2a2a; font-size: 12px; text-transform: uppercase;">Total</th>
        </tr>
      </thead>
      <tbody>
        ${itemsHtml}
      </tbody>
    </table>
    <p style="margin-top: 30px;">We will process your order and send you tracking details soon.</p>
    <p>Best regards,<br><strong>Jass Automotives Team</strong></p>
  `;
  await sendEmail(
    user.email,
    "Order Confirmation - Jass Automotives",
    emailTemplate(content),
  );
};

const sendOrderStatusUpdateEmail = async (order, user) => {
  const itemsHtml = order.items.map(item => `
    <tr>
      <td style="padding: 15px; border-bottom: 1px solid #f0f0f0;">
        <img src="${item.image}" alt="${item.name}" style="width: 80px; height: 80px; object-fit: cover; border-radius: 8px;">
      </td>
      <td style="padding: 15px; border-bottom: 1px solid #f0f0f0;">
        <strong style="color: #2a2a2a; font-size: 14px;">${item.name}</strong>
      </td>
      <td style="padding: 15px; border-bottom: 1px solid #f0f0f0; text-align: center;">
        <span style="color: #555555;">Qty: ${item.quantity}</span>
      </td>
      <td style="padding: 15px; border-bottom: 1px solid #f0f0f0; text-align: right;">
        <strong style="color: #C90000;">₹${item.price}</strong>
      </td>
      <td style="padding: 15px; border-bottom: 1px solid #f0f0f0; text-align: right;">
        <strong style="color: #2a2a2a;">₹${item.price * item.quantity}</strong>
      </td>
    </tr>
  `).join('');

  const content = `
    <h2>Order Status Update</h2>
    <p>Hi <strong>${user.name}</strong>,</p>
    <p>Your order status has been updated.</p>
    <div class="info-box">
      <div class="info-row"><span class="label">Order ID:</span> <span class="value">${order.orderId}</span></div>
      <div class="info-row"><span class="label">New Status:</span> <span class="value" style="color: #C90000; font-weight: bold;">${order.status.toUpperCase()}</span></div>
      <div class="info-row"><span class="label">Total Amount:</span> <span class="value">₹${order.totalAmount}</span></div>
    </div>
    <h3 style="color: #2a2a2a; margin-top: 30px; margin-bottom: 15px;">Order Items:</h3>
    <table style="width: 100%; border-collapse: collapse; background: white; border-radius: 8px; overflow: hidden;">
      <thead>
        <tr style="background: #f9f9f9;">
          <th style="padding: 12px; text-align: left; color: #2a2a2a; font-size: 12px; text-transform: uppercase;">Image</th>
          <th style="padding: 12px; text-align: left; color: #2a2a2a; font-size: 12px; text-transform: uppercase;">Product</th>
          <th style="padding: 12px; text-align: center; color: #2a2a2a; font-size: 12px; text-transform: uppercase;">Quantity</th>
          <th style="padding: 12px; text-align: right; color: #2a2a2a; font-size: 12px; text-transform: uppercase;">Price</th>
          <th style="padding: 12px; text-align: right; color: #2a2a2a; font-size: 12px; text-transform: uppercase;">Total</th>
        </tr>
      </thead>
      <tbody>
        ${itemsHtml}
      </tbody>
    </table>
    <p style="margin-top: 30px;">Thank you for your purchase!</p>
    <p>Best regards,<br><strong>Jass Automotives Team</strong></p>
  `;
  await sendEmail(
    user.email,
    "Order Status Update - Jass Automotives",
    emailTemplate(content),
  );
};

module.exports = {
  sendRegistrationEmail,
  sendLoginEmail,
  sendPasswordResetOtpEmail,
  sendBookingConfirmationEmail,
  sendBookingStatusUpdateEmail,
  sendOrderConfirmationEmail,
  sendOrderStatusUpdateEmail,
};
