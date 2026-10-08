import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Search, Star, Layers, Calendar } from 'lucide-react';
import { Github } from '../common/BrandIcons';


const ProjectsSection = ({ projects = [] }) => {
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Built-in categories + dynamic tech stack pills
  const availableFilters = ['All', 'Full Stack', 'Frontend', 'Backend', 'React.js', 'Node.js', 'MongoDB'];

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      // Category or tech filter match
      const matchesFilter =
        selectedFilter === 'All' ||
        project.category?.toLowerCase() === selectedFilter.toLowerCase() ||
        project.technologies?.some(
          (t) => t.toLowerCase() === selectedFilter.toLowerCase()
        );

      // Search query match
      const query = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !query ||
        project.title.toLowerCase().includes(query) ||
        project.description.toLowerCase().includes(query) ||
        project.technologies?.some((t) => t.toLowerCase().includes(query));

      return matchesFilter && matchesSearch;
    });
  }, [projects, selectedFilter, searchQuery]);

  return (
    <section id="projects" className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
            Portfolio Showcase
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mt-3">
            Featured Works & Applications
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600">
            Explore web applications, full-stack systems, and engineering projects I've built with modern design and resilient backends.
          </p>
        </div>

        {/* Filter & Search Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10 pb-6 border-b border-slate-100">
          {/* Category Filter Buttons */}
          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
            {availableFilters.map((filter) => (
              <button
                key={filter}
                onClick={() => setSelectedFilter(filter)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all duration-150 ${
                  selectedFilter === filter
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200/80 hover:text-slate-900'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by title, tech..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-xl text-xs sm:text-sm bg-slate-50 border border-slate-200 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
            />
          </div>
        </div>

        {/* Projects Grid */}
        {filteredProjects.length === 0 ? (
          <div className="text-center py-16 bg-slate-50 rounded-2xl border border-slate-200 max-w-lg mx-auto">
            <p className="text-slate-600 font-medium text-base mb-2">No projects matched your criteria.</p>
            <p className="text-xs text-slate-400">Try changing the filter or clearing the search box.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project, idx) => (
              <motion.article
                key={project._id || project.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: Math.min(idx * 0.08, 0.3) }}
                className="group bg-white rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-xl hover:border-slate-300 transition-all duration-300 flex flex-col overflow-hidden"
              >
                {/* Image / Graphic Header */}
                <div className="relative w-full aspect-video bg-gradient-to-br from-slate-100 via-blue-50/50 to-slate-200 overflow-hidden border-b border-slate-100">
                  {project.image ? (
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-gradient-to-tr from-slate-900 via-slate-800 to-blue-950 text-white">
                      <Layers className="w-10 h-10 text-blue-400 mb-2 opacity-80" />
                      <h4 className="font-bold text-base text-white tracking-wide max-w-[220px]">
                        {project.title}
                      </h4>
                      <span className="text-[11px] text-blue-300/80 mt-1">
                        {project.category || 'Web Application'}
                      </span>
                    </div>
                  )}

                  {/* Featured Badge */}
                  {project.featured && (
                    <div className="absolute top-3 left-3 bg-blue-600 text-white text-[11px] font-bold px-2.5 py-1 rounded-lg flex items-center gap-1 shadow-md">
                      <Star className="w-3 h-3 fill-current" />
                      Featured
                    </div>
                  )}

                  {/* Category Pill */}
                  <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-md text-slate-700 text-[10px] font-semibold px-2.5 py-1 rounded-lg shadow-xs">
                    {project.category || 'Full Stack'}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors mb-2.5">
                      {project.title}
                    </h3>
                    <p className="text-slate-600 text-sm leading-relaxed mb-4 line-clamp-3">
                      {project.description}
                    </p>
                  </div>

                  <div>
                    {/* Tech stack pills */}
                    <div className="flex flex-wrap gap-1.5 mb-6">
                      {project.technologies?.map((tech, tIdx) => (
                        <span
                          key={tIdx}
                          className="px-2.5 py-1 rounded-md bg-slate-100 text-slate-700 text-xs font-medium"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* Action Links */}
                    <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        {project.githubUrl && (
                          <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 transition-colors"
                          >
                            <Github className="w-4 h-4" />
                            Code
                          </a>
                        )}
                        {project.liveUrl && project.liveUrl !== '#' && (
                          <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 hover:text-blue-700 transition-colors"
                          >
                            <ExternalLink className="w-4 h-4" />
                            Live Demo
                          </a>
                        )}
                      </div>

                      {project.createdAt && (
                        <span className="text-[11px] text-slate-400 flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {new Date(project.createdAt).toLocaleDateString(undefined, {
                            month: 'short',
                            year: 'numeric',
                          })}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        )}

      </div>
    </section>
  );
};

export default ProjectsSection;
