import React from 'react';
import { ArrowUp } from 'lucide-react';

const Footer = ({ personal, profile, socialLinks = [] }) => {
  const info = personal || profile || {};
  const name = info.name || 'Rohith B';
  const role = info.role || info.title || 'Aspiring Full-Stack Developer';

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });
  const year = new Date().getFullYear();

  return (
    <footer className="relative bg-[#070714] border-t border-purple-500/20 py-12 px-6 lg:px-12 text-slate-400 text-sm overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-96 h-32 bg-purple-600/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
        
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full p-[1.5px] bg-gradient-to-tr from-purple-500 to-cyan-400 shadow-[0_0_12px_rgba(155,93,229,0.5)]">
            <div className="w-full h-full rounded-full bg-[#0B0B1E] flex items-center justify-center">
              <span className="text-[10px] font-black text-white">RB</span>
            </div>
          </div>
          <span className="font-bold text-white text-base tracking-wide">
            {name}
          </span>
          <span className="text-slate-600">|</span>
          <span className="text-xs font-mono text-cyan-400">
            {role}
          </span>
        </div>

        {/* Copyright */}
        <div className="text-xs text-slate-500 text-center">
          © {year} {name}. Designed with futuristic neon cyberpunk aesthetic.
        </div>

        {/* Back to top button */}
        <button
          onClick={scrollToTop}
          className="p-3 rounded-full bg-[#0E0E28] border border-purple-500/30 text-slate-300 hover:text-cyan-400 hover:border-cyan-400 transition-all hover:scale-110 shadow-[0_0_15px_rgba(0,0,0,0.5)] cursor-pointer"
          title="Scroll to Top"
        >
          <ArrowUp className="w-4 h-4" />
        </button>

      </div>
    </footer>
  );
};

export default Footer;
