const Experience = require('../models/Experience');

// @desc    Get all experience records
// @route   GET /api/experience
// @access  Public
const getExperience = async (req, res) => {
  try {
    const experiences = await Experience.find().sort({ order: 1, createdAt: -1 });
    res.json(experiences);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching experiences', error: error.message });
  }
};

// @desc    Create experience record
// @route   POST /api/experience
// @access  Private
const createExperience = async (req, res) => {
  try {
    const exp = await Experience.create(req.body);
    res.status(201).json(exp);
  } catch (error) {
    res.status(400).json({ message: 'Error creating experience', error: error.message });
  }
};

// @desc    Update experience record
// @route   PUT /api/experience/:id
// @access  Private
const updateExperience = async (req, res) => {
  try {
    const exp = await Experience.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!exp) {
      return res.status(404).json({ message: 'Experience record not found' });
    }
    res.json(exp);
  } catch (error) {
    res.status(400).json({ message: 'Error updating experience', error: error.message });
  }
};

// @desc    Delete experience record
// @route   DELETE /api/experience/:id
// @access  Private
const deleteExperience = async (req, res) => {
  try {
    const exp = await Experience.findByIdAndDelete(req.params.id);
    if (!exp) {
      return res.status(404).json({ message: 'Experience record not found' });
    }
    res.json({ message: 'Experience record deleted successfully', id: req.params.id });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting experience', error: error.message });
  }
};

module.exports = {
  getExperience,
  createExperience,
  updateExperience,
  deleteExperience,
};
