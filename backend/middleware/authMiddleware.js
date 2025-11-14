// middleware/authMiddleware.js
const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.authenticate = async (req, res, next) => {
  const authHeader = req.headers.authorization || '';
  const token = authHeader.startsWith('Bearer ') ? authHeader.split(' ')[1] : null;

  if (!token) return res.status(401).json({ message: 'No token provided' });

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    // attach user info to request
    req.user = { id: payload.id, role: payload.role };
    // optionally fetch user data
    req.userDoc = await User.findById(payload.id).select('-password');
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
};

// Admin-only middleware
exports.adminOnly = (req, res, next) => {
  if (!req.user) return res.status(401).json({ message: 'Not authenticated' });
  if (req.user.role !== 'admin') return res.status(403).json({ message: 'Admins only' });
  next();
};
