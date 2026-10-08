const mongoose = require('mongoose');

const educationSchema = new mongoose.Schema(
  {
    degree: {
      type: String,
      required: [true, 'Degree is required'],
      trim: true,
    },
    institution: {
      type: String,
      required: [true, 'Institution is required'],
      trim: true,
    },
    university: {
      type: String,
      default: '',
      trim: true,
    },
    department: {
      type: String,
      default: '',
      trim: true,
    },
    cgpa: {
      type: String,
      default: '',
      trim: true,
    },
    year: {
      type: String,
      default: '',
      trim: true,
    },
    startYear: {
      type: String,
      default: '',
    },
    endYear: {
      type: String,
      default: '',
    },
    description: {
      type: String,
      default: '',
    },
    order: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Education', educationSchema);
