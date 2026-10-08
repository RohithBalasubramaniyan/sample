import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Calendar, Building, School } from 'lucide-react';

const EducationSection = ({ education = [] }) => {
  return (
    <section id="education" className="py-24 bg-slate-50 relative border-t border-slate-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
            Academic Background
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mt-3">
            Education & Qualifications
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600">
            Formal foundations in Computer Science, Information Technology, and foundational sciences.
          </p>
        </div>

        {/* Timeline */}
        <div className="max-w-3xl mx-auto relative">
          {/* Vertical line */}
          <div className="absolute left-4 sm:left-8 top-3 bottom-3 w-0.5 bg-blue-200" />

          <div className="space-y-10">
            {education.map((item, index) => (
              <motion.div
                key={item._id || index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="relative pl-12 sm:pl-20"
              >
                {/* Timeline node */}
                <div className="absolute left-2.5 sm:left-6.5 top-1.5 -translate-x-1/2 w-7 h-7 rounded-full bg-white border-2 border-blue-600 flex items-center justify-center text-blue-600 shadow-xs">
                  <GraduationCap className="w-3.5 h-3.5" />
                </div>

                {/* Card */}
                <div className="bg-white rounded-2xl p-6 sm:p-7 border border-slate-200/80 shadow-xs hover:shadow-md transition-shadow">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-3">
                    <div>
                      <h3 className="text-lg font-bold text-slate-900">
                        {item.degree}
                      </h3>
                      {item.department && (
                        <p className="text-xs font-medium text-blue-600 mt-0.5">
                          {item.department}
                        </p>
                      )}
                    </div>
                    <div className="flex flex-wrap items-center gap-2">
                      {(item.cgpa || item.grade) && (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                          CGPA: {item.cgpa || item.grade}
                        </span>
                      )}
                      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold w-fit">
                        <Calendar className="w-3.5 h-3.5" />
                        {item.year || `${item.startYear} — ${item.endYear}`}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-1 text-sm text-slate-600 mb-4">
                    <p className="font-semibold text-slate-800 flex items-center gap-2">
                      <Building className="w-4 h-4 text-slate-400" />
                      {item.institution}
                    </p>
                    {item.university && (
                      <p className="text-xs text-slate-500 flex items-center gap-2">
                        <School className="w-4 h-4 text-slate-400" />
                        Affiliated to {item.university}
                      </p>
                    )}
                  </div>

                  {item.description && (
                    <p className="text-sm text-slate-600 leading-relaxed pt-3 border-t border-slate-100">
                      {item.description}
                    </p>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default EducationSection;
