const Certification = require('../models/Certification');

// @desc    Get all certifications
// @route   GET /api/certifications
// @access  Public
const getCertifications = async (req, res) => {
  try {
    const certs = await Certification.find().sort({ order: 1, issueDate: -1 });
    res.json(certs);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching certifications', error: error.message });
  }
};

// @desc    Create certification
// @route   POST /api/certifications
// @access  Private
const createCertification = async (req, res) => {
  try {
    const cert = await Certification.create(req.body);
    res.status(201).json(cert);
  } catch (error) {
    res.status(400).json({ message: 'Error creating certification', error: error.message });
  }
};

// @desc    Update certification
// @route   PUT /api/certifications/:id
// @access  Private
const updateCertification = async (req, res) => {
  try {
    const cert = await Certification.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!cert) {
      return res.status(404).json({ message: 'Certification not found' });
    }
    res.json(cert);
  } catch (error) {
    res.status(400).json({ message: 'Error updating certification', error: error.message });
  }
};

// @desc    Delete certification
// @route   DELETE /api/certifications/:id
// @access  Private
const deleteCertification = async (req, res) => {
  try {
    const cert = await Certification.findByIdAndDelete(req.params.id);
    if (!cert) {
      return res.status(404).json({ message: 'Certification not found' });
    }
    res.json({ message: 'Certification deleted successfully', id: req.params.id });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting certification', error: error.message });
  }
};

module.exports = {
  getCertifications,
  createCertification,
  updateCertification,
  deleteCertification,
};
