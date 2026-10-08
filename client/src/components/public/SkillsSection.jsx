import React, { useState } from 'react';
import { motion } from 'framer-motion';
import DynamicIcon from '../common/DynamicIcon';

const SkillsSection = ({ skills = [] }) => {
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Extract unique categories
  const categories = ['All', ...new Set(skills.map((s) => s.category).filter(Boolean))];

  const filteredSkills = selectedCategory === 'All'
    ? skills
    : skills.filter((s) => s.category === selectedCategory);

  return (
    <section id="skills" className="py-24 bg-slate-50 relative border-t border-slate-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
            Expertise & Stack
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mt-3">
            Technical Skills & Proficiencies
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600">
            A comprehensive overview of programming languages, libraries, frameworks, databases, and developer tooling I use.
          </p>
        </div>

        {/* Category Filter Pills */}
        {categories.length > 2 && (
          <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-150 ${
                  selectedCategory === category
                    ? 'bg-blue-600 text-white shadow-sm shadow-blue-500/20'
                    : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        )}

        {/* Skills Grid */}
        {filteredSkills.length === 0 ? (
          <div className="text-center py-12 text-slate-500 bg-white rounded-2xl border border-slate-200 max-w-md mx-auto">
            No skills found in this category.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {filteredSkills.map((skill, index) => {
              const percentage = skill.percentage ?? skill.proficiency ?? 75;

              return (
                <motion.div
                  key={skill._id || skill.name}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: Math.min(index * 0.05, 0.4) }}
                  className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-xs hover:shadow-md hover:border-blue-300 transition-all duration-200 group"
                >
                  <div className="flex items-center justify-between mb-3.5">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white flex items-center justify-center transition-colors">
                        <DynamicIcon name={skill.icon || 'Code'} className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-900 text-sm group-hover:text-blue-600 transition-colors">
                          {skill.name}
                        </h4>
                        <span className="text-[11px] font-medium text-slate-400">
                          {skill.category}
                        </span>
                      </div>
                    </div>
                    <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md">
                      {percentage}%
                    </span>
                  </div>

                  {/* Progress bar */}
                  <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${percentage}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, delay: 0.2 }}
                      className="bg-blue-600 h-full rounded-full group-hover:bg-blue-500 transition-colors"
                    />
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}

      </div>
    </section>
  );
};

export default SkillsSection;
