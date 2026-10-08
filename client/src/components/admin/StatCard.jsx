import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const StatCard = ({ title, count, icon: Icon, color = 'blue', link }) => {
  const colorMap = {
    blue: {
      bg: 'bg-blue-50',
      text: 'text-blue-600',
      border: 'hover:border-blue-300',
    },
    emerald: {
      bg: 'bg-emerald-50',
      text: 'text-emerald-600',
      border: 'hover:border-emerald-300',
    },
    amber: {
      bg: 'bg-amber-50',
      text: 'text-amber-600',
      border: 'hover:border-amber-300',
    },
    purple: {
      bg: 'bg-purple-50',
      text: 'text-purple-600',
      border: 'hover:border-purple-300',
    },
    rose: {
      bg: 'bg-rose-50',
      text: 'text-rose-600',
      border: 'hover:border-rose-300',
    },
  };

  const scheme = colorMap[color] || colorMap.blue;

  const content = (
    <div className={`bg-white rounded-2xl p-6 border border-slate-200/90 shadow-xs ${scheme.border} transition-all duration-200 flex items-center justify-between group`}>
      <div className="space-y-1">
        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
          {title}
        </p>
        <p className="text-3xl font-extrabold text-slate-900 tracking-tight">
          {count ?? 0}
        </p>
      </div>

      <div className={`w-12 h-12 rounded-2xl ${scheme.bg} ${scheme.text} flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform`}>
        <Icon className="w-6 h-6" />
      </div>
    </div>
  );

  if (link) {
    return <Link to={link}>{content}</Link>;
  }

  return content;
};

export default StatCard;
