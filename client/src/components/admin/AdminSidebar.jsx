import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  User,
  Sparkles,
  Briefcase,
  GraduationCap,
  Award,
  FileText,
  Mail,
  Share2,
  LogOut,
  ExternalLink,
  X,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const menuItems = [
  { name: 'Dashboard', path: '/admin/dashboard', icon: LayoutDashboard },
  { name: 'Personal & About', path: '/admin/profile', icon: User },
  { name: 'Skills', path: '/admin/skills', icon: Sparkles },
  { name: 'Projects', path: '/admin/projects', icon: Briefcase },
  { name: 'Education', path: '/admin/education', icon: GraduationCap },
  { name: 'Experience', path: '/admin/experience', icon: Briefcase },
  { name: 'Certifications', path: '/admin/certifications', icon: Award },
  { name: 'Resume', path: '/admin/resume', icon: FileText },
  { name: 'Messages', path: '/admin/messages', icon: Mail },
  { name: 'Social Links', path: '/admin/social-links', icon: Share2 },
];

const AdminSidebar = ({ isMobileOpen, setIsMobileOpen, unreadCount = 0 }) => {
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to sign out of the Admin Dashboard?')) {
      logout();
      navigate('/admin/login');
    }
  };

  const navContent = (
    <div className="flex flex-col h-full bg-slate-900 text-slate-300">
      {/* Brand Header */}
      <div className="p-5 border-b border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold text-base shadow-sm">
            RB
          </div>
          <div>
            <h2 className="font-bold text-white text-sm tracking-tight">Admin Console</h2>
            <p className="text-[11px] text-slate-400">Rohith B Portfolio</p>
          </div>
        </div>

        {/* Mobile close button */}
        {setIsMobileOpen && (
          <button
            onClick={() => setIsMobileOpen(false)}
            className="lg:hidden text-slate-400 hover:text-white p-1 rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Navigation links */}
      <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={() => setIsMobileOpen && setIsMobileOpen(false)}
              className={({ isActive }) =>
                `flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-blue-600 text-white font-semibold shadow-xs'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/80'
                }`
              }
            >
              <div className="flex items-center gap-3">
                <Icon className="w-4 h-4 shrink-0" />
                <span>{item.name}</span>
              </div>
              {item.name === 'Messages' && unreadCount > 0 && (
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-500 text-white">
                  {unreadCount}
                </span>
              )}
            </NavLink>
          );
        })}
      </nav>

      {/* Footer Info & Actions */}
      <div className="p-3 border-t border-slate-800 space-y-2">
        <a
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-between px-3.5 py-2 rounded-xl text-xs font-medium text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
        >
          <span className="flex items-center gap-2">
            <ExternalLink className="w-3.5 h-3.5 text-blue-400" />
            View Live Portfolio
          </span>
        </a>

        <div className="px-3.5 py-2.5 rounded-xl bg-slate-800/50 flex items-center justify-between">
          <div className="truncate pr-2">
            <p className="text-xs font-semibold text-white truncate">
              {user?.username || 'admin'}
            </p>
            <p className="text-[10px] text-slate-400 truncate">Administrator</p>
          </div>
          <button
            onClick={handleLogout}
            className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-slate-800 transition-colors"
            title="Log Out"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Persistent Sidebar */}
      <aside className="hidden lg:block w-64 h-screen fixed left-0 top-0 z-30 shadow-xl border-r border-slate-800">
        {navContent}
      </aside>

      {/* Mobile Drawer */}
      {isMobileOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs"
            onClick={() => setIsMobileOpen(false)}
          />
          <div className="relative w-64 max-w-[80vw] h-full shadow-2xl z-10">
            {navContent}
          </div>
        </div>
      )}
    </>
  );
};

export default AdminSidebar;
