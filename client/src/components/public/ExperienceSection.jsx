import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Calendar, Sparkles, Building, ChevronRight, ExternalLink } from 'lucide-react';

const ExperienceSection = ({ experience = [] }) => {
  const hasExperience = experience && experience.length > 0;

  return (
    <section id="experience" className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
            Work History
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mt-3">
            Practical Experience & Internships
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600">
            Real-world projects, freelance contributions, and technical engineering work.
          </p>
        </div>

        {/* If no experience, display user's required message */}
        {!hasExperience ? (
          <div className="max-w-xl mx-auto text-center bg-blue-50/70 border border-blue-200/80 rounded-3xl p-10 shadow-xs">
            <div className="w-14 h-14 rounded-2xl bg-blue-600 text-white mx-auto flex items-center justify-center mb-4 shadow-md">
              <Sparkles className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">
              Currently seeking internship opportunities.
            </h3>
            <p className="text-slate-600 text-sm max-w-md mx-auto mb-6">
              I am actively looking for software engineering, full-stack, or frontend internship roles where I can make an immediate impact.
            </p>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm transition-colors"
            >
              Get in Touch
              <ChevronRight className="w-4 h-4" />
            </a>
          </div>
        ) : (
          <div className="max-w-3xl mx-auto space-y-8">
            {experience.map((exp, index) => (
              <motion.div
                key={exp._id || index}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="bg-slate-50/60 rounded-2xl p-6 sm:p-8 border border-slate-200/90 shadow-xs hover:border-blue-200 hover:bg-white transition-all duration-200"
              >
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-3">
                  <div>
                    <h3 className="text-lg font-bold text-slate-900">
                      {exp.position}
                    </h3>
                    <p className="text-blue-600 font-semibold text-sm flex items-center gap-1.5 mt-0.5">
                      <Building className="w-4 h-4" />
                      {exp.company}
                    </p>
                  </div>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-slate-200 text-slate-600 text-xs font-semibold w-fit">
                    <Calendar className="w-3.5 h-3.5 text-slate-400" />
                    {exp.startDate} — {exp.endDate || 'Present'}
                  </div>
                </div>

                {exp.description && (
                  <p className="text-sm text-slate-700 leading-relaxed mb-4">
                    {exp.description}
                  </p>
                )}

                {exp.technologies && exp.technologies.length > 0 && (
                  <div className="flex flex-wrap items-center gap-1.5 pt-3 border-t border-slate-200/70">
                    <span className="text-xs font-semibold text-slate-400 mr-1">Skills used:</span>
                    {exp.technologies.map((tech, tIdx) => (
                      <span
                        key={tIdx}
                        className="px-2.5 py-0.5 rounded-md bg-white border border-slate-200 text-slate-700 text-xs font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                )}

                {exp.certificateUrl && (
                  <div className="pt-3 flex justify-end">
                    <a
                      href={exp.certificateUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 hover:text-blue-700 hover:underline"
                    >
                      View Certificate / Offer Letter
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
};

export default ExperienceSection;
