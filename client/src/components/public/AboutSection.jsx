import React from 'react';
import { motion } from 'framer-motion';
import { Target, BookOpen, Compass, Code2, Sparkles, CheckCircle2 } from 'lucide-react';

const AboutSection = ({ about, personal, profile }) => {
  const aboutData = about || {};
  const personalData = personal || profile || {};

  const title = aboutData.aboutTitle || aboutData.title || personalData.aboutTitle || 'About Me';
  const subtitle = aboutData.aboutSubtitle || aboutData.subtitle || personalData.aboutSubtitle || 'Passionate About Technology & Problem Solving';
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
    (aboutData.interests && aboutData.interests.length > 0 && aboutData.interests) ||
    personalData.interests || [
      'Full-Stack Development',
      'Cloud Architectures',
      'UI/UX Design Systems',
      'Open Source',
      'Competitive Problem Solving',
    ];

  const currentLearning =
    (aboutData.currentLearning && aboutData.currentLearning.length > 0 && aboutData.currentLearning) ||
    personalData.currentLearning || [
      'TypeScript & Modern ES',
      'Next.js App Router',
      'Docker & CI/CD',
      'Microservices',
      'PostgreSQL',
    ];

  return (
    <section id="about" className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
            {title}
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mt-3">
            {subtitle}
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
            Get to know my academic background, technical trajectory, core interests, and what drives my work in software development.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Biography & Career Objective */}
          <div className="lg:col-span-7 space-y-8">
            <div className="bg-slate-50/70 rounded-2xl p-6 sm:p-8 border border-slate-200/80 shadow-xs">
              <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2.5 mb-4">
                <Code2 className="w-5 h-5 text-blue-600" />
                Biography
              </h3>
              <p className="text-slate-700 leading-relaxed text-base sm:text-lg">
                {description}
              </p>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-indigo-50/50 rounded-2xl p-6 sm:p-8 border border-blue-100 shadow-xs">
              <h3 className="text-xl font-bold text-blue-900 flex items-center gap-2.5 mb-3">
                <Target className="w-5 h-5 text-blue-600" />
                Career Objective
              </h3>
              <p className="text-blue-950/80 leading-relaxed text-base">
                {careerObjective}
              </p>
            </div>
          </div>

          {/* Right Column: Interests & Current Learning Areas */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Current Learning */}
            <div className="bg-white rounded-2xl p-6 sm:p-7 border border-slate-200 shadow-sm">
              <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2 mb-4">
                <BookOpen className="w-5 h-5 text-emerald-600" />
                Current Learning Areas
              </h3>
              <p className="text-xs text-slate-500 mb-4">
                Technologies and concepts I am actively expanding and building with:
              </p>
              <div className="space-y-2.5">
                {currentLearning.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-2.5 p-2.5 rounded-xl bg-slate-50 border border-slate-100 text-sm text-slate-700 font-medium hover:bg-slate-100/80 transition-colors"
                  >
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Technical Interests */}
            <div className="bg-white rounded-2xl p-6 sm:p-7 border border-slate-200 shadow-sm">
              <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2 mb-4">
                <Compass className="w-5 h-5 text-blue-600" />
                Interests & Passions
              </h3>
              <div className="flex flex-wrap gap-2">
                {interests.map((interest, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-50 border border-blue-100 text-blue-700 text-xs font-semibold"
                  >
                    <Sparkles className="w-3 h-3 text-blue-500" />
                    {interest}
                  </span>
                ))}
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

export default AboutSection;
