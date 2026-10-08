const Education = require('../models/Education');

// @desc    Get all education records
// @route   GET /api/education
// @access  Public
const getEducation = async (req, res) => {
  try {
    const records = await Education.find().sort({ order: 1, endYear: -1 });
    res.json(records);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching education records', error: error.message });
  }
};

// @desc    Create education record
// @route   POST /api/education
// @access  Private
const createEducation = async (req, res) => {
  try {
    const record = await Education.create(req.body);
    res.status(201).json(record);
  } catch (error) {
    res.status(400).json({ message: 'Error creating education record', error: error.message });
  }
};

// @desc    Update education record
// @route   PUT /api/education/:id
// @access  Private
const updateEducation = async (req, res) => {
  try {
    const record = await Education.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!record) {
      return res.status(404).json({ message: 'Education record not found' });
    }
    res.json(record);
  } catch (error) {
    res.status(400).json({ message: 'Error updating education record', error: error.message });
  }
};

// @desc    Delete education record
// @route   DELETE /api/education/:id
// @access  Private
const deleteEducation = async (req, res) => {
  try {
    const record = await Education.findByIdAndDelete(req.params.id);
    if (!record) {
      return res.status(404).json({ message: 'Education record not found' });
    }
    res.json({ message: 'Education record deleted successfully', id: req.params.id });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting education record', error: error.message });
  }
};

module.exports = {
  getEducation,
  createEducation,
  updateEducation,
  deleteEducation,
};
