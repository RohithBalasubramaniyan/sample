import React from 'react';
import { ArrowUp } from 'lucide-react';
import { Github, Linkedin, Twitter } from './BrandIcons';
import DynamicIcon from './DynamicIcon';

const Footer = ({ personal, profile, socialLinks = [] }) => {
  const info = personal || profile || {};
  const name = info.name || 'Rohith B';
  const role = info.role || info.title || 'IT Student | Web Developer';
  const bio = info.bio || info.tagline || 'Passionate Information Technology student with hands-on expertise in modern web technologies.';
  const email = info.email || 'rohithb.dev@gmail.com';
  const phone = info.phone;
  const location = info.location;
  const profileImage = info.profileImage;
  const [footerImgError, setFooterImgError] = React.useState(false);
  const initials = name
    .split(' ')
    .filter(Boolean)
    .map((n) => n[0])
    .join('')
    .slice(0, 2)
    .toUpperCase() || 'RB';

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-slate-800">
          {/* Brand & bio */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl overflow-hidden bg-blue-600 text-white flex items-center justify-center font-bold text-base shadow-sm ring-1 ring-slate-700 shrink-0">
                {profileImage && !footerImgError ? (
                  <img
                    src={profileImage}
                    alt={name}
                    className="w-full h-full object-cover object-top"
                    onError={() => setFooterImgError(true)}
                  />
                ) : (
                  initials
                )}
              </div>
              <div>
                <h3 className="text-white font-bold text-lg tracking-tight">
                  {name}
                </h3>
                <p className="text-xs text-blue-400 font-medium">
                  {role}
                </p>
              </div>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed max-w-md">
              {bio}
            </p>
            {/* Social links */}
            <div className="flex items-center gap-3 pt-2">
              {socialLinks && socialLinks.length > 0 ? (
                socialLinks.map((link, idx) => (
                  <a
                    key={link.id || link.platform || idx}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 rounded-lg bg-slate-800 hover:bg-blue-600 text-slate-300 hover:text-white flex items-center justify-center transition-all duration-200"
                    title={link.platform}
                  >
                    <DynamicIcon name={link.icon || link.platform} className="w-4 h-4" />
                  </a>
                ))
              ) : (
                <div className="flex items-center gap-3">
                  <a
                    href="https://github.com/rohith-b"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 rounded-lg bg-slate-800 hover:bg-blue-600 text-slate-300 hover:text-white flex items-center justify-center transition-colors"
                  >
                    <Github className="w-4 h-4" />
                  </a>
                  <a
                    href="https://linkedin.com/in/rohith-b"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 rounded-lg bg-slate-800 hover:bg-blue-600 text-slate-300 hover:text-white flex items-center justify-center transition-colors"
                  >
                    <Linkedin className="w-4 h-4" />
                  </a>
                </div>
              )}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">
              Navigation
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a href="#about" className="hover:text-white transition-colors">
                  About Me
                </a>
              </li>
              <li>
                <a href="#skills" className="hover:text-white transition-colors">
                  Skills & Tools
                </a>
              </li>
              <li>
                <a href="#projects" className="hover:text-white transition-colors">
                  Featured Projects
                </a>
              </li>
              <li>
                <a href="#education" className="hover:text-white transition-colors">
                  Education
                </a>
              </li>
              <li>
                <a href="#experience" className="hover:text-white transition-colors">
                  Experience
                </a>
              </li>
              <li>
                <a href="#certifications" className="hover:text-white transition-colors">
                  Certifications
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">
              Contact Info
            </h4>
            <ul className="space-y-3 text-sm text-slate-400">
              <li className="flex items-center gap-2">
                <span className="text-slate-500 text-xs">Email:</span>
                <a
                  href={`mailto:${email}`}
                  className="hover:text-blue-400 transition-colors text-slate-300"
                >
                  {email}
                </a>
              </li>
              {phone && (
                <li className="flex items-center gap-2">
                  <span className="text-slate-500 text-xs">Phone:</span>
                  <a href={`tel:${phone.replace(/\s+/g, '')}`} className="text-slate-300 hover:text-white transition-colors">
                    {phone}
                  </a>
                </li>
              )}
              {location && (
                <li className="flex items-center gap-2">
                  <span className="text-slate-500 text-xs">Location:</span>
                  <span className="text-slate-300">{location}</span>
                </li>
              )}
              <li className="pt-2">
                <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-950/60 text-emerald-400 border border-emerald-800">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mr-1.5 animate-pulse"></span>
                  Open to Opportunities
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>
            &copy; {new Date().getFullYear()} {name}. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <span>Built with React & Tailwind CSS</span>
            <button
              onClick={scrollToTop}
              className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-blue-600 text-slate-400 hover:text-white flex items-center justify-center transition-colors"
              title="Scroll to Top"
              aria-label="Scroll to top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
