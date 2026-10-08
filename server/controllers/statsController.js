const Project = require('../models/Project');
const Skill = require('../models/Skill');
const Certification = require('../models/Certification');
const Message = require('../models/Message');
const Experience = require('../models/Experience');
const Education = require('../models/Education');

// @desc    Get dashboard statistics
// @route   GET /api/stats
// @access  Private
const getStats = async (req, res) => {
  try {
    const [
      totalProjects,
      totalSkills,
      totalCertifications,
      totalMessages,
      unreadMessages,
      totalExperience,
      totalEducation,
    ] = await Promise.all([
      Project.countDocuments(),
      Skill.countDocuments(),
      Certification.countDocuments(),
      Message.countDocuments(),
      Message.countDocuments({ read: false }),
      Experience.countDocuments(),
      Education.countDocuments(),
    ]);

    const recentMessages = await Message.find().sort({ createdAt: -1 }).limit(5);
    const recentProjects = await Project.find().sort({ createdAt: -1 }).limit(4);

    res.json({
      totalProjects,
      totalSkills,
      totalCertifications,
      totalMessages,
      unreadMessages,
      totalExperience,
      totalEducation,
      recentMessages,
      recentProjects,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving dashboard statistics', error: error.message });
  }
};

module.exports = { getStats };
