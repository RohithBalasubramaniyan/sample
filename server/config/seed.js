const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const bcrypt = require('bcryptjs');

dotenv.config({ path: path.join(__dirname, '..', '.env') });

const User = require('../models/User');
const Profile = require('../models/Profile');
const Skill = require('../models/Skill');
const Project = require('../models/Project');
const Education = require('../models/Education');
const Experience = require('../models/Experience');
const Certification = require('../models/Certification');
const SocialLink = require('../models/SocialLink');

const seedData = async () => {
  try {
    const mongoUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/portfolio_db';
    await mongoose.connect(mongoUri);
    console.log('Connected to MongoDB for seeding...');

    // 1. Seed or Reset Admin User
    let admin = await User.findOne({ username: 'admin' });
    if (!admin) {
      admin = new User({
        username: 'admin',
        email: 'admin@rohithb.dev',
        password: process.env.ADMIN_INITIAL_PASSWORD || 'admin123',
        role: 'admin',
      });
      await admin.save();
      console.log('✅ Admin user created: username="admin", password="admin123"');
    } else {
      admin.password = process.env.ADMIN_INITIAL_PASSWORD || 'admin123';
      await admin.save();
      console.log('✅ Admin user password ensured: "admin123"');
    }

    // 2. Seed or Update Profile
    let profile = await Profile.findOne();
    if (!profile) {
      await Profile.create({
        name: 'Rohith B',
        title: 'IT Student | Web Developer | Aspiring Software Engineer',
        email: 'rohithb.dev@gmail.com',
        phone: '+91 98765 43210',
        location: 'Bengaluru, Karnataka, India',
        profileImage: '/images/profile.jpg',
        bio: 'I am an Information Technology student and enthusiastic web developer passionate about engineering high-performance web applications, resilient backend architectures, and clean, intuitive user interfaces. I love turning complex problems into elegant, real-world digital solutions.',
        careerObjective: 'Driven to secure a Software Engineering or Web Development Internship where I can apply modern full-stack competencies, collaborate on scalable software systems, and contribute meaningfully to innovative product development.',
        interests: [
          'Full-Stack Web Development',
          'Cloud Computing & Distributed Systems',
          'Clean Architecture & Clean Code',
          'UI/UX Interaction Design',
          'Open Source Contribution',
          'Algorithms & Data Structures',
        ],
        currentLearning: [
          'Next.js 14 & Server Components',
          'TypeScript & Type-Safe APIs',
          'Docker & CI/CD Pipelines',
          'PostgreSQL & Prisma ORM',
          'System Design Fundamentals',
        ],
        resumeUrl: '',
      });
      console.log('✅ Profile created.');
    } else {
      profile.name = 'Rohith B';
      profile.title = 'IT Student | Web Developer | Aspiring Software Engineer';
      if (!profile.careerObjective) {
        profile.careerObjective = 'Driven to secure a Software Engineering or Web Development Internship where I can apply modern full-stack competencies, collaborate on scalable software systems, and contribute meaningfully to innovative product development.';
      }
      if (!profile.interests || profile.interests.length === 0) {
        profile.interests = [
          'Full-Stack Web Development',
          'Cloud Computing & Distributed Systems',
          'Clean Architecture & Clean Code',
          'UI/UX Interaction Design',
          'Open Source Contribution',
        ];
      }
      if (!profile.currentLearning || profile.currentLearning.length === 0) {
        profile.currentLearning = [
          'Next.js 14 & Server Components',
          'TypeScript & Type-Safe APIs',
          'Docker & CI/CD Pipelines',
          'PostgreSQL & Prisma ORM',
        ];
      }
      await profile.save();
      console.log('✅ Profile updated.');
    }

    // 3. Normalize or Seed Skills
    const existingSkills = await Skill.find();
    if (existingSkills.length === 0) {
      const initialSkills = [
        { name: 'JavaScript (ES6+)', category: 'Frontend', percentage: 88, icon: 'Code', order: 1 },
        { name: 'React.js', category: 'Frontend', percentage: 84, icon: 'Atom', order: 2 },
        { name: 'Tailwind CSS', category: 'Frontend', percentage: 90, icon: 'Palette', order: 3 },
        { name: 'HTML5 & CSS3', category: 'Frontend', percentage: 92, icon: 'Layout', order: 4 },
        { name: 'Node.js', category: 'Backend', percentage: 80, icon: 'Server', order: 5 },
        { name: 'Express.js', category: 'Backend', percentage: 82, icon: 'Cpu', order: 6 },
        { name: 'RESTful APIs', category: 'Backend', percentage: 86, icon: 'Globe', order: 7 },
        { name: 'MongoDB & Mongoose', category: 'Database', percentage: 80, icon: 'Database', order: 8 },
        { name: 'SQL & Relational DBs', category: 'Database', percentage: 72, icon: 'Layers', order: 9 },
        { name: 'Git & GitHub', category: 'Tools & DevOps', percentage: 85, icon: 'GitBranch', order: 10 },
        { name: 'Postman & API Testing', category: 'Tools & DevOps', percentage: 82, icon: 'Terminal', order: 11 },
        { name: 'Python Basics', category: 'Languages', percentage: 70, icon: 'FileCode', order: 12 },
      ];
      await Skill.insertMany(initialSkills);
      console.log('✅ Initial Skills seeded.');
    } else {
      // Normalize existing
      for (const skill of existingSkills) {
        if (!skill.percentage && skill.proficiency) {
          skill.percentage = skill.proficiency;
        }
        // Capitalize category
        if (skill.category) {
          skill.category = skill.category.charAt(0).toUpperCase() + skill.category.slice(1);
        }
        await skill.save();
      }
      console.log(`✅ Normalized ${existingSkills.length} skills.`);
    }

    // 4. Normalize or Seed Projects
    const existingProjects = await Project.find();
    if (existingProjects.length === 0) {
      const initialProjects = [
        {
          title: 'CampusConnect - Student Community Hub',
          description: 'A collaborative full-stack web platform for university students to share academic resources, organize study groups, and track technical events in real-time.',
          image: '',
          technologies: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'Tailwind CSS'],
          category: 'Full Stack',
          githubUrl: 'https://github.com/rohith-b/campus-connect',
          liveUrl: 'https://campus-connect-demo.vercel.app',
          featured: true,
          order: 1,
        },
        {
          title: 'DevPulse - Developer Portfolio & Showcase',
          description: 'Dynamic portfolio and blog engine featuring rich markdown support, project filtering, visitor interactions, and a comprehensive admin management dashboard.',
          image: '',
          technologies: ['React.js', 'Tailwind CSS', 'Framer Motion', 'Express.js', 'JWT'],
          category: 'Full Stack',
          githubUrl: 'https://github.com/rohith-b/devpulse-portfolio',
          liveUrl: 'https://devpulse-demo.vercel.app',
          featured: true,
          order: 2,
        },
        {
          title: 'CloudVault - Secure File & Asset Manager',
          description: 'A cloud-based file storage and document sharing service with encrypted authentication, drag-and-drop file uploads, and granular permission controls.',
          image: '',
          technologies: ['Node.js', 'Express', 'Multer', 'MongoDB', 'REST API'],
          category: 'Backend',
          githubUrl: 'https://github.com/rohith-b/cloudvault-storage',
          liveUrl: '',
          featured: true,
          order: 3,
        },
        {
          title: 'SmartHire - Job Application Tracker',
          description: 'Minimalist dashboard for developers to track job applications, upcoming interview schedules, salary notes, and follow-up reminders with interactive analytics.',
          image: '',
          technologies: ['React.js', 'Tailwind CSS', 'Lucide Icons', 'Chart.js'],
          category: 'Frontend',
          githubUrl: 'https://github.com/rohith-b/smarthire-tracker',
          liveUrl: 'https://smarthire-demo.vercel.app',
          featured: false,
          order: 4,
        },
      ];
      await Project.insertMany(initialProjects);
      console.log('✅ Projects seeded.');
    } else {
      for (const p of existingProjects) {
        if (!p.category) {
          p.category = p.technologies?.includes('Node.js') ? 'Full Stack' : 'Frontend';
          await p.save();
        }
      }
      console.log(`✅ Normalized ${existingProjects.length} projects.`);
    }

    // 5. Seed Education if empty
    const eduCount = await Education.countDocuments();
    if (eduCount === 0) {
      await Education.insertMany([
        {
          degree: 'Bachelor of Technology (B.Tech) in Information Technology',
          institution: 'School of Engineering & Technology',
          university: 'Visvesvaraya Technological University',
          startYear: '2022',
          endYear: '2026',
          description: 'Coursework: Data Structures & Algorithms, Object-Oriented Programming, Database Management Systems, Computer Networks, Web Technologies, Software Engineering Principles. Maintained consistent academic excellence and led university web development club projects.',
          order: 1,
        },
        {
          degree: 'Pre-University / Higher Secondary Education (PCMB)',
          institution: 'National Pre-University College',
          university: 'State Pre-University Board',
          startYear: '2020',
          endYear: '2022',
          description: 'Major coursework in Physics, Chemistry, Mathematics, and Biology with honors in Computer Science foundation and Mathematics.',
          order: 2,
        },
      ]);
      console.log('✅ Education seeded.');
    }

    // 6. Experience
    const expCount = await Experience.countDocuments();
    if (expCount === 0) {
      await Experience.insertMany([
        {
          company: 'Freelance & Open Source Projects',
          position: 'Full-Stack Developer Intern / Freelancer',
          startDate: 'Jun 2024',
          endDate: 'Present',
          description: 'Built responsive client web applications, implemented RESTful API micro-endpoints, integrated MongoDB schemas, and optimized frontend bundle load times by 40%.',
          technologies: ['React.js', 'Node.js', 'Express', 'Tailwind CSS', 'Git'],
          order: 1,
        },
      ]);
      console.log('✅ Experience seeded.');
    }

    // 7. Certifications
    const certCount = await Certification.countDocuments();
    if (certCount === 0) {
      await Certification.insertMany([
        {
          name: 'The Complete 2024 Web Development Bootcamp',
          organization: 'Udemy / Angela Yu',
          issueDate: 'Aug 2024',
          credentialId: 'UC-WD-2024-89712',
          certificateUrl: 'https://udemy.com/certificate/UC-WD-2024-89712',
          image: '',
          order: 1,
        },
        {
          name: 'JavaScript Algorithms and Data Structures',
          organization: 'freeCodeCamp',
          issueDate: 'Jan 2024',
          credentialId: 'FCC-JS-ALGO-2024',
          certificateUrl: 'https://freecodecamp.org/certification/fcc-js-algo-2024',
          image: '',
          order: 2,
        },
        {
          name: 'Node.js & MongoDB Developer Certification',
          organization: 'Coursera / Meta',
          issueDate: 'Nov 2024',
          credentialId: 'META-NODE-MDB-4491',
          certificateUrl: 'https://coursera.org/verify/META-NODE-MDB-4491',
          image: '',
          order: 3,
        },
      ]);
      console.log('✅ Certifications seeded.');
    }

    // 8. Social Links
    const socialCount = await SocialLink.countDocuments();
    if (socialCount === 0) {
      await SocialLink.insertMany([
        { platform: 'GitHub', url: 'https://github.com/rohith-b', icon: 'Github', order: 1 },
        { platform: 'LinkedIn', url: 'https://linkedin.com/in/rohith-b', icon: 'Linkedin', order: 2 },
        { platform: 'Twitter / X', url: 'https://twitter.com/rohith_dev', icon: 'Twitter', order: 3 },
        { platform: 'Email', url: 'mailto:rohithb.dev@gmail.com', icon: 'Mail', order: 4 },
      ]);
      console.log('✅ Social links seeded.');
    }

    console.log('🎉 Database seeding completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error during seeding:', error);
    process.exit(1);
  }
};

seedData();
