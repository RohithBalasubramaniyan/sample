const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Project title is required'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Project description is required'],
    },
    image: {
      type: String,
      default: '',
    },
    technologies: {
      type: [String],
      required: true,
      default: [],
    },
    category: {
      type: String,
      default: 'Full Stack',
      enum: ['Frontend', 'Backend', 'Full Stack', 'Mobile', 'UI/UX', 'Other'],
    },
    githubUrl: {
      type: String,
      default: '',
    },
    liveUrl: {
      type: String,
      default: '',
    },
    featured: {
      type: Boolean,
      default: false,
    },
    order: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Project', projectSchema);
