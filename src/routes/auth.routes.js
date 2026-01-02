const express = require('express');
const router = express.Router();
const {
  signup,
  login,
  forgotPassword,
  resetPassword,
  getMe,
} = require('../controllers/auth.controller');
const { protect } = require('../middlewares/auth.middleware');

// Public routes
router.post('/signup', signup);
router.post('/login', login);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password/:token', resetPassword);

// Protected routes
router.get('/me', protect, getMe);

module.exports = router;
