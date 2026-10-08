import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Download, ArrowRight, MapPin, Briefcase } from 'lucide-react';
import { Github, Linkedin } from '../common/BrandIcons';
import DynamicIcon from '../common/DynamicIcon';

const HeroSection = ({ personal, profile, socialLinks = [] }) => {
  const data = personal || profile || {};
  const greeting = data.greeting || 'Hello, I am';
  const name = data.name || 'Rohith B';
  const role = data.role || data.title || 'IT Student | Web Developer';
  const tagline = data.tagline || data.bio || 'Building modern, scalable, and responsive web applications';
  const bio = data.bio || tagline;
  const statusBadge = data.statusBadge || 'Available for Internships & Opportunities';
  const location = data.location || 'India';
  const resumeUrl = data.resume || data.resumeUrl;
  const profileImage = data.profileImage || '/images/profile.jpg';
  const specialization = data.workType || data.specialization || 'Full-Stack & Web Engineering';
  const viewProjectsText = data.viewProjectsText || 'View Projects';
  const viewResumeText = data.viewResumeText || 'Download Resume';

  const [imgError, setImgError] = useState(false);

  return (
    <section id="home" className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden bg-gradient-to-b from-blue-50/50 via-white to-slate-50">
      {/* Subtle decorative grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-40 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Text Column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 space-y-6 text-center lg:text-left"
          >
            {/* Status badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-100/70 border border-blue-200 text-blue-700 text-xs font-semibold tracking-wide">
              <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
              {statusBadge}
            </div>

            {/* Main Heading */}
            <div className="space-y-2">
              <p className="text-sm uppercase tracking-widest font-semibold text-slate-500">
                {greeting}
              </p>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-tight">
                {name}
              </h1>
              <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-blue-600">
                {role}
              </h2>
            </div>

            {/* Tagline / Bio */}
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto lg:mx-0">
              {bio}
            </p>

            {/* Info pills */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 text-xs sm:text-sm text-slate-500">
              {location && (
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-slate-400" />
                  {location}
                </span>
              )}
              {specialization && (
                <span className="flex items-center gap-1.5">
                  <Briefcase className="w-4 h-4 text-slate-400" />
                  {specialization}
                </span>
              )}
            </div>

            {/* Call to action buttons */}
            <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-3.5">
              <a
                href="#projects"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm shadow-md hover:shadow-lg transition-all duration-200 hover:-translate-y-0.5"
              >
                {viewProjectsText}
                <ArrowRight className="w-4 h-4" />
              </a>

              {resumeUrl ? (
                <a
                  href={resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white hover:bg-slate-50 border border-slate-300 text-slate-800 font-semibold text-sm shadow-sm hover:shadow transition-all duration-200 hover:-translate-y-0.5"
                >
                  <Download className="w-4 h-4 text-blue-600" />
                  {viewResumeText}
                </a>
              ) : (
                <a
                  href="#resume"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white hover:bg-slate-50 border border-slate-300 text-slate-800 font-semibold text-sm shadow-sm hover:shadow transition-all duration-200"
                >
                  <Download className="w-4 h-4 text-blue-600" />
                  {viewResumeText}
                </a>
              )}

              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-sm transition-colors"
              >
                Contact Me
              </a>
            </div>

            {/* Social media links */}
            <div className="pt-4 flex items-center justify-center lg:justify-start gap-3">
              <span className="text-xs font-medium text-slate-400 mr-1">Connect:</span>
              {socialLinks && socialLinks.length > 0 ? (
                socialLinks.map((link, idx) => (
                  <a
                    key={link.id || link.platform || idx}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-xl bg-white border border-slate-200 shadow-xs hover:border-blue-500 hover:text-blue-600 text-slate-600 flex items-center justify-center transition-all duration-200 hover:-translate-y-0.5"
                    title={link.platform}
                  >
                    <DynamicIcon name={link.icon || link.platform} className="w-4 h-4" />
                  </a>
                ))
              ) : (
                <>
                  <a
                    href="https://github.com/rohith-b"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-xl bg-white border border-slate-200 shadow-xs hover:border-blue-500 hover:text-blue-600 text-slate-600 flex items-center justify-center transition-colors"
                  >
                    <Github className="w-4 h-4" />
                  </a>
                  <a
                    href="https://linkedin.com/in/rohith-b"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-xl bg-white border border-slate-200 shadow-xs hover:border-blue-500 hover:text-blue-600 text-slate-600 flex items-center justify-center transition-colors"
                  >
                    <Linkedin className="w-4 h-4" />
                  </a>
                </>
              )}
            </div>
          </motion.div>

          {/* Right Profile Column */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-5 flex justify-center"
          >
            <div className="relative">
              {/* Outer decorative halo */}
              <div className="absolute -inset-4 rounded-3xl bg-gradient-to-tr from-blue-600/20 via-sky-400/20 to-indigo-600/20 blur-xl opacity-70"></div>

              {/* Main Profile Card */}
              <div className="relative w-72 sm:w-80 md:w-96 rounded-3xl bg-white p-4 shadow-xl border border-slate-200/80">
                <div className="relative w-full aspect-[4/5] rounded-2xl overflow-hidden bg-gradient-to-br from-slate-100 to-blue-50 flex items-center justify-center border border-slate-100">
                  {profileImage && !imgError ? (
                    <img
                      src={profileImage}
                      alt={name}
                      onError={() => setImgError(true)}
                      className="w-full h-full object-cover object-top transition-transform duration-500 hover:scale-105"
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-gradient-to-br from-blue-600 via-blue-700 to-slate-900 text-white">
                      <div className="w-24 h-24 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center mb-4 shadow-inner">
                        <span className="text-4xl font-black tracking-tight text-white">
                          {name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase() || 'RB'}
                        </span>
                      </div>
                      <h3 className="font-bold text-xl">{name}</h3>
                      <p className="text-xs text-blue-200 mt-1 max-w-[200px]">
                        {role}
                      </p>
                      <div className="mt-4 flex flex-wrap gap-1.5 justify-center">
                        <span className="px-2 py-0.5 rounded-md bg-white/15 text-[11px] font-medium">React.js</span>
                        <span className="px-2 py-0.5 rounded-md bg-white/15 text-[11px] font-medium">Node.js</span>
                        <span className="px-2 py-0.5 rounded-md bg-white/15 text-[11px] font-medium">MongoDB</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Floating mini stat card */}
                <div className="absolute -bottom-5 -left-4 sm:-left-6 bg-white/95 backdrop-blur-md rounded-2xl p-3.5 shadow-lg border border-slate-200 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-base">
                    💻
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                      Focus Area
                    </div>
                    <div className="text-xs font-bold text-slate-800">
                      {role.split('|')[0]?.trim() || 'Software Engineer'}
                    </div>
                  </div>
                </div>

                {/* Floating mini education badge */}
                <div className="absolute -top-4 -right-3 bg-white/95 backdrop-blur-md rounded-2xl p-3 shadow-lg border border-slate-200 flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold text-sm">
                    🎓
                  </div>
                  <div className="pr-1">
                    <div className="text-[10px] font-semibold text-slate-400 uppercase">
                      Status
                    </div>
                    <div className="text-xs font-bold text-slate-800">
                      IT Undergraduate
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default HeroSection;
