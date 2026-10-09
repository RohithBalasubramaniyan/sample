import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Terminal, Rocket, Target, BookOpen } from 'lucide-react';

const AboutSection = ({ about, personal, profile }) => {
  const aboutData = about || {};
  const personalData = personal || profile || {};

  const subtitle =
    aboutData.aboutSubtitle ||
    aboutData.subtitle ||
    personalData.aboutSubtitle ||
    'Full-Stack Developer passionate about scalable web architecture & intuitive user experiences.';

  const description =
    aboutData.aboutDescription ||
    personalData.aboutDescription ||
    aboutData.description ||
    personalData.bio ||
    'Passionate Information Technology student with hands-on expertise in modern web technologies, responsive interfaces, and RESTful architectures.';

  const careerObjective =
    aboutData.careerObjective ||
    personalData.careerObjective ||
    'Driven to secure a Software Engineering or Web Development Internship where I can apply modern full-stack competencies and contribute meaningfully.';

  const interests =
    (aboutData.interests?.length > 0 && aboutData.interests) ||
    personalData.interests || [
      'Full-Stack Web Development',
      'Cloud Architecture',
      'UI/UX Design Systems',
      'API Engineering',
      'Performance Optimization',
      'Open Source',
    ];

  const currentLearning =
    (aboutData.currentLearning?.length > 0 && aboutData.currentLearning) ||
    personalData.currentLearning || [
      'Next.js 14 & Server Actions',
      'TypeScript & Clean Architecture',
      'Docker & Containerization',
      'PostgreSQL & Database Design',
      'Scalable System Architecture',
    ];

  return (
    <section id="about" className="py-24 px-6 lg:px-12 relative overflow-hidden">
      {/* Background radial accent */}
      <div className="absolute top-1/2 -left-48 w-96 h-96 bg-purple-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto z-10 relative">
        
        {/* Section title */}
        <div className="mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-950/40 border border-purple-500/30 text-purple-300 text-xs uppercase tracking-widest font-mono mb-3">
            <Sparkles className="w-3 h-3 text-cyan-400" />
            <span>01 // Discover</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-black uppercase tracking-tight text-white">
            About <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">Me</span>
          </h2>
          <p className="mt-3 text-slate-400 text-base max-w-2xl">
            {subtitle}
          </p>
        </div>

        {/* Content grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Main bio card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 bg-[#0E0E28]/70 backdrop-blur-xl border border-purple-500/20 rounded-2xl p-8 shadow-[0_8px_32px_rgba(0,0,0,0.5)] relative overflow-hidden group hover:border-purple-500/40 transition-all duration-300"
          >
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />
            
            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <Terminal className="w-5 h-5 text-cyan-400" />
              <span>Background & Mission</span>
            </h3>

            <p className="text-slate-300 leading-relaxed text-sm sm:text-base mb-6">
              {description}
            </p>

            <div className="pt-4 border-t border-purple-500/20">
              <h4 className="text-xs uppercase tracking-wider font-mono text-purple-300 mb-2 flex items-center gap-1.5">
                <Target className="w-4 h-4 text-pink-400" />
                <span>Career Objective</span>
              </h4>
              <p className="text-slate-300 text-sm leading-relaxed">
                {careerObjective}
              </p>
            </div>

            {/* Quick stats badges */}
            <div className="grid grid-cols-3 gap-3 pt-6 mt-6 border-t border-purple-500/20 text-center">
              <div className="p-3 rounded-xl bg-[#121232]/80 border border-purple-500/20">
                <p className="text-2xl font-black bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">3+</p>
                <p className="text-[11px] uppercase font-mono text-slate-400 mt-1">Projects</p>
              </div>
              <div className="p-3 rounded-xl bg-[#121232]/80 border border-purple-500/20">
                <p className="text-2xl font-black bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">IT</p>
                <p className="text-[11px] uppercase font-mono text-slate-400 mt-1">B.Tech Degree</p>
              </div>
              <div className="p-3 rounded-xl bg-[#121232]/80 border border-purple-500/20">
                <p className="text-2xl font-black bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent">100%</p>
                <p className="text-[11px] uppercase font-mono text-slate-400 mt-1">Dedication</p>
              </div>
            </div>
          </motion.div>

          {/* Right column: Highlights and Focus areas */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Interests & Domains */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-[#0E0E28]/70 backdrop-blur-xl border border-purple-500/20 rounded-2xl p-6 shadow-[0_8px_32px_rgba(0,0,0,0.5)] hover:border-cyan-500/40 transition-all duration-300"
            >
              <h3 className="text-sm uppercase tracking-wider font-mono text-cyan-300 mb-4 flex items-center gap-2">
                <Rocket className="w-4 h-4 text-cyan-400" />
                <span>Core Interests</span>
              </h3>
              <div className="flex flex-wrap gap-2">
                {interests.map((item, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1.5 rounded-full text-xs font-medium text-purple-200 bg-purple-950/40 border border-purple-500/30 hover:border-cyan-400 hover:text-white transition-all cursor-default"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* Current learning */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-[#0E0E28]/70 backdrop-blur-xl border border-purple-500/20 rounded-2xl p-6 shadow-[0_8px_32px_rgba(0,0,0,0.5)] hover:border-purple-500/40 transition-all duration-300"
            >
              <h3 className="text-sm uppercase tracking-wider font-mono text-pink-300 mb-4 flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-pink-400" />
                <span>Currently Leveling Up</span>
              </h3>
              <ul className="space-y-2.5">
                {currentLearning.map((item, idx) => (
                  <li key={idx} className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-purple-400 to-cyan-400" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

          </div>

        </div>

      </div>
    </section>
  );
};

export default AboutSection;
