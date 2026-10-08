const mongoose = require('mongoose');

const certificationSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Certification name is required'],
      trim: true,
    },
    organization: {
      type: String,
      required: [true, 'Organization is required'],
      trim: true,
    },
    issueDate: {
      type: String,
      required: [true, 'Issue date is required'],
    },
    credentialId: {
      type: String,
      default: '',
    },
    certificateUrl: {
      type: String,
      default: '',
    },
    image: {
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

module.exports = mongoose.model('Certification', certificationSchema);
