import React from 'react';
import { Link } from 'react-router-dom';
import { Home, ArrowLeft } from 'lucide-react';

const NotFoundPage = () => {
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="text-center max-w-md bg-white p-8 sm:p-10 rounded-3xl border border-slate-200 shadow-xl">
        <div className="w-16 h-16 rounded-2xl bg-blue-50 text-blue-600 mx-auto flex items-center justify-center font-black text-2xl mb-4">
          404
        </div>
        <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight mb-2">
          Page Not Found
        </h1>
        <p className="text-sm text-slate-500 mb-6">
          The page or resource you are looking for doesn't exist or has moved.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            to="/"
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs shadow-xs transition-colors"
          >
            <Home className="w-4 h-4" />
            Back to Home
          </Link>
          <Link
            to="/admin/login"
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs transition-colors"
          >
            Admin Portal
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
