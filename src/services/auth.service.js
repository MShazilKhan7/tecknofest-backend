const prisma = require('../utils/prisma');
const { hashPassword, comparePassword } = require('../utils/hash');
const { generateToken, generateResetToken, hashToken } = require('../utils/token');
const emailService = require('./email.service');

/**
 * Register a new user
 */
const signup = async (userData) => {
  const { email, password, name } = userData;

  // Check if user already exists
  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) {
    throw new Error('User already exists with this email');
  }

  // Hash password
  const hashedPassword = await hashPassword(password);

  // Create user
  const user = await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
      name,
    },
  });

  // Send welcome email
  await emailService.sendWelcomeEmail(user.email, user.name);

  // Generate token
  const token = generateToken(user.id);

  return {
    user,
    accessToken: token,
    refreshToken: '',
  };
};

/**
 * Login user
 */
const login = async (email, password) => {
  // Find user
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    throw new Error('Invalid email or password');
  }

  // Check password
  const isPasswordMatch = await comparePassword(password, user.password);
  if (!isPasswordMatch) {
    throw new Error('Invalid email or password');
  }

  // Generate token
  const token = generateToken(user.id);

  return {
    token,
    refreshToken: '',
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      isVerified: user.isVerified ?? true,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    },
  }
};

/**
 * Forgot password - generate reset token and send email
 */
const forgotPassword = async (email) => {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    throw new Error('No user found with this email');
  }

  // Generate reset token
  const resetToken = generateResetToken();
  const hashedResetToken = hashToken(resetToken);
  const resetTokenExpiry = new Date(Date.now() + 3600000); // 1 hour from now

  // Save to DB
  await prisma.user.update({
    where: { id: user.id },
    data: {
      resetToken: hashedResetToken,
      resetTokenExpiry,
    },
  });

  // Send email
  await emailService.sendPasswordResetEmail(user.email, resetToken);

  return true;
};

/**
 * Reset password using token
 */
const resetPassword = async (token, newPassword) => {
  const hashedToken = hashToken(token);

  // Find user with valid token and not expired
  const user = await prisma.user.findFirst({
    where: {
      resetToken: hashedToken,
      resetTokenExpiry: {
        gt: new Date(),
      },
    },
  });

  if (!user) {
    throw new Error('Invalid or expired reset token');
  }

  // Hash new password
  const hashedPassword = await hashPassword(newPassword);

  // Update user and clear reset token fields
  await prisma.user.update({
    where: { id: user.id },
    data: {
      password: hashedPassword,
      resetToken: null,
      resetTokenExpiry: null,
    },
  });

  return true;
};

module.exports = {
  signup,
  login,
  forgotPassword,
  resetPassword,
};
