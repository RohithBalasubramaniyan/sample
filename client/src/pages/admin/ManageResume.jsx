import React, { useState, useEffect } from 'react';
import api from '../../api';
import toast from 'react-hot-toast';
import { FileText, UploadCloud, Download, Eye, ExternalLink, Loader2, Save } from 'lucide-react';

const ManageResume = () => {
  const [resumeUrl, setResumeUrl] = useState('');
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        const res = await api.get('/profile');
        if (res.data?.resumeUrl) {
          setResumeUrl(res.data.resumeUrl);
        }
      } catch (err) {
        console.error('Failed to load resume info:', err);
        toast.error('Failed to load profile details.');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleFileUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.type !== 'application/pdf' && !file.name.endsWith('.pdf')) {
      toast.error('Please upload a PDF document (.pdf).');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      setUploading(true);
      const res = await api.post('/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      const uploadedUrl = res.data.url;
      setResumeUrl(uploadedUrl);

      // Auto-save to profile
      await api.put('/profile', { resumeUrl: uploadedUrl });
      toast.success('Resume uploaded and updated in profile successfully!');
    } catch (err) {
      console.error('Resume upload error:', err);
      toast.error(err.response?.data?.message || 'Failed to upload resume file.');
    } finally {
      setUploading(false);
    }
  };

  const handleManualSave = async (e) => {
    e.preventDefault();
    try {
      setSaving(true);
      await api.put('/profile', { resumeUrl });
      toast.success('Resume URL saved successfully!');
    } catch (err) {
      toast.error('Failed to update resume URL.');
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

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/90 shadow-xs">
        <div className="border-b border-slate-100 pb-5 mb-6">
          <h2 className="text-lg font-bold text-slate-900">Manage Resume Document</h2>
          <p className="text-xs text-slate-500">
            Upload your latest resume PDF or specify a cloud hosted PDF link. Changes immediately reflect in the public Resume section.
          </p>
        </div>

        {/* Upload Box */}
        <div className="border-2 border-dashed border-slate-200 rounded-2xl p-8 text-center bg-slate-50/50 hover:bg-slate-50 transition-colors mb-6">
          <div className="w-14 h-14 rounded-2xl bg-blue-50 text-blue-600 mx-auto flex items-center justify-center mb-3">
            <UploadCloud className="w-7 h-7" />
          </div>
          <h3 className="font-bold text-slate-800 text-sm mb-1">
            Upload New Resume PDF
          </h3>
          <p className="text-xs text-slate-500 mb-4 max-w-sm mx-auto">
            Select a PDF document from your computer. Max size: 15MB.
          </p>

          <label className="cursor-pointer inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs shadow-xs transition-colors">
            {uploading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Uploading PDF...
              </>
            ) : (
              <>
                <FileText className="w-4 h-4" />
                Select PDF File
              </>
            )}
            <input
              type="file"
              accept=".pdf,application/pdf"
              onChange={handleFileUpload}
              disabled={uploading}
              className="hidden"
            />
          </label>
        </div>

        {/* URL Input Form */}
        <form onSubmit={handleManualSave} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Resume URL Path (Cloud URL or /uploads/...)
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={resumeUrl}
                onChange={(e) => setResumeUrl(e.target.value)}
                placeholder="/uploads/resume-12345.pdf or https://drive.google.com/..."
                className="flex-1 px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
              />
              <button
                type="submit"
                disabled={saving}
                className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 disabled:bg-slate-400 text-white font-semibold text-xs transition-colors flex items-center gap-1.5 shrink-0"
              >
                {saving ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Save className="w-4 h-4" />
                )}
                Save URL
              </button>
            </div>
          </div>
        </form>

        {/* Current Document Preview */}
        {resumeUrl ? (
          <div className="mt-8 pt-6 border-t border-slate-100">
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                <FileText className="w-4 h-4 text-blue-600" />
                Current Active Resume
              </h4>
              <div className="flex items-center gap-2">
                <a
                  href={resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs font-semibold text-blue-600 hover:text-blue-700 bg-blue-50 px-3 py-1.5 rounded-lg"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  Open in New Tab
                </a>
                <a
                  href={resumeUrl}
                  download="Rohith_B_Resume.pdf"
                  className="inline-flex items-center gap-1 text-xs font-semibold text-slate-700 hover:text-slate-900 bg-slate-100 px-3 py-1.5 rounded-lg"
                >
                  <Download className="w-3.5 h-3.5" />
                  Download
                </a>
              </div>
            </div>

            <div className="w-full h-96 rounded-2xl border border-slate-200 bg-slate-100 overflow-hidden">
              <iframe
                src={resumeUrl}
                title="Current Resume Preview"
                className="w-full h-full border-none"
              />
            </div>
          </div>
        ) : (
          <div className="mt-6 p-4 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-800">
            No resume uploaded yet. Upload a PDF above to display it on the public site.
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageResume;
