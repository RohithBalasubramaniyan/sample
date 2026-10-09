import React from 'react';
import { Link } from 'react-router-dom';
import { Home, ArrowLeft } from 'lucide-react';

const NotFoundPage = () => {
  return (
    <div className="min-h-screen bg-[#F4F7FB] flex items-center justify-center p-4 [background-image:radial-gradient(at_50%_0%,rgba(37,99,235,0.03)_0px,transparent_60%)]">
      <div className="text-center max-w-md bg-white/95 backdrop-blur-xs p-8 sm:p-10 rounded-3xl border border-slate-200/80 shadow-[0_8px_30px_-4px_rgba(23,32,51,0.06)]">
        <div className="w-16 h-16 rounded-2xl bg-blue-50 text-[#2563EB] mx-auto flex items-center justify-center font-black text-2xl mb-4">
          404
        </div>
        <h1 className="text-2xl font-extrabold text-[#172033] tracking-tight mb-2">
          Page Not Found
        </h1>
        <p className="text-sm text-[#64748B] mb-6">
          The page or resource you are looking for doesn't exist or has moved.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            to="/"
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#2563EB] hover:bg-blue-700 text-white font-semibold text-xs shadow-xs transition-colors"
          >
            <Home className="w-4 h-4" />
            Back to Home
          </Link>
          <Link
            to="/admin/login"
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#F4F7FB] hover:bg-slate-200/60 border border-slate-200/80 text-[#172033] font-semibold text-xs transition-colors"
          >
            Admin Portal
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
