const express = require('express');
const { signup, login, getProfile, updateProfile, addAddress, getAddresses } = require('./authController');
const { validateSignup, validateLogin } = require('./validators');
const { validationResult } = require('express-validator');
const authMiddleware = require('./authMiddleware');

const router = express.Router();

// Middleware to return validation errors
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
  next();
};

// Public routes
router.post('/signup', validateSignup, handleValidationErrors, signup);
router.post('/login', validateLogin, handleValidationErrors, login);

// Protected routes
router.get('/profile', authMiddleware, getProfile);
router.put('/profile', authMiddleware, updateProfile);

// ✅ Address routes
router.post('/address', authMiddleware, addAddress);
router.get('/address', authMiddleware, getAddresses);

module.exports = router;