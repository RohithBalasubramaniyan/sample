/**
 * =========================================================================
 * MANUALLY EDITABLE PORTFOLIO DATA
 * =========================================================================
 * Edit all your portfolio personal details, skills, projects, education,
 * work experience, certifications, and contact links directly from this file.
 * Any updates saved here will immediately reflect across the entire website.
 * =========================================================================
 */

export const portfolioData = {
  // 1. Personal & Hero Section
  personal: {
    name: "Rohith B",
    role: "Aspiring Full-Stack Developer",
    tagline: "Developer creating thoughtful digital experiences.",
    bio: "I'm an IT student at heart and a developer by practice — building full-stack web applications that are fast, intuitive, and built to last. I care deeply about code quality, design precision, and the experience behind every interface.",
    email: "rohithb.dev@gmail.com",
    phone: "+91 98765 43210",
    location: "Bengaluru, Karnataka, India",
    profileImage: "/images/profile.jpg",
    resume: "/resume/resume.pdf",
    statusBadge: "Open to Internships & Opportunities",
    specialization: "Full-Stack & Web Engineering",
  },

  // 2. About Me Section
  about: {
    title: "About Me",
    subtitle: "Passionate About Technology & Problem Solving",
    introBadge: "About Me",
    description:
      "Passionate Information Technology student with hands-on expertise in modern web technologies, responsive interfaces, and RESTful architectures. Driven to create performant, scalable, and intuitive digital applications that solve real user needs.",
    careerObjective:
      "Driven to secure a Software Engineering or Web Development Internship where I can apply modern full-stack competencies, collaborate on scalable software systems, and contribute meaningfully to innovative product development.",
    interests: [
      "Full-Stack Web Development",
      "Cloud Computing & Distributed Systems",
      "Clean Architecture & Clean Code",
      "UI/UX Interaction Design",
      "Open Source Contribution",
      "Algorithms & Data Structures",
    ],
    currentLearning: [
      "Next.js 14 & Server Components",
      "TypeScript & Type-Safe APIs",
      "Docker & CI/CD Pipelines",
      "PostgreSQL & Prisma ORM",
      "System Design Fundamentals",
    ],
  },

  // 3. Technical Skills
  skills: [
    {
      name: "HTML5",
      percentage: 92,
      category: "Frontend",
      icon: "Layout",
    },
    {
      name: "CSS3 & Tailwind",
      percentage: 90,
      category: "Frontend",
      icon: "Palette",
    },
    {
      name: "JavaScript (ES6+)",
      percentage: 88,
      category: "Frontend",
      icon: "Code",
    },
    {
      name: "React.js",
      percentage: 85,
      category: "Frontend",
      icon: "Atom",
    },
    {
      name: "Node.js",
      percentage: 80,
      category: "Backend",
      icon: "Server",
    },
    {
      name: "Express.js",
      percentage: 82,
      category: "Backend",
      icon: "Cpu",
    },
    {
      name: "RESTful APIs",
      percentage: 86,
      category: "Backend",
      icon: "Globe",
    },
    {
      name: "MongoDB & Mongoose",
      percentage: 80,
      category: "Database",
      icon: "Database",
    },
    {
      name: "SQL & Relational DBs",
      percentage: 74,
      category: "Database",
      icon: "Layers",
    },
    {
      name: "Git & GitHub",
      percentage: 85,
      category: "Tools & DevOps",
      icon: "GitBranch",
    },
    {
      name: "Postman & API Testing",
      percentage: 82,
      category: "Tools & DevOps",
      icon: "Terminal",
    },
    {
      name: "Python Basics",
      percentage: 70,
      category: "Languages",
      icon: "FileCode",
    },
  ],

  // 4. Featured Projects
  projects: [
    {
      id: "campus-connect",
      title: "CampusConnect - Student Community Hub",
      description:
        "A collaborative full-stack web platform for university students to share academic resources, organize study groups, and track technical events in real-time.",
      image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80",
      technologies: ["React.js", "Node.js", "Express.js", "MongoDB", "Tailwind CSS"],
      category: "Full Stack",
      githubUrl: "https://github.com/rohith-b/campus-connect",
      liveUrl: "https://campus-connect-demo.vercel.app",
      featured: true,
      createdAt: "2024-05-15",
    },
    {
      id: "devpulse-portfolio",
      title: "DevPulse - Developer Portfolio & Showcase",
      description:
        "Dynamic portfolio and showcase engine featuring rich responsive UI, project filtering, visitor interactions, and seamless user experience.",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80",
      technologies: ["React.js", "Tailwind CSS", "Framer Motion", "Express.js", "JWT"],
      category: "Full Stack",
      githubUrl: "https://github.com/rohith-b/devpulse-portfolio",
      liveUrl: "https://devpulse-demo.vercel.app",
      featured: true,
      createdAt: "2024-08-20",
    },
    {
      id: "cloudvault-storage",
      title: "CloudVault - Secure File & Asset Manager",
      description:
        "A cloud-based file storage and document sharing service with encrypted authentication, drag-and-drop file uploads, and granular permission controls.",
      image: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=800&q=80",
      technologies: ["Node.js", "Express", "Multer", "MongoDB", "REST API"],
      category: "Backend",
      githubUrl: "https://github.com/rohith-b/cloudvault-storage",
      liveUrl: "",
      featured: true,
      createdAt: "2024-03-10",
    },
    {
      id: "smarthire-tracker",
      title: "SmartHire - Job Application Tracker",
      description:
        "Minimalist dashboard for developers to track job applications, upcoming interview schedules, salary notes, and follow-up reminders with interactive analytics.",
      image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80",
      technologies: ["React.js", "Tailwind CSS", "Lucide Icons", "Framer Motion"],
      category: "Frontend",
      githubUrl: "https://github.com/rohith-b/smarthire-tracker",
      liveUrl: "https://smarthire-demo.vercel.app",
      featured: false,
      createdAt: "2024-01-25",
    },
  ],

  // 5. Education Background
  education: [
    {
      id: "btech-it",
      degree: "Bachelor of Technology (B.Tech) in Information Technology",
      institution: "School of Engineering & Technology",
      university: "Visvesvaraya Technological University",
      startYear: "2022",
      endYear: "2026",
      grade: "CGPA: 8.8 / 10",
      description:
        "Coursework: Data Structures & Algorithms, Object-Oriented Programming, Database Management Systems, Computer Networks, Web Technologies, Software Engineering Principles. Maintained consistent academic excellence and led university web development club projects.",
    },
    {
      id: "pre-university",
      degree: "Pre-University / Higher Secondary Education (PCMB)",
      institution: "National Pre-University College",
      university: "State Pre-University Board",
      startYear: "2020",
      endYear: "2022",
      grade: "Distinction: 94%",
      description:
        "Major coursework in Physics, Chemistry, Mathematics, and Biology with honors in Computer Science foundation and Mathematics.",
    },
  ],

  // 6. Experience & Internships
  experience: [
    {
      id: "freelance-fullstack",
      position: "Full-Stack Developer Intern / Freelancer",
      company: "Freelance & Open Source Projects",
      location: "Remote / Bengaluru, India",
      type: "Internship & Freelance",
      startDate: "Jun 2024",
      endDate: "Present",
      isCurrent: true,
      description:
        "Built responsive client web applications, implemented RESTful API micro-endpoints, integrated MongoDB schemas, and optimized frontend bundle load times by 40%.",
      technologies: ["React.js", "Node.js", "Express", "Tailwind CSS", "Git"],
    },
  ],

  // 7. Certifications & Achievements
  certifications: [
    {
      id: "web-dev-bootcamp",
      name: "The Complete 2024 Web Development Bootcamp",
      organization: "Udemy / Angela Yu",
      issueDate: "Aug 2024",
      credentialId: "UC-WD-2024-89712",
      certificateUrl: "https://udemy.com/certificate/UC-WD-2024-89712",
      image: "",
    },
    {
      id: "js-algo-fcc",
      name: "JavaScript Algorithms and Data Structures",
      organization: "freeCodeCamp",
      issueDate: "Jan 2024",
      credentialId: "FCC-JS-ALGO-2024",
      certificateUrl: "https://freecodecamp.org/certification/fcc-js-algo-2024",
      image: "",
    },
    {
      id: "node-mongodb-meta",
      name: "Node.js & MongoDB Developer Certification",
      organization: "Coursera / Meta",
      issueDate: "Nov 2024",
      credentialId: "META-NODE-MDB-4491",
      certificateUrl: "https://coursera.org/verify/META-NODE-MDB-4491",
      image: "",
    },
  ],

  // 8. Resume & Career Highlights
  resumeDetails: {
    headline: "Rohith B's Official Resume",
    highlights: [
      "Bachelor of Technology in Information Technology (VTU)",
      "Proficient in JavaScript (ES6+), React.js, Node.js, Express, and MongoDB",
      "Practical experience designing RESTful APIs and responsive Tailwind interfaces",
      "Version control with Git/GitHub, Clean Architecture, and Agile practices",
    ],
    resumeUrl: "/resume/resume.pdf",
  },

  // 9. Social Links
  socialLinks: [
    {
      platform: "GitHub",
      url: "https://github.com/rohith-b",
      icon: "Github",
    },
    {
      platform: "LinkedIn",
      url: "https://linkedin.com/in/rohith-b",
      icon: "Linkedin",
    },
    {
      platform: "Twitter / X",
      url: "https://twitter.com/rohith_dev",
      icon: "Twitter",
    },
    {
      platform: "Email",
      url: "mailto:rohithb.dev@gmail.com",
      icon: "Mail",
    },
  ],

  // 10. Contact Section Details
  contact: {
    title: "Get In Touch",
    subtitle: "Let's Discuss Projects & Opportunities",
    description:
      "Have a question, internship or job opportunity, or project proposal? Send a message directly and I will respond promptly.",
    email: "rohithb.dev@gmail.com",
    phone: "+91 98765 43210",
    location: "Bengaluru, Karnataka, India",
    responseTimeNotice: "I typically respond within 24 hours.",
  },
};

export default portfolioData;
