const express = require('express');
const router = express.Router();
const {
  createMessage,
  getMessages,
  toggleReadStatus,
  deleteMessage,
} = require('../controllers/messageController');
const { protect } = require('../middleware/authMiddleware');

router.post('/', createMessage); // Public form submission
router.get('/', protect, getMessages); // Admin only
router.patch('/:id/read', protect, toggleReadStatus); // Admin only
router.delete('/:id', protect, deleteMessage); // Admin only

module.exports = router;
