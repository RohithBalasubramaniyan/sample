import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Shield, ArrowUpRight, Download } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const navLinks = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Skills', href: '#skills' },
  { name: 'Projects', href: '#projects' },
  { name: 'Education', href: '#education' },
  { name: 'Experience', href: '#experience' },
  { name: 'Certifications', href: '#certifications' },
  { name: 'Resume', href: '#resume' },
  { name: 'Contact', href: '#contact' },
];

const Navbar = ({ personal, profile }) => {
  const { isAuthenticated } = useAuth();
  const info = personal || profile || {};
  const name = info.name || 'Rohith B';
  const resumeUrl = info.resume || info.resumeUrl;
  const role = info.role || info.title || 'Portfolio';
  const initials = name
    .split(' ')
    .filter(Boolean)
    .map((n) => n[0])
    .join('')
    .slice(0, 2)
    .toUpperCase() || 'RB';

  const profileImage = info.profileImage;
  const [navImgError, setNavImgError] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      // Scrollspy logic
      const sections = navLinks.map((link) => link.href.substring(1));
      const scrollPosition = window.scrollY + 120;

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

    window.addEventListener('scroll', handleScroll);
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
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-slate-200/80 py-3'
          : 'bg-white/80 backdrop-blur-sm border-b border-slate-100 py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo / Brand */}
          <a
            href="#home"
            className="flex items-center gap-2.5 group"
            onClick={(e) => handleNavClick(e, '#home')}
          >
            <div className="w-10 h-10 rounded-xl overflow-hidden bg-blue-600 text-white flex items-center justify-center font-bold text-base shadow-sm ring-1 ring-slate-200/60 group-hover:ring-2 group-hover:ring-blue-500 transition-all shrink-0">
              {profileImage && !navImgError ? (
                <img
                  src={profileImage}
                  alt={name}
                  className="w-full h-full object-cover object-top"
                  onError={() => setNavImgError(true)}
                />
              ) : (
                initials
              )}
            </div>
            <div>
              <span className="font-bold text-slate-900 text-lg tracking-tight group-hover:text-blue-600 transition-colors">
                {name}
              </span>
              <span className="block text-xs font-medium text-slate-500">
                {role}
              </span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden xl:flex items-center space-x-1 lg:space-x-1.5">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.substring(1);
              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? 'text-blue-600 bg-blue-50/80'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/60'
                  }`}
                >
                  {link.name}
                </a>
              );
            })}
          </nav>

          {/* Desktop Right Actions */}
          <div className="hidden sm:flex items-center gap-3">
            {resumeUrl && (
              <a
                href={resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden md:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors"
              >
                <Download className="w-3.5 h-3.5" />
                Resume
              </a>
            )}

            <a
              href="#contact"
              onClick={(e) => handleNavClick(e, '#contact')}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 shadow-sm transition-all hover:shadow hover:-translate-y-0.5"
            >
              Get in Touch
            </a>

            {isAuthenticated ? (
              <Link
                to="/admin/dashboard"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-blue-700 bg-blue-50 border border-blue-200 hover:bg-blue-100 transition-colors"
                title="Go to Admin CMS Dashboard"
              >
                <Shield className="w-3.5 h-3.5" />
                Admin Panel
              </Link>
            ) : (
              <Link
                to="/admin/login"
                className="hidden lg:inline-flex items-center gap-1 text-[11px] font-semibold text-slate-400 hover:text-blue-600 px-2 py-1 rounded transition-colors"
                title="Admin Sign In"
              >
                <Shield className="w-3.5 h-3.5" />
                Admin
              </Link>
            )}
          </div>


          {/* Mobile menu button */}
          <div className="flex sm:hidden items-center gap-2">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors focus:outline-none"
              aria-label="Toggle Navigation Menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isOpen && (
        <div className="xl:hidden bg-white border-b border-slate-200 px-4 pt-3 pb-6 shadow-xl animate-in slide-in-from-top duration-200">
          <div className="flex flex-col space-y-1">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.substring(1);
              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={`px-3 py-2.5 rounded-lg text-base font-medium transition-colors ${
                    isActive
                      ? 'text-blue-600 bg-blue-50 font-semibold'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  {link.name}
                </a>
              );
            })}
          </div>

          <div className="mt-4 pt-4 border-t border-slate-100 flex flex-col gap-2">
            {resumeUrl && (
              <a
                href={resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsOpen(false)}
                className="w-full text-center py-2.5 rounded-lg text-sm font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200"
              >
                Download Resume
              </a>
            )}

            <a
              href="#contact"
              onClick={(e) => handleNavClick(e, '#contact')}
              className="w-full text-center py-2.5 rounded-lg text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 shadow-sm"
            >
              Get in Touch
            </a>

            <Link
              to={isAuthenticated ? "/admin/dashboard" : "/admin/login"}
              onClick={() => setIsOpen(false)}
              className="w-full text-center py-2.5 rounded-lg text-sm font-semibold text-blue-600 bg-blue-50 hover:bg-blue-100 flex items-center justify-center gap-1.5"
            >
              <Shield className="w-4 h-4" />
              {isAuthenticated ? "Admin Dashboard" : "Admin Login"}
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
