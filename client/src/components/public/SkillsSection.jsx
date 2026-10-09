import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Cpu, Sparkles } from 'lucide-react';
import DynamicIcon from '../common/DynamicIcon';

const ringGradients = [
  'from-purple-500 via-pink-500 to-cyan-400',
  'from-cyan-400 via-teal-400 to-emerald-400',
  'from-pink-500 via-purple-500 to-indigo-400',
  'from-violet-500 via-cyan-400 to-blue-500',
  'from-amber-400 via-pink-500 to-purple-500',
  'from-cyan-400 via-blue-500 to-purple-600',
];

const SkillsSection = ({ skills = [] }) => {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', ...new Set(skills.map(s => s.category).filter(Boolean))];

  const filteredSkills =
    selectedCategory === 'All' ? skills : skills.filter(s => s.category === selectedCategory);

  return (
    <section id="skills" className="py-24 px-6 lg:px-12 relative overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-1/3 -right-40 w-96 h-96 bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto z-10 relative">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/40 border border-cyan-500/30 text-cyan-300 text-xs uppercase tracking-widest font-mono mb-3">
              <Cpu className="w-3 h-3 text-cyan-400" />
              <span>02 // Tech Stack</span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-black uppercase tracking-tight text-white">
              Technical <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">Skills</span>
            </h2>
            <p className="mt-2 text-slate-400 text-sm sm:text-base max-w-xl">
              Languages, libraries, frameworks, and developer tools I build with.
            </p>
          </div>

          {/* Category filter pills */}
          {categories.length > 1 && (
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                    selectedCategory === cat
                      ? 'bg-gradient-to-r from-purple-600 to-cyan-500 text-white shadow-[0_0_15px_rgba(155,93,229,0.5)]'
                      : 'bg-[#12122F]/80 text-slate-400 hover:text-white border border-purple-500/20 hover:border-purple-500/50'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Circular Neon Badges Grid (Dribbble Signature Layout) */}
        {filteredSkills.length === 0 ? (
          <div className="text-center py-16 text-slate-500 text-sm">
            No skills found in this category.
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 sm:gap-8">
            {filteredSkills.map((skill, index) => {
              const grad = ringGradients[index % ringGradients.length];
              const percentage = skill.percentage ?? skill.proficiency ?? 85;

              return (
                <motion.div
                  key={skill._id || skill.name}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.04 }}
                  className="group flex flex-col items-center text-center"
                >
                  {/* Glowing Circular Icon Pod */}
                  <div className="relative mb-3.5">
                    {/* Pulsing neon outer glow */}
                    <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-purple-600 to-cyan-400 blur-md opacity-20 group-hover:opacity-75 transition-opacity duration-300" />
                    
                    {/* Gradient Ring Frame */}
                    <div className={`relative w-20 h-20 sm:w-24 sm:h-24 rounded-full p-[2.5px] bg-gradient-to-tr ${grad} shadow-[0_0_20px_rgba(0,0,0,0.6)] group-hover:scale-105 transition-transform duration-300`}>
                      {/* Dark Inner Core */}
                      <div className="w-full h-full rounded-full bg-[#0D0D24] flex flex-col items-center justify-center p-2 group-hover:bg-[#121232] transition-colors">
                        <DynamicIcon
                          name={skill.icon || 'Code'}
                          className="w-7 h-7 sm:w-8 sm:h-8 text-cyan-300 group-hover:text-white transition-colors drop-shadow-[0_0_8px_rgba(6,182,212,0.6)]"
                        />
                        <span className="text-[10px] font-mono text-purple-300 font-bold mt-1">
                          {percentage}%
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Skill Label */}
                  <span className="text-sm font-bold text-white group-hover:text-cyan-400 transition-colors tracking-wide">
                    {skill.name}
                  </span>
                  <span className="text-[11px] font-mono text-slate-500 uppercase mt-0.5">
                    {skill.category || 'Tech'}
                  </span>
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
