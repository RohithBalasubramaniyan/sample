import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Calendar, Building, Sparkles } from 'lucide-react';

const ExperienceSection = ({ experience = [] }) => {
  const hasExperience = experience && experience.length > 0;

  return (
    <section id="experience" className="py-24 px-6 lg:px-12 relative overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-1/2 -right-48 w-96 h-96 bg-purple-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-5xl mx-auto z-10 relative">
        
        {/* Header */}
        <div className="mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/40 border border-cyan-500/30 text-cyan-300 text-xs uppercase tracking-widest font-mono mb-3">
            <Briefcase className="w-3 h-3 text-cyan-400" />
            <span>04 // Journey</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-black uppercase tracking-tight text-white">
            Work <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">Experience</span>
          </h2>
          <p className="mt-2 text-slate-400 text-sm sm:text-base max-w-xl">
            Professional trajectory, engineering internships, and key contributions.
          </p>
        </div>

        {/* Timeline Container (Dribbble Signature Timeline Layout) */}
        {!hasExperience ? (
          <div className="p-8 rounded-2xl bg-[#0E0E28]/70 border border-purple-500/20 text-center max-w-xl mx-auto">
            <p className="text-white font-bold text-lg mb-1">Open for Opportunities</p>
            <p className="text-slate-400 text-sm">
              Actively seeking software developer internship or junior full-stack engineering roles.
            </p>
          </div>
        ) : (
          <div className="relative pl-6 sm:pl-10">
            {/* Glowing vertical timeline beam */}
            <div className="absolute left-2.5 sm:left-4 top-4 bottom-4 w-[2px] bg-gradient-to-b from-purple-500 via-cyan-400 to-purple-600/20 shadow-[0_0_10px_rgba(6,182,212,0.5)]" />

            <div className="space-y-10">
              {experience.map((item, idx) => (
                <motion.div
                  key={item._id || idx}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="relative group"
                >
                  {/* Glowing node dot */}
                  <div className="absolute -left-[27px] sm:-left-[35px] top-4 w-4 h-4 rounded-full bg-[#0B0B1E] border-2 border-cyan-400 shadow-[0_0_12px_#22d3ee] group-hover:scale-125 transition-transform" />

                  {/* Glassmorphic card */}
                  <div className="rounded-2xl bg-[#0E0E28]/80 backdrop-blur-xl border border-purple-500/20 group-hover:border-cyan-400/50 p-6 sm:p-8 transition-all duration-300 shadow-[0_8px_30px_rgba(0,0,0,0.4)] group-hover:shadow-[0_0_30px_rgba(6,182,212,0.2)]">
                    
                    {/* Date badge & Role */}
                    <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
                      <span className="px-3 py-1 rounded-full text-xs font-mono font-bold text-cyan-300 bg-cyan-950/40 border border-cyan-500/30">
                        {item.startDate || 'Present'} — {item.endDate || (item.current ? 'Present' : 'Ended')}
                      </span>
                      {item.location && (
                        <span className="text-xs font-mono text-slate-400">
                          {item.location}
                        </span>
                      )}
                    </div>

                    <h3 className="text-xl sm:text-2xl font-bold text-white group-hover:text-cyan-300 transition-colors">
                      {item.role || item.position}
                    </h3>
                    
                    <div className="flex items-center gap-2 text-sm text-purple-300 font-medium mt-1 mb-4">
                      <Building className="w-4 h-4 text-pink-400" />
                      <span>{item.company}</span>
                    </div>

                    {item.description && (
                      <p className="text-slate-300 text-sm leading-relaxed mb-4">
                        {item.description}
                      </p>
                    )}

                    {item.responsibilities && item.responsibilities.length > 0 && (
                      <ul className="space-y-2 mt-3 pt-3 border-t border-purple-500/20">
                        {item.responsibilities.map((resp, rIdx) => (
                          <li key={rIdx} className="text-xs sm:text-sm text-slate-300 flex items-start gap-2.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-2 shrink-0 shadow-[0_0_6px_#22d3ee]" />
                            <span>{resp}</span>
                          </li>
                        ))}
                      </ul>
                    )}

                    {item.technologies && item.technologies.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mt-4 pt-3 border-t border-purple-500/20">
                        {item.technologies.map((tech, tIdx) => (
                          <span
                            key={tIdx}
                            className="px-2 py-0.5 rounded text-[11px] font-mono text-slate-300 bg-purple-950/30 border border-purple-500/20"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

      </div>
    </section>
  );
};

export default ExperienceSection;
