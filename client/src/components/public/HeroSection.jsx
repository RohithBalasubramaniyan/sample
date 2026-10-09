import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, Download, ArrowRight, MapPin, Sparkles, Code2 } from 'lucide-react';
import { Github, Linkedin } from '../common/BrandIcons';

const HeroSection = ({ personal, profile, socialLinks = [] }) => {
  const data = personal || profile || {};
  const name = data.name || 'Rohith B';
  const role = data.role || data.title || 'Aspiring Full-Stack Developer';
  const tagline = data.tagline || 'Building modern, high-performance web applications with clean architecture.';
  const bio = data.bio || tagline;
  const location = data.location || 'India';
  const resumeUrl = data.resume || data.resumeUrl;
  const profileImage = data.profileImage || '/images/profile.jpg';
  const statusBadge = data.statusBadge || 'Available for opportunities';

  const [imgError, setImgError] = useState(false);

  const nameParts = name.trim().split(' ');
  const firstName = nameParts[0] || 'ROHITH';
  const lastName = nameParts.slice(1).join(' ') || 'B';

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center pt-28 pb-16 px-6 lg:px-12 overflow-hidden">
      {/* Background radial spotlights */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-cyan-500/15 rounded-full blur-[120px] pointer-events-none" />
      
      {/* Background grid dots */}
      <div 
        className="absolute inset-0 opacity-[0.07] pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle, #9B5DE5 1px, transparent 1px)',
          backgroundSize: '32px 32px'
        }}
      />

      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center z-10">
        
        {/* Left column: Text content */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left space-y-6"
        >
          {/* Status badge */}
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#12122F]/80 border border-purple-500/30 shadow-[0_0_15px_rgba(155,93,229,0.2)]">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_#34d399]" />
            <span className="text-xs font-semibold tracking-wider uppercase text-purple-200">
              {statusBadge}
            </span>
          </div>

          {/* Main big headline with Antigravity Floating Effect */}
          <div className="antigravity-float-text">
            <h1 className="whitespace-nowrap text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black uppercase tracking-tight leading-none inline-flex items-center justify-center lg:justify-start gap-2.5 sm:gap-4 select-none">
              <span className="text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.2)]">
                {firstName}
              </span>
              <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent drop-shadow-[0_0_35px_rgba(155,93,229,0.45)]">
                {lastName}
              </span>
            </h1>
          </div>

          {/* Role badge */}
          <p className="text-lg sm:text-xl font-medium text-cyan-300/90 tracking-wide">
            {role}
          </p>

          {/* Bio / Tagline */}
          <p className="text-sm sm:text-base text-slate-300 max-w-xl leading-relaxed">
            {bio}
          </p>

          {/* Location badge */}
          {location && (
            <div className="flex items-center gap-1.5 text-xs text-slate-400 font-medium">
              <MapPin className="w-3.5 h-3.5 text-pink-400" />
              <span>Based in {location}</span>
            </div>
          )}

          {/* Action buttons */}
          <div className="pt-3 flex flex-wrap items-center justify-center lg:justify-start gap-4">
            <button
              onClick={() => scrollToSection('contact')}
              className="px-8 py-3.5 rounded-full font-bold text-sm uppercase tracking-wider text-white bg-gradient-to-r from-purple-600 via-fuchsia-600 to-cyan-500 hover:from-purple-500 hover:to-cyan-400 shadow-[0_0_25px_rgba(155,93,229,0.6)] hover:shadow-[0_0_35px_rgba(6,182,212,0.8)] transition-all duration-300 transform hover:-translate-y-0.5 cursor-pointer"
            >
              Hire Me
            </button>

            <button
              onClick={() => scrollToSection('projects')}
              className="px-7 py-3.5 rounded-full font-semibold text-sm uppercase tracking-wider text-slate-200 bg-[#12122E]/80 border border-purple-500/30 hover:border-cyan-400/60 hover:text-white transition-all duration-300 transform hover:-translate-y-0.5 cursor-pointer shadow-[0_0_15px_rgba(0,0,0,0.5)]"
            >
              View Projects
            </button>

            {resumeUrl && (
              <a
                href={resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3.5 rounded-full text-slate-300 bg-[#12122E]/80 border border-purple-500/30 hover:text-cyan-400 hover:border-cyan-400/60 transition-all duration-300 cursor-pointer"
                title="Download Resume"
              >
                <Download className="w-4 h-4" />
              </a>
            )}
          </div>

          {/* Social icons */}
          {socialLinks && socialLinks.length > 0 && (
            <div className="pt-2 flex items-center gap-3">
              {socialLinks.map((s, idx) => (
                <a
                  key={idx}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-[#12122F]/90 border border-purple-500/20 hover:border-cyan-400 flex items-center justify-center text-slate-300 hover:text-cyan-400 shadow-sm transition-all duration-200 hover:scale-110"
                  title={s.platform}
                >
                  {s.platform?.toLowerCase().includes('github') ? (
                    <Github className="w-4 h-4" />
                  ) : s.platform?.toLowerCase().includes('linkedin') ? (
                    <Linkedin className="w-4 h-4" />
                  ) : (
                    <Code2 className="w-4 h-4" />
                  )}
                </a>
              ))}
            </div>
          )}
        </motion.div>

        {/* Right column: Glowing Circular Avatar (Dribbble shot signature feature) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
          className="lg:col-span-5 flex justify-center items-center relative"
        >
          {/* Outer glow rings */}
          <div className="absolute w-72 h-72 sm:w-96 sm:h-96 rounded-full bg-gradient-to-tr from-purple-600/30 via-pink-600/20 to-cyan-500/30 blur-2xl pointer-events-none animate-pulse" />

          {/* The signature Dribbble double neon gradient ring with Antigravity Floating Effect */}
          <div className="antigravity-float-photo relative w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 rounded-full p-[4px] bg-gradient-to-tr from-purple-500 via-pink-500 to-cyan-400 shadow-[0_0_50px_rgba(155,93,229,0.45),0_0_70px_rgba(6,182,212,0.35)] transition-transform duration-500 hover:scale-[1.02]">
            
            {/* Inner frame */}
            <div className="w-full h-full rounded-full bg-[#0B0B1E] p-2 overflow-hidden flex items-center justify-center relative">
              {!imgError ? (
                <img
                  src={profileImage}
                  alt={name}
                  onError={() => setImgError(true)}
                  className="w-full h-full object-cover rounded-full grayscale-[15%] hover:grayscale-0 transition-all duration-500"
                />
              ) : (
                <div className="w-full h-full rounded-full bg-gradient-to-br from-[#1E1138] to-[#0A1A2F] flex flex-col items-center justify-center text-center p-6">
                  <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-purple-600 to-cyan-400 flex items-center justify-center text-3xl font-black text-white shadow-[0_0_25px_rgba(155,93,229,0.6)] mb-3">
                    {firstName[0]}{lastName[0]}
                  </div>
                  <p className="text-white font-bold text-lg">{name}</p>
                  <p className="text-cyan-400 text-xs font-mono mt-1">{role}</p>
                </div>
              )}
            </div>

            {/* Orbiting mini badges */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
              className="absolute inset-[-14px] rounded-full pointer-events-none"
            >
              <div className="absolute top-2 left-6 w-3.5 h-3.5 rounded-full bg-cyan-400 shadow-[0_0_12px_#22d3ee]" />
              <div className="absolute bottom-6 right-6 w-3 h-3 rounded-full bg-purple-400 shadow-[0_0_12px_#c084fc]" />
            </motion.div>
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default HeroSection;
