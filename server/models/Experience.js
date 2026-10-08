const mongoose = require('mongoose');

const experienceSchema = new mongoose.Schema(
  {
    company: {
      type: String,
      required: [true, 'Company name is required'],
      trim: true,
    },
    position: {
      type: String,
      required: [true, 'Position/Role is required'],
      trim: true,
    },
    role: {
      type: String,
      trim: true,
    },
    duration: {
      type: String,
      default: '',
    },
    startDate: {
      type: String,
      default: '',
    },
    endDate: {
      type: String,
      default: 'Present',
    },
    description: {
      type: String,
      default: '',
    },
    certificateUrl: {
      type: String,
      default: '',
      trim: true,
    },
    technologies: {
      type: [String],
      default: [],
    },
    order: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

experienceSchema.pre('save', function (next) {
  if (this.role && !this.position) {
    this.position = this.role;
  }
  if (!this.role && this.position) {
    this.role = this.position;
  }
  if (this.duration && !this.startDate) {
    this.startDate = this.duration;
  }
  next();
});

module.exports = mongoose.model('Experience', experienceSchema);
