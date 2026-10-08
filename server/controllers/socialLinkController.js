const SocialLink = require('../models/SocialLink');

// @desc    Get all social links
// @route   GET /api/social-links
// @access  Public
const getSocialLinks = async (req, res) => {
  try {
    const links = await SocialLink.find().sort({ order: 1 });
    res.json(links);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching social links', error: error.message });
  }
};

// @desc    Create social link
// @route   POST /api/social-links
// @access  Private
const createSocialLink = async (req, res) => {
  try {
    const link = await SocialLink.create(req.body);
    res.status(201).json(link);
  } catch (error) {
    res.status(400).json({ message: 'Error creating social link', error: error.message });
  }
};

// @desc    Update social link
// @route   PUT /api/social-links/:id
// @access  Private
const updateSocialLink = async (req, res) => {
  try {
    const link = await SocialLink.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!link) {
      return res.status(404).json({ message: 'Social link not found' });
    }
    res.json(link);
  } catch (error) {
    res.status(400).json({ message: 'Error updating social link', error: error.message });
  }
};

// @desc    Delete social link
// @route   DELETE /api/social-links/:id
// @access  Private
const deleteSocialLink = async (req, res) => {
  try {
    const link = await SocialLink.findByIdAndDelete(req.params.id);
    if (!link) {
      return res.status(404).json({ message: 'Social link not found' });
    }
    res.json({ message: 'Social link deleted successfully', id: req.params.id });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting social link', error: error.message });
  }
};

module.exports = {
  getSocialLinks,
  createSocialLink,
  updateSocialLink,
  deleteSocialLink,
};
