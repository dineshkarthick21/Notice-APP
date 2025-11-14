// server.js
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

// Load env first
dotenv.config();

const connectDB = require('./db');
const authRoutes = require('./routes/authRoutes');
const noticeRoutes = require('./routes/noticeRoutes');

const app = express();
connectDB();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/notices', noticeRoutes);

// Debug
console.log('JWT_SECRET:', process.env.JWT_SECRET ? 'loaded' : 'missing');

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
