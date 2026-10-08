import React, { useState, useEffect } from 'react';
import api from '../../api';
import toast from 'react-hot-toast';
import { Plus, Edit2, Trash2, Award, ExternalLink, Loader2, X, Calendar } from 'lucide-react';
import ImageUploadInput from '../../components/admin/ImageUploadInput';

const ManageCertifications = () => {
  const [certifications, setCertifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    organization: '',
    issueDate: '',
    credentialId: '',
    certificateUrl: '',
    image: '',
    order: 0,
  });

  const fetchCertifications = async () => {
    try {
      setLoading(true);
      const res = await api.get('/certifications');
      setCertifications(res.data);
    } catch (err) {
      console.error('Failed to fetch certifications:', err);
      toast.error('Failed to load certifications.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCertifications();
  }, []);

  const openAddModal = () => {
    setEditingItem(null);
    setFormData({
      name: '',
      organization: '',
      issueDate: '',
      credentialId: '',
      certificateUrl: '',
      image: '',
      order: certifications.length + 1,
    });
    setModalOpen(true);
  };

  const openEditModal = (item) => {
    setEditingItem(item);
    setFormData({
      name: item.name,
      organization: item.organization,
      issueDate: item.issueDate,
      credentialId: item.credentialId || '',
      certificateUrl: item.certificateUrl || '',
      image: item.image || '',
      order: item.order || 0,
    });
    setModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setSubmitting(true);
      if (editingItem) {
        await api.put(`/certifications/${editingItem._id}`, formData);
        toast.success('Certification updated!');
      } else {
        await api.post('/certifications', formData);
        toast.success('Certification created!');
      }
      setModalOpen(false);
      fetchCertifications();
    } catch (err) {
      console.error('Error saving certification:', err);
      toast.error(err.response?.data?.message || 'Error saving certification.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id, name) => {
    if (!window.confirm(`Are you sure you want to delete "${name}"?`)) return;

    try {
      await api.delete(`/certifications/${id}`);
      toast.success('Certification removed!');
      setCertifications((prev) => prev.filter((item) => item._id !== id));
    } catch (err) {
      console.error('Error deleting certification:', err);
      toast.error('Failed to delete certification.');
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-3xl border border-slate-200/90 shadow-xs flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-slate-900">Licenses & Certifications</h2>
          <p className="text-xs text-slate-500">
            Add credential IDs, issuing bodies, dates, and verification links.
          </p>
        </div>
        <button
          onClick={openAddModal}
          className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs shadow-xs transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add Certification
        </button>
      </div>

      {loading ? (
        <div className="py-20 flex justify-center items-center">
          <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
        </div>
      ) : certifications.length === 0 ? (
        <div className="bg-white p-12 text-center rounded-3xl border border-slate-200 text-slate-500 text-sm">
          No certifications recorded yet.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {certifications.map((item) => (
            <div
              key={item._id}
              className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                    <Award className="w-5 h-5" />
                  </div>
                  {item.image && (
                    <img
                      src={item.image}
                      alt={item.organization}
                      className="h-6 max-w-[80px] object-contain"
                    />
                  )}
                </div>

                <h3 className="font-bold text-slate-900 text-sm leading-snug mb-1">
                  {item.name}
                </h3>
                <p className="text-xs font-semibold text-slate-600 mb-2">
                  {item.organization}
                </p>

                <div className="space-y-1 text-[11px] text-slate-400">
                  <p className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    Issued: {item.issueDate}
                  </p>
                  {item.credentialId && (
                    <p className="font-mono">ID: {item.credentialId}</p>
                  )}
                </div>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                {item.certificateUrl ? (
                  <a
                    href={item.certificateUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-700 text-xs font-semibold inline-flex items-center gap-1"
                  >
                    <ExternalLink className="w-3 h-3" />
                    Verify
                  </a>
                ) : (
                  <span className="text-[11px] text-slate-400">No link</span>
                )}

                <div className="flex items-center gap-1">
                  <button
                    onClick={() => openEditModal(item)}
                    className="p-1.5 text-slate-400 hover:text-blue-600 rounded-lg"
                    title="Edit"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(item._id, item.name)}
                    className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg"
                    title="Delete"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal Dialog */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-5">
              <h3 className="font-bold text-base text-slate-900">
                {editingItem ? 'Edit Certification' : 'Add Certification'}
              </h3>
              <button
                onClick={() => setModalOpen(false)}
                className="text-slate-400 hover:text-slate-700 p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Certification Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Meta Front-End Developer"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Issuing Organization
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Coursera / Meta, freeCodeCamp"
                  value={formData.organization}
                  onChange={(e) =>
                    setFormData({ ...formData, organization: e.target.value })
                  }
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Issue Date
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Aug 2024"
                    value={formData.issueDate}
                    onChange={(e) =>
                      setFormData({ ...formData, issueDate: e.target.value })
                    }
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Credential ID
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. UC-88912-A"
                    value={formData.credentialId}
                    onChange={(e) =>
                      setFormData({ ...formData, credentialId: e.target.value })
                    }
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Certificate Verification URL
                </label>
                <input
                  type="url"
                  placeholder="https://..."
                  value={formData.certificateUrl}
                  onChange={(e) =>
                    setFormData({ ...formData, certificateUrl: e.target.value })
                  }
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                />
              </div>

              <ImageUploadInput
                label="Certificate Badge / Issuer Logo"
                value={formData.image}
                onChange={(url) => setFormData({ ...formData, image: url })}
              />

              <div className="pt-3 border-t border-slate-100 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold text-xs shadow-xs"
                >
                  {submitting ? 'Saving...' : editingItem ? 'Update' : 'Add Certification'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageCertifications;
