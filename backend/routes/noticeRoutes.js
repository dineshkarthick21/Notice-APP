// routes/noticeRoutes.js
const express = require('express');
const noticeController = require('../controllers/noticeController');
const { authenticate, adminOnly } = require('../middleware/authMiddleware');

const router = express.Router();

// Public read-only (change to `authenticate` if you want only logged in users to view)
router.get('/', noticeController.getAllNotices);
router.get('/:id', noticeController.getNoticeById);

// Secure admin routes
router.post('/', authenticate, adminOnly, noticeController.createNotice);
router.put('/:id', authenticate, adminOnly, noticeController.updateNotice);
router.delete('/:id', authenticate, adminOnly, noticeController.deleteNotice);

module.exports = router;
