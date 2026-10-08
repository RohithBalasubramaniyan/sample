import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import StatCard from '../../components/admin/StatCard';
import {
  Briefcase,
  Sparkles,
  Award,
  Mail,
  Clock,
  Plus,
  ExternalLink,
  Loader2,
  Calendar,
} from 'lucide-react';
import api from '../../api';

const DashboardOverview = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchStats = async () => {
    try {
      setLoading(true);
      const res = await api.get('/stats');
      setStats(res.data);
    } catch (err) {
      console.error('Error fetching dashboard stats:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="py-20 flex flex-col items-center justify-center">
        <Loader2 className="w-8 h-8 text-blue-600 animate-spin mb-2" />
        <p className="text-xs text-slate-500 font-medium">Gathering statistics...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Top Welcome Banner */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-3xl p-6 sm:p-8 text-white shadow-md flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight">
            Welcome to Portfolio Command Center
          </h2>
          <p className="text-xs sm:text-sm text-blue-100 mt-1 max-w-xl">
            Manage all aspects of Rohith B's portfolio dynamically. Changes update live across the public site immediately.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Link
            to="/admin/projects"
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-white text-blue-700 hover:bg-blue-50 font-semibold text-xs shadow-xs transition-colors"
          >
            <Plus className="w-4 h-4" />
            Add Project
          </Link>
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-blue-500/40 hover:bg-blue-500/60 text-white font-semibold text-xs border border-white/20 transition-colors"
          >
            <ExternalLink className="w-4 h-4" />
            Live Preview
          </a>
        </div>
      </div>

      {/* Stats Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <StatCard
          title="Total Projects"
          count={stats?.totalProjects}
          icon={Briefcase}
          color="blue"
          link="/admin/projects"
        />
        <StatCard
          title="Total Skills"
          count={stats?.totalSkills}
          icon={Sparkles}
          color="emerald"
          link="/admin/skills"
        />
        <StatCard
          title="Certifications"
          count={stats?.totalCertifications}
          icon={Award}
          color="amber"
          link="/admin/certifications"
        />
        <StatCard
          title="Total Messages"
          count={stats?.totalMessages}
          icon={Mail}
          color="purple"
          link="/admin/messages"
        />
        <StatCard
          title="Experience Items"
          count={stats?.totalExperience}
          icon={Clock}
          color="rose"
          link="/admin/experience"
        />
      </div>

      {/* Recent Messages & Projects Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Recent Messages */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 border border-slate-200/90 shadow-xs">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h3 className="font-bold text-slate-900 text-base">Recent Messages</h3>
              <p className="text-xs text-slate-400">Incoming inquiries from contact form</p>
            </div>
            <Link
              to="/admin/messages"
              className="text-xs font-semibold text-blue-600 hover:text-blue-700"
            >
              View All &rarr;
            </Link>
          </div>

          {stats?.recentMessages?.length === 0 ? (
            <div className="text-center py-10 text-xs text-slate-400 bg-slate-50 rounded-2xl border border-slate-100">
              No messages received yet. Submit the contact form on the home page to test!
            </div>
          ) : (
            <div className="divide-y divide-slate-100">
              {stats.recentMessages.map((msg) => (
                <div key={msg._id} className="py-3 flex items-start justify-between gap-4">
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-xs text-slate-800">{msg.name}</span>
                      <span className="text-[11px] text-slate-400">({msg.email})</span>
                      {!msg.read && (
                        <span className="w-2 h-2 rounded-full bg-blue-600" title="Unread" />
                      )}
                    </div>
                    <p className="text-xs text-slate-600 font-medium truncate max-w-sm">
                      {msg.subject}
                    </p>
                    <p className="text-[11px] text-slate-400 line-clamp-1">{msg.message}</p>
                  </div>
                  <span className="text-[10px] text-slate-400 shrink-0">
                    {new Date(msg.createdAt).toLocaleDateString()}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Recent Projects */}
        <div className="lg:col-span-5 bg-white rounded-3xl p-6 border border-slate-200/90 shadow-xs">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h3 className="font-bold text-slate-900 text-base">Projects Overview</h3>
              <p className="text-xs text-slate-400">Current portfolio projects</p>
            </div>
            <Link
              to="/admin/projects"
              className="text-xs font-semibold text-blue-600 hover:text-blue-700"
            >
              Manage &rarr;
            </Link>
          </div>

          {stats?.recentProjects?.length === 0 ? (
            <div className="text-center py-10 text-xs text-slate-400 bg-slate-50 rounded-2xl border border-slate-100">
              No projects added yet.
            </div>
          ) : (
            <div className="space-y-3">
              {stats.recentProjects.map((p) => (
                <div
                  key={p._id}
                  className="p-3 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-between gap-3 hover:bg-slate-100/70 transition-colors"
                >
                  <div className="truncate">
                    <h4 className="text-xs font-bold text-slate-800 truncate">{p.title}</h4>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      {p.category} &bull; {p.technologies?.slice(0, 3).join(', ')}
                    </p>
                  </div>
                  {p.featured && (
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-100 text-blue-700 shrink-0">
                      Featured
                    </span>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardOverview;
