// controllers/noticeController.js
const Notice = require('../models/Notice');

// Create notice (admin only)
exports.createNotice = async (req, res) => {
  try {
    const { title, date, type } = req.body;
    if (!title || !date || !type) return res.status(400).json({ message: 'Missing fields' });

    const notice = new Notice({ title, date: new Date(date), type, createdBy: req.user.id });
    await notice.save();

    res.status(201).json({ message: 'Notice created', notice });
  } catch (err) {
    console.error('Create notice error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Edit notice (admin only)
exports.updateNotice = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, date, type } = req.body;

    const notice = await Notice.findById(id);
    if (!notice) return res.status(404).json({ message: 'Notice not found' });

    notice.title = title ?? notice.title;
    notice.date = date ? new Date(date) : notice.date;
    notice.type = type ?? notice.type;
    await notice.save();

    res.json({ message: 'Notice updated', notice });
  } catch (err) {
    console.error('Update notice error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete notice (admin only)
exports.deleteNotice = async (req, res) => {
  try {
    const { id } = req.params;
    const notice = await Notice.findByIdAndDelete(id);
    if (!notice) return res.status(404).json({ message: 'Notice not found' });

    res.json({ message: 'Notice deleted' });
  } catch (err) {
    console.error('Delete notice error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get all notices (any authenticated user or even public if you want)
exports.getAllNotices = async (req, res) => {
  try {
    const notices = await Notice.find().sort({ date: -1 });
    res.json({ notices });
  } catch (err) {
    console.error('Get notices error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get single notice
exports.getNoticeById = async (req, res) => {
  try {
    const { id } = req.params;
    const notice = await Notice.findById(id);
    if (!notice) return res.status(404).json({ message: 'Notice not found' });
    res.json({ notice });
  } catch (err) {
    console.error('Get notice error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};
