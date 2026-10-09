import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Calendar, Award } from 'lucide-react';

const EducationSection = ({ education = [] }) => {
  return (
    <section id="education" className="py-24 px-6 lg:px-12 relative overflow-hidden">
      <div className="max-w-5xl mx-auto z-10 relative">
        
        {/* Header */}
        <div className="mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-950/40 border border-purple-500/30 text-purple-300 text-xs uppercase tracking-widest font-mono mb-3">
            <GraduationCap className="w-3 h-3 text-cyan-400" />
            <span>05 // Academics</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-black uppercase tracking-tight text-white">
            Education & <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Degrees</span>
          </h2>
          <p className="mt-2 text-slate-400 text-sm sm:text-base max-w-xl">
            Academic credentials and engineering foundations.
          </p>
        </div>

        {/* Education Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {education.map((item, index) => (
            <motion.div
              key={item._id || index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="p-6 sm:p-8 rounded-2xl bg-[#0E0E28]/70 backdrop-blur-xl border border-purple-500/20 hover:border-purple-500/50 transition-all duration-300 shadow-[0_8px_30px_rgba(0,0,0,0.4)] group"
            >
              <div className="flex items-center justify-between gap-3 mb-4">
                <span className="px-3 py-1 rounded-full text-xs font-mono font-bold text-purple-300 bg-purple-950/40 border border-purple-500/30">
                  {item.year || `${item.startYear || ''} - ${item.endYear || ''}`}
                </span>
                {item.grade && (
                  <span className="text-xs font-mono text-cyan-400 font-semibold">
                    {item.grade}
                  </span>
                )}
              </div>

              <h3 className="text-xl font-bold text-white group-hover:text-cyan-300 transition-colors mb-1">
                {item.degree}
              </h3>

              <p className="text-sm text-pink-400 font-medium mb-3">
                {item.fieldOfStudy || item.field}
              </p>

              <p className="text-xs sm:text-sm text-slate-300 mb-3">
                {item.institution || item.college || item.school}
              </p>

              {item.description && (
                <p className="text-xs text-slate-400 leading-relaxed border-t border-purple-500/20 pt-3">
                  {item.description}
                </p>
              )}
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default EducationSection;
