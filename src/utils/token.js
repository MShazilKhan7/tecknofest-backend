const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const env = require('../config/env');

/**
 * Generate JWT token for user
 * @param {string} userId 
 * @returns {string}
 */
const generateToken = (userId) => {
  return jwt.sign({ id: userId }, env.JWT_SECRET, {
    expiresIn: env.JWT_EXPIRES_IN,
  });
};

/**
 * Generate a secure random token for password reset
 * @returns {string}
 */
const generateResetToken = () => {
  return crypto.randomBytes(32).toString('hex');
};

/**
 * Hash a token (for storing in DB)
 * @param {string} token 
 * @returns {string}
 */
const hashToken = (token) => {
  return crypto.createHash('sha256').update(token).digest('hex');
};

module.exports = {
  generateToken,
  generateResetToken,
  hashToken,
};
