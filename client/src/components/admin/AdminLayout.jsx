import React, { useState, useEffect } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import AdminSidebar from './AdminSidebar';
import { Menu, Bell, ExternalLink, ShieldCheck } from 'lucide-react';
import api from '../../api';

const titleMap = {
  '/admin/dashboard': 'Dashboard Overview',
  '/admin/profile': 'Personal Information & About',
  '/admin/skills': 'Manage Technical Skills',
  '/admin/projects': 'Manage Portfolio Projects',
  '/admin/education': 'Manage Education Timeline',
  '/admin/experience': 'Manage Work Experience',
  '/admin/certifications': 'Manage Certifications',
  '/admin/resume': 'Manage Resume Document',
  '/admin/messages': 'Contact Messages Inbox',
  '/admin/social-links': 'Manage Social Media Links',
};

const AdminLayout = () => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const location = useLocation();

  useEffect(() => {
    const fetchUnreadCount = async () => {
      try {
        const res = await api.get('/stats');
        setUnreadCount(res.data.unreadMessages || 0);
      } catch (err) {
        // Silently ignore or retry
      }
    };

    fetchUnreadCount();
  }, [location.pathname]);

  const currentTitle = titleMap[location.pathname] || 'Admin Dashboard';

  return (
    <div className="min-h-screen bg-slate-100 flex">
      {/* Sidebar */}
      <AdminSidebar
        isMobileOpen={isMobileOpen}
        setIsMobileOpen={setIsMobileOpen}
        unreadCount={unreadCount}
      />

      {/* Main Content Area */}
      <div className="flex-1 lg:pl-64 flex flex-col min-w-0">
        
        {/* Top Header */}
        <header className="sticky top-0 z-20 bg-white/90 backdrop-blur-md border-b border-slate-200/80 px-4 sm:px-6 py-3.5 flex items-center justify-between shadow-xs">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsMobileOpen(true)}
              className="lg:hidden p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100"
              aria-label="Open sidebar"
            >
              <Menu className="w-5 h-5" />
            </button>
            <h1 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">
              {currentTitle}
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/admin/messages"
              className="relative p-2 rounded-xl text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-colors"
              title="Inbox Messages"
            >
              <Bell className="w-5 h-5" />
              {unreadCount > 0 && (
                <span className="absolute top-1 right-1 w-2.5 h-2.5 rounded-full bg-rose-500 ring-2 ring-white" />
              )}
            </Link>

            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-blue-700 bg-blue-50 hover:bg-blue-100 transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              View Site
            </a>
          </div>
        </header>

        {/* Dynamic Nested Page Content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
          <div className="max-w-6xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
