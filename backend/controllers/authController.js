// controllers/authController.js
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// 🟢 SIGNUP CONTROLLER
exports.signup = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // Validate required fields
    if (!name || !email || !password)
      return res.status(400).json({ message: 'Name, email, and password are required' });

    // Validate role is either 'admin' or 'user'
    const validRole = role && ['admin', 'user'].includes(role) ? role : 'user';

    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: 'User already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({ name, email, password: hashedPassword, role: validRole });
    await user.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    console.error('Signup error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

// 🟣 LOGIN CONTROLLER
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user)
      return res.status(400).json({ message: 'User not found' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: 'Invalid credentials' });

    // ✅ Use process.env.JWT_SECRET directly
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.json({
      message: 'Login successful',
      token,
      role: user.role,
      userId: user._id,
    });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};
