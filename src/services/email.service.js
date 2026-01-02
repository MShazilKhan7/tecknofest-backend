const nodemailer = require('nodemailer');
const env = require('../config/env');

const transporter = nodemailer.createTransport({
  host: env.EMAIL_HOST,
  port: env.EMAIL_PORT,
  auth: {
    user: env.EMAIL_USER,
    pass: env.EMAIL_PASS,
  },
});

/**
 * Send welcome email to new user
 * @param {string} email 
 * @param {string} name 
 */
const sendWelcomeEmail = async (email, name) => {
  const mailOptions = {
    from: env.EMAIL_FROM,
    to: email,
    subject: 'Welcome to Our Platform',
    html: `
      <h1>Welcome, ${name}!</h1>
      <p>Thank you for signing up. We're glad to have you with us.</p>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error('Error sending welcome email:', error);
    // In production, you might want to log this to a service like Sentry
  }
};

/**
 * Send password reset email
 * @param {string} email 
 * @param {string} resetToken 
 */
const sendPasswordResetEmail = async (email, resetToken) => {
  const resetUrl = `${env.FRONTEND_URL}/reset-password?token=${resetToken}`;
  
  const mailOptions = {
    from: env.EMAIL_FROM,
    to: email,
    subject: 'Password Reset Request',
    html: `
      <h1>Password Reset</h1>
      <p>You requested a password reset. Please click the link below to reset your password:</p>
      <a href="${resetUrl}">${resetUrl}</a>
      <p>This link will expire in 1 hour.</p>
      <p>If you didn't request this, please ignore this email.</p>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error('Error sending password reset email:', error);
    throw new Error('Email could not be sent');
  }
};

module.exports = {
  sendWelcomeEmail,
  sendPasswordResetEmail,
};
