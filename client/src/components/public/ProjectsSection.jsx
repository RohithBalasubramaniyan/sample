import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Layers, Sparkles } from 'lucide-react';
import { Github } from '../common/BrandIcons';

const ProjectsSection = ({ projects = [] }) => {
  const [selectedFilter, setSelectedFilter] = useState('All');

  const availableFilters = ['All', 'Full Stack', 'Frontend', 'Backend'];

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      if (selectedFilter === 'All') return true;
      return (
        project.category?.toLowerCase() === selectedFilter.toLowerCase() ||
        project.technologies?.some(t => t.toLowerCase() === selectedFilter.toLowerCase())
      );
    });
  }, [projects, selectedFilter]);

  return (
    <section id="projects" className="py-24 px-6 lg:px-12 relative overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/3 w-96 h-96 bg-purple-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto z-10 relative">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-950/40 border border-purple-500/30 text-purple-300 text-xs uppercase tracking-widest font-mono mb-3">
              <Layers className="w-3 h-3 text-cyan-400" />
              <span>03 // Portfolio</span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-black uppercase tracking-tight text-white">
              Featured <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">Projects</span>
            </h2>
            <p className="mt-2 text-slate-400 text-sm sm:text-base max-w-xl">
              Web applications and software systems built with modern technology stacks.
            </p>
          </div>

          {/* Filter tabs */}
          <div className="flex flex-wrap gap-2">
            {availableFilters.map((filter) => (
              <button
                key={filter}
                onClick={() => setSelectedFilter(filter)}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                  selectedFilter === filter
                    ? 'bg-gradient-to-r from-purple-600 to-cyan-500 text-white shadow-[0_0_15px_rgba(155,93,229,0.5)]'
                    : 'bg-[#12122F]/80 text-slate-400 hover:text-white border border-purple-500/20 hover:border-purple-500/50'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid (Dribbble 2-column or 3-column cards) */}
        {filteredProjects.length === 0 ? (
          <div className="py-24 text-center text-slate-500 text-sm">
            No projects found in this category.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
            {filteredProjects.map((project, idx) => (
              <motion.div
                key={project._id || project.id || project.title}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                className="group relative rounded-2xl bg-[#0E0E28]/80 backdrop-blur-xl border border-purple-500/20 hover:border-cyan-400/60 p-6 flex flex-col justify-between transition-all duration-300 shadow-[0_8px_32px_rgba(0,0,0,0.5)] hover:shadow-[0_0_35px_rgba(6,182,212,0.25)]"
              >
                {/* Neon glow effect on hover */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-600/10 to-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                <div>
                  {/* Project Image Preview / Thumbnail */}
                  <div className="relative aspect-video w-full rounded-xl overflow-hidden mb-6 bg-[#0B0B1E] border border-purple-500/20 group-hover:border-cyan-400/40 transition-colors">
                    {project.image ? (
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        onError={(e) => {
                          e.target.style.display = 'none';
                        }}
                      />
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center p-6 bg-gradient-to-br from-[#170E2B] to-[#0A1629]">
                        <span className="text-3xl font-black bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                          {project.title.slice(0, 2).toUpperCase()}
                        </span>
                        <span className="text-xs font-mono text-cyan-300/80 mt-2">
                          {project.category || 'Web Application'}
                        </span>
                      </div>
                    )}

                    {project.featured && (
                      <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-[#0B0B1E]/90 border border-purple-400/40 text-[10px] font-bold uppercase tracking-wider text-purple-300 shadow-md">
                        ★ Featured
                      </div>
                    )}
                  </div>

                  {/* Title & Category */}
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <h3 className="text-xl sm:text-2xl font-bold text-white group-hover:text-cyan-300 transition-colors">
                      {project.title}
                    </h3>
                    <span className="text-xs font-mono text-purple-300 uppercase px-2.5 py-1 rounded-full bg-purple-950/60 border border-purple-500/30 shrink-0">
                      {project.category || 'App'}
                    </span>
                  </div>

                  {/* Description */}
                  <p className="text-slate-300 text-sm leading-relaxed mb-6">
                    {project.description}
                  </p>

                  {/* Tech Stack Pills */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.technologies?.map((tech, tIdx) => (
                      <span
                        key={tIdx}
                        className="px-2.5 py-1 rounded-md text-[11px] font-mono font-medium text-cyan-200 bg-cyan-950/30 border border-cyan-500/25"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Bottom Actions */}
                <div className="pt-4 border-t border-purple-500/20 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-300 hover:text-white transition-colors"
                      >
                        <Github className="w-4 h-4 text-purple-400" />
                        <span>Source</span>
                      </a>
                    )}
                  </div>

                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider text-white bg-gradient-to-r from-purple-600 to-cyan-500 hover:from-purple-500 hover:to-cyan-400 shadow-[0_0_15px_rgba(155,93,229,0.4)] transition-all cursor-pointer"
                    >
                      <span>Live Preview</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
};

export default ProjectsSection;
