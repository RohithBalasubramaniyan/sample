import React, { useState, useEffect } from 'react';
import api from '../../api';
import toast from 'react-hot-toast';
import { Plus, Edit2, Trash2, Briefcase, Loader2, X, Calendar } from 'lucide-react';

const ManageExperience = () => {
  const [experience, setExperience] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    company: '',
    position: '',
    startDate: '',
    endDate: 'Present',
    certificateUrl: '',
    description: '',
    technologies: '',
    order: 0,
  });

  const fetchExperience = async () => {
    try {
      setLoading(true);
      const res = await api.get('/experience');
      setExperience(res.data);
    } catch (err) {
      console.error('Failed to fetch experiences:', err);
      toast.error('Failed to load experience records.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExperience();
  }, []);

  const openAddModal = () => {
    setEditingItem(null);
    setFormData({
      company: '',
      position: '',
      startDate: '',
      endDate: 'Present',
      certificateUrl: '',
      description: '',
      technologies: '',
      order: experience.length + 1,
    });
    setModalOpen(true);
  };

  const openEditModal = (item) => {
    setEditingItem(item);
    setFormData({
      company: item.company,
      position: item.position || item.role || '',
      startDate: item.startDate || item.duration || '',
      endDate: item.endDate || 'Present',
      certificateUrl: item.certificateUrl || '',
      description: item.description || '',
      technologies: Array.isArray(item.technologies)
        ? item.technologies.join(', ')
        : '',
      order: item.order || 0,
    });
    setModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setSubmitting(true);
      const payload = {
        ...formData,
        technologies: formData.technologies
          ? formData.technologies.split(',').map((t) => t.trim()).filter(Boolean)
          : [],
      };

      if (editingItem) {
        await api.put(`/experience/${editingItem._id}`, payload);
        toast.success('Experience record updated!');
      } else {
        await api.post('/experience', payload);
        toast.success('Experience record added!');
      }
      setModalOpen(false);
      fetchExperience();
    } catch (err) {
      console.error('Error saving experience:', err);
      toast.error(err.response?.data?.message || 'Error saving experience record.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id, position) => {
    if (!window.confirm(`Are you sure you want to delete "${position}"?`)) return;

    try {
      await api.delete(`/experience/${id}`);
      toast.success('Experience record removed!');
      setExperience((prev) => prev.filter((item) => item._id !== id));
    } catch (err) {
      console.error('Error deleting experience:', err);
      toast.error('Failed to delete experience record.');
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-3xl border border-slate-200/90 shadow-xs flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-slate-900">Work Experience</h2>
          <p className="text-xs text-slate-500">
            Manage internships, freelance contracts, or technical job history.
          </p>
        </div>
        <button
          onClick={openAddModal}
          className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs shadow-xs transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add Experience
        </button>
      </div>

      {loading ? (
        <div className="py-20 flex justify-center items-center">
          <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
        </div>
      ) : experience.length === 0 ? (
        <div className="bg-white p-12 text-center rounded-3xl border border-slate-200 text-slate-500 text-sm">
          No experience records yet. The public site will show "Currently seeking internship opportunities."
        </div>
      ) : (
        <div className="space-y-4">
          {experience.map((item) => (
            <div
              key={item._id}
              className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-slate-900 text-base">{item.position}</h3>
                  <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
                    <Calendar className="w-3 h-3" />
                    {item.startDate} - {item.endDate}
                  </span>
                </div>
                <p className="text-xs font-semibold text-slate-700">{item.company}</p>
                {item.description && (
                  <p className="text-xs text-slate-600 pt-1 max-w-2xl">{item.description}</p>
                )}
                {item.technologies?.length > 0 && (
                  <div className="flex flex-wrap gap-1 pt-2">
                    {item.technologies.map((t, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 rounded bg-slate-100 text-slate-600 text-[10px] font-medium"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <div className="flex items-center gap-1 shrink-0">
                <button
                  onClick={() => openEditModal(item)}
                  className="p-2 text-slate-400 hover:text-blue-600 rounded-lg"
                  title="Edit Record"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete(item._id, item.position)}
                  className="p-2 text-slate-400 hover:text-rose-600 rounded-lg"
                  title="Delete Record"
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
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-5">
              <h3 className="font-bold text-base text-slate-900">
                {editingItem ? 'Edit Experience' : 'Add Experience'}
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
                  Position / Role
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Web Development Intern"
                  value={formData.position}
                  onChange={(e) =>
                    setFormData({ ...formData, position: e.target.value })
                  }
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Company / Organization
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Acme Tech Solutions"
                  value={formData.company}
                  onChange={(e) =>
                    setFormData({ ...formData, company: e.target.value })
                  }
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Start Date
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Jun 2024"
                    value={formData.startDate}
                    onChange={(e) =>
                      setFormData({ ...formData, startDate: e.target.value })
                    }
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    End Date
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Present or Aug 2024"
                    value={formData.endDate}
                    onChange={(e) =>
                      setFormData({ ...formData, endDate: e.target.value })
                    }
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Certificate / Offer Letter Link (optional)
                </label>
                <input
                  type="text"
                  placeholder="https://example.com/certificate or /uploads/..."
                  value={formData.certificateUrl}
                  onChange={(e) =>
                    setFormData({ ...formData, certificateUrl: e.target.value })
                  }
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Technologies Used (comma-separated)
                </label>
                <input
                  type="text"
                  placeholder="React, Express, Tailwind, Git"
                  value={formData.technologies}
                  onChange={(e) =>
                    setFormData({ ...formData, technologies: e.target.value })
                  }
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Description / Responsibilities
                </label>
                <textarea
                  rows="3"
                  placeholder="Key contributions and achievements..."
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                />
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
                  {submitting ? 'Saving...' : editingItem ? 'Update' : 'Add Experience'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageExperience;
