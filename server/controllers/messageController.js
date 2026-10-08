const Message = require('../models/Message');

// @desc    Create contact message
// @route   POST /api/messages
// @access  Public
const createMessage = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;
    if (!name || !email || !subject || !message) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const newMessage = await Message.create({
      name,
      email,
      subject,
      message,
    });

    res.status(201).json({ message: 'Message sent successfully! Thank you for reaching out.', data: newMessage });
  } catch (error) {
    res.status(400).json({ message: 'Failed to send message', error: error.message });
  }
};

// @desc    Get all contact messages
// @route   GET /api/messages
// @access  Private
const getMessages = async (req, res) => {
  try {
    const messages = await Message.find().sort({ createdAt: -1 });
    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving messages', error: error.message });
  }
};

// @desc    Mark message as read/unread
// @route   PATCH /api/messages/:id/read
// @access  Private
const toggleReadStatus = async (req, res) => {
  try {
    const message = await Message.findById(req.params.id);
    if (!message) {
      return res.status(404).json({ message: 'Message not found' });
    }
    message.read = req.body.read !== undefined ? req.body.read : !message.read;
    await message.save();
    res.json(message);
  } catch (error) {
    res.status(400).json({ message: 'Error updating message status', error: error.message });
  }
};

// @desc    Delete message
// @route   DELETE /api/messages/:id
// @access  Private
const deleteMessage = async (req, res) => {
  try {
    const message = await Message.findByIdAndDelete(req.params.id);
    if (!message) {
      return res.status(404).json({ message: 'Message not found' });
    }
    res.json({ message: 'Message deleted successfully', id: req.params.id });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting message', error: error.message });
  }
};

module.exports = {
  createMessage,
  getMessages,
  toggleReadStatus,
  deleteMessage,
};
