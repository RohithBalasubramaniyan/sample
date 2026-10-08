import React, { useState, useEffect } from 'react';
import api from '../../api';
import toast from 'react-hot-toast';
import { Plus, Edit2, Trash2, Share2, ExternalLink, Loader2, X } from 'lucide-react';
import DynamicIcon from '../../components/common/DynamicIcon';

const iconOptions = ['Github', 'Linkedin', 'Instagram', 'Twitter', 'Mail', 'Globe', 'Laptop', 'Code'];

const ManageSocialLinks = () => {
  const [socialLinks, setSocialLinks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    platform: '',
    url: '',
    icon: 'Globe',
    order: 0,
  });

  const fetchLinks = async () => {
    try {
      setLoading(true);
      const res = await api.get('/social-links');
      setSocialLinks(res.data);
    } catch (err) {
      console.error('Failed to load social links:', err);
      toast.error('Failed to retrieve social links.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLinks();
  }, []);

  const openAddModal = () => {
    setEditingItem(null);
    setFormData({
      platform: '',
      url: '',
      icon: 'Globe',
      order: socialLinks.length + 1,
    });
    setModalOpen(true);
  };

  const openEditModal = (item) => {
    setEditingItem(item);
    setFormData({
      platform: item.platform,
      url: item.url,
      icon: item.icon || 'Globe',
      order: item.order || 0,
    });
    setModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setSubmitting(true);
      if (editingItem) {
        await api.put(`/social-links/${editingItem._id}`, formData);
        toast.success('Social link updated!');
      } else {
        await api.post('/social-links', formData);
        toast.success('Social link created!');
      }
      setModalOpen(false);
      fetchLinks();
    } catch (err) {
      console.error('Error saving link:', err);
      toast.error(err.response?.data?.message || 'Error saving link.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id, platform) => {
    if (!window.confirm(`Delete ${platform} link?`)) return;

    try {
      await api.delete(`/social-links/${id}`);
      toast.success('Social link deleted.');
      setSocialLinks((prev) => prev.filter((item) => item._id !== id));
    } catch (err) {
      console.error('Error deleting link:', err);
      toast.error('Failed to delete social link.');
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-3xl border border-slate-200/90 shadow-xs flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-slate-900">Social Media & Profiles</h2>
          <p className="text-xs text-slate-500">
            Manage links to your GitHub, LinkedIn, Twitter/X, email, and developer profiles.
          </p>
        </div>
        <button
          onClick={openAddModal}
          className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs shadow-xs transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add Social Link
        </button>
      </div>

      {loading ? (
        <div className="py-20 flex justify-center items-center">
          <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
        </div>
      ) : socialLinks.length === 0 ? (
        <div className="bg-white p-12 text-center rounded-3xl border border-slate-200 text-slate-500 text-sm">
          No social links configured yet.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {socialLinks.map((item) => (
            <div
              key={item._id}
              className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between hover:border-slate-300 transition-colors"
            >
              <div className="flex items-center gap-3 truncate pr-2">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                  <DynamicIcon name={item.icon || item.platform} className="w-5 h-5" />
                </div>
                <div className="truncate">
                  <h4 className="font-bold text-slate-900 text-sm">{item.platform}</h4>
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[11px] text-slate-400 hover:text-blue-600 truncate block flex items-center gap-1"
                  >
                    <ExternalLink className="w-3 h-3 shrink-0" />
                    <span className="truncate">{item.url}</span>
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-1 shrink-0">
                <button
                  onClick={() => openEditModal(item)}
                  className="p-1.5 text-slate-400 hover:text-blue-600 rounded-lg"
                  title="Edit Link"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete(item._id, item.platform)}
                  className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg"
                  title="Delete Link"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal Dialog */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-5">
              <h3 className="font-bold text-base text-slate-900">
                {editingItem ? 'Edit Social Link' : 'Add Social Link'}
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
                  Platform Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. GitHub, LinkedIn, Twitter / X"
                  value={formData.platform}
                  onChange={(e) =>
                    setFormData({ ...formData, platform: e.target.value })
                  }
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Profile URL
                </label>
                <input
                  type="url"
                  required
                  placeholder="https://..."
                  value={formData.url}
                  onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Icon
                  </label>
                  <select
                    value={formData.icon}
                    onChange={(e) =>
                      setFormData({ ...formData, icon: e.target.value })
                    }
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                  >
                    {iconOptions.map((ico) => (
                      <option key={ico} value={ico}>
                        {ico}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Display Order
                  </label>
                  <input
                    type="number"
                    value={formData.order}
                    onChange={(e) =>
                      setFormData({ ...formData, order: Number(e.target.value) })
                    }
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                  />
                </div>
              </div>

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
                  {submitting ? 'Saving...' : editingItem ? 'Update' : 'Add Link'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageSocialLinks;
