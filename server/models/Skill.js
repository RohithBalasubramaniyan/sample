const mongoose = require('mongoose');

const skillSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Skill name is required'],
      trim: true,
    },
    category: {
      type: String,
      required: [true, 'Category is required'],
      default: 'Frontend',
      trim: true,
    },
    percentage: {
      type: Number,
      min: 0,
      max: 100,
      default: 75,
    },
    proficiency: {
      type: Number,
    },
    icon: {
      type: String,
      default: 'Code',
    },
    order: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform: (doc, ret) => {
        if (ret.percentage === undefined && ret.proficiency !== undefined) {
          ret.percentage = ret.proficiency;
        }
        return ret;
      },
    },
  }
);

skillSchema.pre('save', function (next) {
  if (this.percentage === undefined && this.proficiency !== undefined) {
    this.percentage = this.proficiency;
  }
  next();
});

module.exports = mongoose.model('Skill', skillSchema);
