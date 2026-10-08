const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      default: 'Rohith B',
    },
    title: {
      type: String,
      required: true,
      default: 'IT Student | Web Developer | Aspiring Software Engineer',
    },
    email: {
      type: String,
      required: true,
      default: 'rohith.dev@example.com',
    },
    phone: {
      type: String,
      default: '+91 98765 43210',
    },
    location: {
      type: String,
      default: 'Bengaluru, Karnataka, India',
    },
    profileImage: {
      type: String,
      default: '/images/profile.jpg',
    },
    statusBadge: {
      type: String,
      default: 'Available for Internships & Opportunities',
    },
    greeting: {
      type: String,
      default: 'Hello, I am',
    },
    tagline: {
      type: String,
      default: 'Building modern, scalable, and responsive web applications',
    },
    workType: {
      type: String,
      default: 'Full-Stack & Web Engineering',
    },
    viewProjectsText: {
      type: String,
      default: 'View Projects',
    },
    viewResumeText: {
      type: String,
      default: 'Download Resume',
    },
    aboutTitle: {
      type: String,
      default: 'About Me',
    },
    aboutSubtitle: {
      type: String,
      default: 'Passionate About Technology & Problem Solving',
    },
    aboutDescription: {
      type: String,
      default: 'Passionate Information Technology student with hands-on expertise in modern web technologies, responsive interfaces, and RESTful architectures. Driven to create performant, scalable, and intuitive digital applications.',
    },
    bio: {
      type: String,
      default: 'Passionate Information Technology student with hands-on expertise in modern web technologies, responsive interfaces, and RESTful architectures. Driven to create performant, scalable, and intuitive digital applications.',
    },
    careerObjective: {
      type: String,
      default: 'Seeking software engineering and web development internships where I can contribute to impactful digital products, expand backend and cloud skills, and collaborate within high-caliber engineering teams.',
    },
    interests: {
      type: [String],
      default: ['Full-Stack Development', 'Cloud Architectures', 'UI/UX Design Systems', 'Open Source', 'Competitive Problem Solving'],
    },
    currentLearning: {
      type: [String],
      default: ['TypeScript', 'Next.js App Router', 'Docker & Containerization', 'Microservices', 'GraphQL'],
    },
    resumeUrl: {
      type: String,
      default: '/resume/resume.pdf',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Profile', profileSchema);
