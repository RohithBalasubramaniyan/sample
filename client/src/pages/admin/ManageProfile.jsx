import React, { useState, useEffect } from 'react';
import api from '../../api';
import ImageUploadInput from '../../components/admin/ImageUploadInput';
import toast from 'react-hot-toast';
import { Save, Loader2, User, Sparkles, FileText, CheckCircle2, RotateCcw } from 'lucide-react';

const ManageProfile = () => {
  const [activeTab, setActiveTab] = useState('personal');
  const [originalData, setOriginalData] = useState(null);
  const [formData, setFormData] = useState({
    // Personal Information
    name: '',
    title: '',
    email: '',
    phone: '',
    location: '',
    profileImage: '',
    statusBadge: 'Available for Internships & Opportunities',

    // Hero Section
    greeting: 'Hello, I am',
    tagline: '',
    workType: 'Full-Stack & Web Engineering',
    viewProjectsText: 'View Projects',
    viewResumeText: 'Download Resume',

    // About Section
    aboutTitle: 'About Me',
    aboutSubtitle: 'Passionate About Technology & Problem Solving',
    aboutDescription: '',
    bio: '',
    careerObjective: '',
    interests: '',
    currentLearning: '',
    resumeUrl: '',
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      const res = await api.get('/profile');
      if (res.data) {
        const mapped = {
          name: res.data.name || '',
          title: res.data.title || '',
          email: res.data.email || '',
          phone: res.data.phone || '',
          location: res.data.location || '',
          profileImage: res.data.profileImage || '',
          statusBadge: res.data.statusBadge || 'Available for Internships & Opportunities',

          greeting: res.data.greeting || 'Hello, I am',
          tagline: res.data.tagline || res.data.bio || '',
          workType: res.data.workType || 'Full-Stack & Web Engineering',
          viewProjectsText: res.data.viewProjectsText || 'View Projects',
          viewResumeText: res.data.viewResumeText || 'Download Resume',

          aboutTitle: res.data.aboutTitle || 'About Me',
          aboutSubtitle: res.data.aboutSubtitle || 'Passionate About Technology & Problem Solving',
          aboutDescription: res.data.aboutDescription || res.data.bio || '',
          bio: res.data.bio || '',
          careerObjective: res.data.careerObjective || '',
          interests: Array.isArray(res.data.interests) ? res.data.interests.join(', ') : (res.data.interests || ''),
          currentLearning: Array.isArray(res.data.currentLearning) ? res.data.currentLearning.join(', ') : (res.data.currentLearning || ''),
          resumeUrl: res.data.resumeUrl || '',
        };
        setFormData(mapped);
        setOriginalData(mapped);
      }
    } catch (err) {
      console.error('Failed to load profile:', err);
      toast.error('Failed to load profile details.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleReset = () => {
    if (originalData) {
      setFormData(originalData);
      toast.success('Form reset to saved values.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setSaving(true);
      const payload = {
        ...formData,
        interests: formData.interests
          ? formData.interests.split(',').map((s) => s.trim()).filter(Boolean)
          : [],
        currentLearning: formData.currentLearning
          ? formData.currentLearning.split(',').map((s) => s.trim()).filter(Boolean)
          : [],
      };

      const res = await api.put('/profile', payload);
      setOriginalData(formData);
      toast.success('Profile, Hero & About updated successfully!');
    } catch (err) {
      console.error('Failed to save profile:', err);
      toast.error(err.response?.data?.message || 'Error updating profile.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="py-20 flex justify-center items-center">
        <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
      </div>
    );
  }

  const tabs = [
    { id: 'personal', label: '1. Personal Information', icon: User },
    { id: 'hero', label: '2. Hero Section', icon: Sparkles },
    { id: 'about', label: '3. About Section', icon: FileText },
  ];

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/90 shadow-xs">
        {/* Header */}
        <div className="border-b border-slate-100 pb-5 mb-6">
          <h2 className="text-xl font-bold text-slate-900">Manage Profile, Hero & About Details</h2>
          <p className="text-xs text-slate-500 mt-1">
            Edit your core coordinates, greeting, hero typography, biography, and about content. All changes immediately sync to the live portfolio.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex flex-wrap gap-2 mb-8 p-1.5 bg-slate-100/80 rounded-2xl border border-slate-200/60 max-w-fit">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                  isActive
                    ? 'bg-white text-blue-600 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
                }`}
              >
                <Icon className="w-4 h-4" />
                {tab.label}
              </button>
            );
          })}
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* TAB 1: PERSONAL INFORMATION */}
          {activeTab === 'personal' && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="border-b border-slate-100 pb-3">
                <h3 className="font-bold text-sm text-slate-800 uppercase tracking-wide">
                  Core Personal Coordinates
                </h3>
                <p className="text-xs text-slate-500">
                  Visible in header, contact coordinates, hero section, and footer.
                </p>
              </div>

              {/* Profile Image */}
              <ImageUploadInput
                label="Profile Photo / Picture"
                value={formData.profileImage}
                onChange={(url) => setFormData((prev) => ({ ...prev, profileImage: url }))}
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="e.g. Rohith B"
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Short Title / Role
                  </label>
                  <input
                    type="text"
                    name="title"
                    required
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="e.g. IT Student | Web Developer"
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="e.g. rohithb.dev@gmail.com"
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Phone Number
                  </label>
                  <input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="e.g. +91 98765 43210"
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Location
                  </label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    placeholder="e.g. Bengaluru, Karnataka, India"
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Availability Status Badge
                  </label>
                  <input
                    type="text"
                    name="statusBadge"
                    value={formData.statusBadge}
                    onChange={handleChange}
                    placeholder="e.g. Available for Internships & Opportunities"
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                  />
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: HERO SECTION */}
          {activeTab === 'hero' && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="border-b border-slate-100 pb-3">
                <h3 className="font-bold text-sm text-slate-800 uppercase tracking-wide">
                  Hero Section Text & Action Buttons
                </h3>
                <p className="text-xs text-slate-500">
                  Control the hero intro banner, greeting line, headlines, and call-to-action button labels.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Greeting Text
                  </label>
                  <input
                    type="text"
                    name="greeting"
                    value={formData.greeting}
                    onChange={handleChange}
                    placeholder="e.g. Hello, I am"
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Work Type / Specialization Pill
                  </label>
                  <input
                    type="text"
                    name="workType"
                    value={formData.workType}
                    onChange={handleChange}
                    placeholder="e.g. Full-Stack & Web Engineering"
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Hero Description / Tagline
                  </label>
                  <textarea
                    name="tagline"
                    rows="3"
                    value={formData.tagline}
                    onChange={handleChange}
                    placeholder="Building modern, scalable, and responsive web applications..."
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    View Projects Button Text
                  </label>
                  <input
                    type="text"
                    name="viewProjectsText"
                    value={formData.viewProjectsText}
                    onChange={handleChange}
                    placeholder="View Projects"
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Resume Button Text
                  </label>
                  <input
                    type="text"
                    name="viewResumeText"
                    value={formData.viewResumeText}
                    onChange={handleChange}
                    placeholder="Download Resume"
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                  />
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: ABOUT SECTION */}
          {activeTab === 'about' && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="border-b border-slate-100 pb-3">
                <h3 className="font-bold text-sm text-slate-800 uppercase tracking-wide">
                  About Section Content
                </h3>
                <p className="text-xs text-slate-500">
                  Update section titles, comprehensive biography, career objective, and learning trajectories.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    About Section Heading
                  </label>
                  <input
                    type="text"
                    name="aboutTitle"
                    value={formData.aboutTitle}
                    onChange={handleChange}
                    placeholder="About Me"
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    About Section Subtitle
                  </label>
                  <input
                    type="text"
                    name="aboutSubtitle"
                    value={formData.aboutSubtitle}
                    onChange={handleChange}
                    placeholder="Passionate About Technology & Problem Solving"
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    About Section Description
                  </label>
                  <textarea
                    name="aboutDescription"
                    rows="3"
                    value={formData.aboutDescription}
                    onChange={handleChange}
                    placeholder="Short intro paragraph displayed at the top of About section..."
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Personal Information / Detailed Biography
                  </label>
                  <textarea
                    name="bio"
                    rows="4"
                    value={formData.bio}
                    onChange={handleChange}
                    placeholder="Detailed biography about your technical background and journey..."
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Career Objective
                  </label>
                  <textarea
                    name="careerObjective"
                    rows="3"
                    value={formData.careerObjective}
                    onChange={handleChange}
                    placeholder="Driven to secure a Software Engineering or Web Development Internship..."
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Interests & Passions (comma-separated)
                  </label>
                  <input
                    type="text"
                    name="interests"
                    value={formData.interests}
                    onChange={handleChange}
                    placeholder="Full-Stack, Cloud Computing, Clean Code, UI/UX"
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Current Learning Areas (comma-separated)
                  </label>
                  <input
                    type="text"
                    name="currentLearning"
                    value={formData.currentLearning}
                    onChange={handleChange}
                    placeholder="TypeScript, Next.js 14, Docker, Microservices"
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Action Buttons: Save & Cancel */}
          <div className="pt-6 border-t border-slate-100 flex items-center justify-between">
            <button
              type="button"
              onClick={handleReset}
              disabled={saving}
              className="px-4 py-2.5 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 text-xs sm:text-sm font-semibold transition-colors flex items-center gap-1.5"
            >
              <RotateCcw className="w-4 h-4" />
              Reset Changes
            </button>

            <button
              type="submit"
              disabled={saving}
              className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold text-xs sm:text-sm shadow-sm transition-all flex items-center gap-2 hover:-translate-y-0.5"
            >
              {saving ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Saving Updates...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  Save All Changes
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ManageProfile;
