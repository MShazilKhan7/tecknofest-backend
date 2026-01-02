const authService = require('../services/auth.service');

/**
 * @desc    Register new user
 * @route   POST /api/auth/signup
 * @access  Public
 */
const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Basic validation
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Please provide all required fields' });
    }

    const { user, token } = await authService.signup({ name, email, password });

    res.status(201).json({
      success: true,
      data: {
        id: user.id,
        name: user.name,
        email: user.email,
        token,
      },
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * @desc    Authenticate user & get token
 * @route   POST /api/auth/login
 * @access  Public
 */
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Please provide email and password' });
    }

    const { user, token } = await authService.login(email, password);

    res.status(200).json({
      success: true,
      data: {
        id: user.id,
        name: user.name,
        email: user.email,
        token,
      },
    });
  } catch (error) {
    res.status(401).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * @desc    Forgot password
 * @route   POST /api/auth/forgot-password
 * @access  Public
 */
const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: 'Please provide an email' });
    }

    await authService.forgotPassword(email);

    res.status(200).json({
      success: true,
      message: 'Password reset email sent',
    });
  } catch (error) {
    // We don't want to reveal if a user exists or not for security reasons in some cases,
    // but here we follow the service's error for clarity.
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * @desc    Reset password
 * @route   POST /api/auth/reset-password/:token
 * @access  Public
 */
const resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { password } = req.body;

    if (!password) {
      return res.status(400).json({ message: 'Please provide a new password' });
    }

    await authService.resetPassword(token, password);

    res.status(200).json({
      success: true,
      message: 'Password reset successful',
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * @desc    Get current user profile
 * @route   GET /api/auth/me
 * @access  Private
 */
const getMe = async (req, res) => {
  res.status(200).json({
    success: true,
    data: req.user,
  });
};

module.exports = {
  signup,
  login,
  forgotPassword,
  resetPassword,
  getMe,
};
