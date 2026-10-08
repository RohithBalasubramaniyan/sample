import React, { useState, useEffect } from 'react';
import api from '../../api';
import toast from 'react-hot-toast';
import { Plus, Edit2, Trash2, Loader2, Sparkles, X } from 'lucide-react';
import DynamicIcon from '../../components/common/DynamicIcon';

const categories = ['Frontend', 'Backend', 'Database', 'Tools & DevOps', 'Languages', 'Other'];

const iconOptions = [
  'Code', 'Atom', 'Palette', 'Layout', 'Server', 'Cpu',
  'Database', 'GitBranch', 'Layers', 'Terminal', 'Globe', 'FileCode'
];

const ManageSkills = () => {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingSkill, setEditingSkill] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    category: 'Frontend',
    percentage: 75,
    icon: 'Code',
    order: 0,
  });

  const fetchSkills = async () => {
    try {
      setLoading(true);
      const res = await api.get('/skills');
      setSkills(res.data);
    } catch (err) {
      console.error('Failed to fetch skills:', err);
      toast.error('Failed to load skills.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSkills();
  }, []);

  const openAddModal = () => {
    setEditingSkill(null);
    setFormData({
      name: '',
      category: 'Frontend',
      percentage: 75,
      icon: 'Code',
      order: skills.length + 1,
    });
    setModalOpen(true);
  };

  const openEditModal = (skill) => {
    setEditingSkill(skill);
    setFormData({
      name: skill.name,
      category: skill.category || 'Frontend',
      percentage: skill.percentage ?? skill.proficiency ?? 75,
      icon: skill.icon || 'Code',
      order: skill.order || 0,
    });
    setModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setSubmitting(true);
      if (editingSkill) {
        await api.put(`/skills/${editingSkill._id}`, formData);
        toast.success('Skill updated successfully!');
      } else {
        await api.post('/skills', formData);
        toast.success('Skill added successfully!');
      }
      setModalOpen(false);
      fetchSkills();
    } catch (err) {
      console.error('Error saving skill:', err);
      toast.error(err.response?.data?.message || 'Error saving skill.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id, name) => {
    if (!window.confirm(`Are you sure you want to delete "${name}"?`)) return;

    try {
      await api.delete(`/skills/${id}`);
      toast.success('Skill removed successfully!');
      setSkills((prev) => prev.filter((s) => s._id !== id));
    } catch (err) {
      console.error('Error deleting skill:', err);
      toast.error('Failed to delete skill.');
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-3xl border border-slate-200/90 shadow-xs flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-slate-900">Technical Skills</h2>
          <p className="text-xs text-slate-500">
            Add, update, or remove technical proficiencies shown on the public site.
          </p>
        </div>
        <button
          onClick={openAddModal}
          className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs shadow-xs transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add Skill
        </button>
      </div>

      {loading ? (
        <div className="py-20 flex justify-center items-center">
          <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
        </div>
      ) : skills.length === 0 ? (
        <div className="bg-white p-12 text-center rounded-3xl border border-slate-200 text-slate-500 text-sm">
          No skills registered yet. Click "Add Skill" to create one.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {skills.map((skill) => (
            <div
              key={skill._id}
              className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between hover:border-slate-300 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                  <DynamicIcon name={skill.icon} className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">{skill.name}</h4>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-[11px] text-slate-400">{skill.category}</span>
                    <span className="text-[11px] font-semibold text-blue-600">
                      {skill.percentage ?? skill.proficiency}%
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-1">
                <button
                  onClick={() => openEditModal(skill)}
                  className="p-2 text-slate-400 hover:text-blue-600 rounded-lg transition-colors"
                  title="Edit Skill"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete(skill._id, skill.name)}
                  className="p-2 text-slate-400 hover:text-rose-600 rounded-lg transition-colors"
                  title="Delete Skill"
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
                {editingSkill ? 'Edit Skill' : 'Add New Skill'}
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
                  Skill Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. React.js, Node.js"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Category
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                >
                  {categories.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Proficiency Percentage ({formData.percentage}%)
                  </label>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={formData.percentage}
                  onChange={(e) =>
                    setFormData({ ...formData, percentage: Number(e.target.value) })
                  }
                  className="w-full accent-blue-600 cursor-pointer"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Icon
                  </label>
                  <select
                    value={formData.icon}
                    onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
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
                  {submitting ? 'Saving...' : editingSkill ? 'Update Skill' : 'Create Skill'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageSkills;
