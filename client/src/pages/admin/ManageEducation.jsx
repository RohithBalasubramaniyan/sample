import React, { useState, useEffect } from 'react';
import api from '../../api';
import toast from 'react-hot-toast';
import { Plus, Edit2, Trash2, GraduationCap, Loader2, X, Calendar } from 'lucide-react';

const ManageEducation = () => {
  const [education, setEducation] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    degree: '',
    institution: '',
    department: '',
    cgpa: '',
    university: '',
    startYear: '',
    endYear: '',
    year: '',
    description: '',
    order: 0,
  });

  const fetchEducation = async () => {
    try {
      setLoading(true);
      const res = await api.get('/education');
      setEducation(res.data);
    } catch (err) {
      console.error('Failed to fetch education records:', err);
      toast.error('Failed to load education records.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEducation();
  }, []);

  const openAddModal = () => {
    setEditingItem(null);
    setFormData({
      degree: '',
      institution: '',
      department: '',
      cgpa: '',
      university: '',
      startYear: '',
      endYear: '',
      year: '',
      description: '',
      order: education.length + 1,
    });
    setModalOpen(true);
  };

  const openEditModal = (item) => {
    setEditingItem(item);
    setFormData({
      degree: item.degree,
      institution: item.institution,
      department: item.department || '',
      cgpa: item.cgpa || item.grade || '',
      university: item.university || '',
      startYear: item.startYear || '',
      endYear: item.endYear || '',
      year: item.year || '',
      description: item.description || '',
      order: item.order || 0,
    });
    setModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setSubmitting(true);
      if (editingItem) {
        await api.put(`/education/${editingItem._id}`, formData);
        toast.success('Education record updated!');
      } else {
        await api.post('/education', formData);
        toast.success('Education record added!');
      }
      setModalOpen(false);
      fetchEducation();
    } catch (err) {
      console.error('Error saving education:', err);
      toast.error(err.response?.data?.message || 'Error saving education record.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id, title) => {
    if (!window.confirm(`Are you sure you want to delete "${title}"?`)) return;

    try {
      await api.delete(`/education/${id}`);
      toast.success('Education record removed!');
      setEducation((prev) => prev.filter((item) => item._id !== id));
    } catch (err) {
      console.error('Error deleting record:', err);
      toast.error('Failed to delete education record.');
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-3xl border border-slate-200/90 shadow-xs flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-slate-900">Education Timeline</h2>
          <p className="text-xs text-slate-500">
            Manage your degrees, colleges, university affiliations, and graduation years.
          </p>
        </div>
        <button
          onClick={openAddModal}
          className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs shadow-xs transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add Education
        </button>
      </div>

      {loading ? (
        <div className="py-20 flex justify-center items-center">
          <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
        </div>
      ) : education.length === 0 ? (
        <div className="bg-white p-12 text-center rounded-3xl border border-slate-200 text-slate-500 text-sm">
          No education history recorded yet.
        </div>
      ) : (
        <div className="space-y-4">
          {education.map((item) => (
            <div
              key={item._id}
              className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
            >
              <div className="space-y-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="font-bold text-slate-900 text-base">{item.degree}</h3>
                  {item.department && (
                    <span className="text-xs font-medium text-slate-600">({item.department})</span>
                  )}
                  {item.cgpa && (
                    <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                      CGPA: {item.cgpa}
                    </span>
                  )}
                  <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
                    <Calendar className="w-3 h-3" />
                    {item.year || `${item.startYear} - ${item.endYear}`}
                  </span>
                </div>
                <p className="text-xs font-semibold text-slate-700">{item.institution}</p>
                {item.university && (
                  <p className="text-[11px] text-slate-500">Affiliated to {item.university}</p>
                )}
                {item.description && (
                  <p className="text-xs text-slate-600 pt-1 max-w-2xl">{item.description}</p>
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
                  onClick={() => handleDelete(item._id, item.degree)}
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
                {editingItem ? 'Edit Education Record' : 'Add Education Record'}
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
                  Degree / Program
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. B.Tech in Information Technology"
                  value={formData.degree}
                  onChange={(e) => setFormData({ ...formData, degree: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Institution / College
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. School of Engineering & Technology"
                  value={formData.institution}
                  onChange={(e) =>
                    setFormData({ ...formData, institution: e.target.value })
                  }
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Department / Major
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Information Technology"
                    value={formData.department}
                    onChange={(e) =>
                      setFormData({ ...formData, department: e.target.value })
                    }
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    CGPA / Grade
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 8.85 CGPA or Distinction"
                    value={formData.cgpa}
                    onChange={(e) =>
                      setFormData({ ...formData, cgpa: e.target.value })
                    }
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  University / Board
                </label>
                <input
                  type="text"
                  placeholder="e.g. Visvesvaraya Technological University"
                  value={formData.university}
                  onChange={(e) =>
                    setFormData({ ...formData, university: e.target.value })
                  }
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Start Year
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="2022"
                    value={formData.startYear}
                    onChange={(e) =>
                      setFormData({ ...formData, startYear: e.target.value })
                    }
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    End Year
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="2026"
                    value={formData.endYear}
                    onChange={(e) =>
                      setFormData({ ...formData, endYear: e.target.value })
                    }
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Description / Relevant Coursework
                </label>
                <textarea
                  rows="3"
                  placeholder="Specializations, CGPA, notable coursework..."
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
                  {submitting ? 'Saving...' : editingItem ? 'Update' : 'Add Record'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageEducation;
