const express = require('express');
const router = express.Router();
const upload = require('../middleware/uploadMiddleware');
const { protect } = require('../middleware/authMiddleware');

// @desc    Upload a single file (image or resume PDF)
// @route   POST /api/upload
// @access  Private
router.post('/', protect, upload.single('file'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    // Construct the public URL path
    const fileUrl = `/uploads/${req.file.filename}`;

    res.json({
      message: 'File uploaded successfully',
      url: fileUrl,
      filename: req.file.filename,
      originalName: req.file.originalname,
      mimetype: req.file.mimetype,
      size: req.file.size,
    });
  } catch (error) {
    res.status(500).json({ message: 'File upload error', error: error.message });
  }
});

module.exports = router;
