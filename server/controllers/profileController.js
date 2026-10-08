const Profile = require('../models/Profile');

// @desc    Get profile
// @route   GET /api/profile
// @access  Public
const getProfile = async (req, res) => {
  try {
    let profile = await Profile.findOne();
    if (!profile) {
      profile = await Profile.create({
        name: 'Rohith B',
        title: 'IT Student | Web Developer | Aspiring Software Engineer',
        email: 'rohith.dev@example.com',
        phone: '+91 98765 43210',
        location: 'Bengaluru, Karnataka, India',
        bio: 'Passionate Information Technology student with hands-on expertise in modern web technologies, responsive interfaces, and RESTful architectures. Driven to create performant, scalable, and intuitive digital applications.',
        careerObjective: 'Seeking software engineering and web development internships where I can contribute to impactful digital products, expand backend and cloud skills, and collaborate within high-caliber engineering teams.',
        interests: ['Full-Stack Development', 'Cloud Architectures', 'UI/UX Design Systems', 'Open Source', 'Competitive Problem Solving'],
        currentLearning: ['TypeScript', 'Next.js App Router', 'Docker & Containerization', 'Microservices', 'GraphQL'],
        resumeUrl: '',
      });
    }
    res.json(profile);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving profile', error: error.message });
  }
};

// @desc    Update profile
// @route   PUT /api/profile
// @access  Private
const updateProfile = async (req, res) => {
  try {
    let profile = await Profile.findOne();
    if (!profile) {
      profile = new Profile(req.body);
    } else {
      Object.assign(profile, req.body);
    }
    const updatedProfile = await profile.save();
    res.json(updatedProfile);
  } catch (error) {
    res.status(400).json({ message: 'Error updating profile', error: error.message });
  }
};

module.exports = {
  getProfile,
  updateProfile,
};
