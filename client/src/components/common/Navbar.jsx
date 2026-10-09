import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Shield, X, Menu } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';

const navLinks = [
  { name: 'About', href: '#about' },
  { name: 'Skills', href: '#skills' },
  { name: 'Projects', href: '#projects' },
  { name: 'Experience', href: '#experience' },
  { name: 'Contact', href: '#contact' },
];

const Navbar = ({ personal, profile }) => {
  const { isAuthenticated } = useAuth();
  const info = personal || profile || {};
  const name = info.name || 'Rohith B';
  const initials = name.split(' ').filter(Boolean).map(n => n[0]).join('').slice(0, 2).toUpperCase() || 'RB';
  const resumeUrl = info.resume || info.resumeUrl;

  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);

      const sections = ['home', 'about', 'skills', 'projects', 'experience', 'education', 'certifications', 'contact'];
      const scrollPosition = window.scrollY + 180;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e, href) => {
    e.preventDefault();
    setIsOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Floating Header */}
      <motion.header
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="fixed top-0 left-0 right-0 z-50 pt-4 px-4 sm:px-8"
      >
        <div className="max-w-6xl mx-auto">
          <div
            className={`flex items-center justify-between px-6 py-3 rounded-full transition-all duration-300 ${
              scrolled
                ? 'bg-[#0E0E28]/85 backdrop-blur-xl border border-purple-500/30 shadow-[0_8px_30px_rgba(0,0,0,0.5)] shadow-purple-950/30'
                : 'bg-[#0E0E28]/50 backdrop-blur-md border border-purple-500/20'
            }`}
          >
            {/* Logo */}
            <a
              href="#home"
              onClick={(e) => handleNavClick(e, '#home')}
              className="flex items-center gap-3 group"
            >
              <div className="w-10 h-10 rounded-full p-[1.5px] bg-gradient-to-tr from-purple-500 via-pink-500 to-cyan-400 shadow-[0_0_15px_rgba(155,93,229,0.5)]">
                <div className="w-full h-full rounded-full bg-[#0B0B1E] flex items-center justify-center">
                  <span className="text-xs font-extrabold tracking-wider bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                    {initials}
                  </span>
                </div>
              </div>
              <span className="font-semibold text-sm tracking-wide text-white group-hover:text-cyan-400 transition-colors hidden sm:inline">
                {name}
              </span>
            </a>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => {
                const sectionId = link.href.substring(1);
                const isActive = activeSection === sectionId;
                return (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className={`text-xs uppercase font-semibold tracking-widest transition-all duration-200 relative py-1 ${
                      isActive
                        ? 'text-cyan-400 shadow-[0_0_10px_rgba(6,182,212,0.6)]'
                        : 'text-slate-300 hover:text-white'
                    }`}
                  >
                    {link.name}
                    {isActive && (
                      <motion.span
                        layoutId="navIndicator"
                        className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-purple-500 to-cyan-400 rounded-full"
                      />
                    )}
                  </a>
                );
              })}
            </nav>

            {/* Right CTAs */}
            <div className="flex items-center gap-3">
              {resumeUrl && (
                <a
                  href={resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hidden sm:inline-flex text-xs font-semibold uppercase tracking-wider text-slate-300 hover:text-cyan-400 transition-colors px-3 py-1.5"
                >
                  Resume
                </a>
              )}

              <a
                href="#contact"
                onClick={(e) => handleNavClick(e, '#contact')}
                className="relative inline-flex items-center justify-center p-0.5 overflow-hidden rounded-full font-bold text-xs uppercase tracking-wider group cursor-pointer shadow-[0_0_20px_rgba(155,93,229,0.4)] hover:shadow-[0_0_25px_rgba(6,182,212,0.6)] transition-all duration-300"
              >
                <span className="w-full h-full bg-gradient-to-r from-purple-600 via-pink-500 to-cyan-400 group-hover:from-purple-500 group-hover:to-cyan-300 text-white px-5 py-2 rounded-full transition-all duration-200">
                  Hire Me
                </span>
              </a>

              {isAuthenticated && (
                <Link
                  to="/admin/dashboard"
                  className="text-xs text-purple-400 hover:text-white transition-colors p-1.5 rounded-full hover:bg-purple-500/20"
                  title="Admin Panel"
                >
                  <Shield className="w-4 h-4" />
                </Link>
              )}

              {/* Mobile menu trigger */}
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="md:hidden w-9 h-9 flex items-center justify-center text-slate-200 hover:text-cyan-400 transition-colors ml-1"
                aria-label="Toggle menu"
              >
                {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 bg-[#0B0B1E]/95 backdrop-blur-2xl flex flex-col px-8 pt-28 pb-10"
          >
            <nav className="flex flex-col gap-5">
              {navLinks.map((link, idx) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className="text-2xl font-bold tracking-wider text-slate-200 hover:text-cyan-400 uppercase font-sans transition-colors"
                >
                  {link.name}
                </motion.a>
              ))}
            </nav>

            <div className="mt-auto flex flex-col gap-4">
              {resumeUrl && (
                <a
                  href={resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 text-center text-sm font-semibold uppercase tracking-wider rounded-full border border-purple-500/40 text-slate-200 hover:bg-purple-500/10 transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  Download Resume
                </a>
              )}
              <a
                href="#contact"
                onClick={(e) => handleNavClick(e, '#contact')}
                className="w-full py-3 text-center text-sm font-bold uppercase tracking-wider rounded-full bg-gradient-to-r from-purple-600 to-cyan-500 text-white shadow-[0_0_20px_rgba(155,93,229,0.5)]"
              >
                Hire Me
              </a>
              <Link
                to={isAuthenticated ? '/admin/dashboard' : '/admin/login'}
                onClick={() => setIsOpen(false)}
                className="text-center text-xs text-slate-400 flex items-center justify-center gap-1.5 py-2"
              >
                <Shield className="w-3.5 h-3.5 text-purple-400" />
                {isAuthenticated ? 'Admin Dashboard' : 'Admin Login'}
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
