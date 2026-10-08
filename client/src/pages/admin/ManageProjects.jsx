import React, { useState, useEffect } from 'react';
import api from '../../api';
import toast from 'react-hot-toast';
import { Plus, Edit2, Trash2, Star, ExternalLink, Loader2, X } from 'lucide-react';
import { Github } from '../../components/common/BrandIcons';
import ImageUploadInput from '../../components/admin/ImageUploadInput';


const categories = ['Full Stack', 'Frontend', 'Backend', 'Mobile', 'UI/UX', 'Other'];

const ManageProjects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image: '',
    technologies: '',
    category: 'Full Stack',
    githubUrl: '',
    liveUrl: '',
    featured: false,
    order: 0,
  });

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const res = await api.get('/projects');
      setProjects(res.data);
    } catch (err) {
      console.error('Failed to fetch projects:', err);
      toast.error('Failed to load projects.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const openAddModal = () => {
    setEditingProject(null);
    setFormData({
      title: '',
      description: '',
      image: '',
      technologies: '',
      category: 'Full Stack',
      githubUrl: '',
      liveUrl: '',
      featured: false,
      order: projects.length + 1,
    });
    setModalOpen(true);
  };

  const openEditModal = (project) => {
    setEditingProject(project);
    setFormData({
      title: project.title,
      description: project.description,
      image: project.image || '',
      technologies: Array.isArray(project.technologies)
        ? project.technologies.join(', ')
        : '',
      category: project.category || 'Full Stack',
      githubUrl: project.githubUrl || '',
      liveUrl: project.liveUrl || '',
      featured: !!project.featured,
      order: project.order || 0,
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

      if (editingProject) {
        await api.put(`/projects/${editingProject._id}`, payload);
        toast.success('Project updated successfully!');
      } else {
        await api.post('/projects', payload);
        toast.success('Project created successfully!');
      }
      setModalOpen(false);
      fetchProjects();
    } catch (err) {
      console.error('Error saving project:', err);
      toast.error(err.response?.data?.message || 'Error saving project.');
    } finally {
      setSubmitting(false);
    }
  };

  const toggleFeatured = async (project) => {
    try {
      const res = await api.put(`/projects/${project._id}`, {
        featured: !project.featured,
      });
      toast.success(
        res.data.featured ? 'Marked as Featured!' : 'Removed from Featured'
      );
      setProjects((prev) =>
        prev.map((p) => (p._id === project._id ? res.data : p))
      );
    } catch (err) {
      toast.error('Failed to toggle featured status.');
    }
  };

  const handleDelete = async (id, title) => {
    if (!window.confirm(`Are you sure you want to delete "${title}"?`)) return;

    try {
      await api.delete(`/projects/${id}`);
      toast.success('Project removed successfully!');
      setProjects((prev) => prev.filter((p) => p._id !== id));
    } catch (err) {
      console.error('Error deleting project:', err);
      toast.error('Failed to delete project.');
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-3xl border border-slate-200/90 shadow-xs flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-slate-900">Portfolio Projects</h2>
          <p className="text-xs text-slate-500">
            Showcase your best engineering and development work with links, tags, and images.
          </p>
        </div>
        <button
          onClick={openAddModal}
          className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs shadow-xs transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add Project
        </button>
      </div>

      {loading ? (
        <div className="py-20 flex justify-center items-center">
          <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
        </div>
      ) : projects.length === 0 ? (
        <div className="bg-white p-12 text-center rounded-3xl border border-slate-200 text-slate-500 text-sm">
          No projects added yet. Click "Add Project" to add your first work.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project) => (
            <div
              key={project._id}
              className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:border-slate-300 transition-all flex flex-col justify-between"
            >
              <div>
                {/* Image preview / banner */}
                <div className="relative aspect-video bg-slate-100 border-b border-slate-100 overflow-hidden">
                  {project.image ? (
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-xs font-semibold text-slate-400 bg-slate-100">
                      No Image Provided
                    </div>
                  )}

                  <button
                    onClick={() => toggleFeatured(project)}
                    className={`absolute top-2.5 left-2.5 px-2.5 py-1 rounded-lg text-xs font-bold flex items-center gap-1 shadow-sm transition-colors ${
                      project.featured
                        ? 'bg-blue-600 text-white'
                        : 'bg-white/90 text-slate-600 hover:text-blue-600'
                    }`}
                    title="Click to toggle featured"
                  >
                    <Star
                      className={`w-3.5 h-3.5 ${
                        project.featured ? 'fill-current' : ''
                      }`}
                    />
                    {project.featured ? 'Featured' : 'Mark Featured'}
                  </button>
                  <div className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded-md bg-white/90 text-[10px] font-semibold text-slate-700">
                    {project.category}
                  </div>
                </div>

                <div className="p-5">
                  <h3 className="font-bold text-slate-900 text-base mb-1.5">
                    {project.title}
                  </h3>
                  <p className="text-slate-600 text-xs leading-relaxed line-clamp-2 mb-3">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-1 mb-4">
                    {project.technologies?.map((tech, i) => (
                      <span
                        key={i}
                        className="px-2 py-0.5 rounded bg-slate-100 text-slate-600 text-[11px] font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="px-5 py-3.5 border-t border-slate-100 flex items-center justify-between bg-slate-50/50">
                <div className="flex items-center gap-3">
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-slate-500 hover:text-slate-800 text-xs font-medium flex items-center gap-1"
                    >
                      <Github className="w-3.5 h-3.5" />
                      Repo
                    </a>
                  )}
                  {project.liveUrl && project.liveUrl !== '#' && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-700 text-xs font-semibold flex items-center gap-1"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      Live
                    </a>
                  )}
                </div>

                <div className="flex items-center gap-1">
                  <button
                    onClick={() => openEditModal(project)}
                    className="p-1.5 text-slate-400 hover:text-blue-600 rounded-lg"
                    title="Edit"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(project._id, project.title)}
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
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl my-8 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-5">
              <h3 className="font-bold text-base text-slate-900">
                {editingProject ? 'Edit Project' : 'Add New Project'}
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
                  Project Title
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. CloudVault File System"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Description
                </label>
                <textarea
                  rows="3"
                  required
                  placeholder="Detailed description of features, engineering challenges, architecture..."
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                />
              </div>

              <ImageUploadInput
                label="Project Screenshot / Banner"
                value={formData.image}
                onChange={(url) => setFormData({ ...formData, image: url })}
              />

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Category
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) =>
                      setFormData({ ...formData, category: e.target.value })
                    }
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

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Technologies (comma-separated)
                </label>
                <input
                  type="text"
                  placeholder="React.js, Node.js, Express, MongoDB, Tailwind"
                  value={formData.technologies}
                  onChange={(e) =>
                    setFormData({ ...formData, technologies: e.target.value })
                  }
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    GitHub URL
                  </label>
                  <input
                    type="url"
                    placeholder="https://github.com/..."
                    value={formData.githubUrl}
                    onChange={(e) =>
                      setFormData({ ...formData, githubUrl: e.target.value })
                    }
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Live Demo URL
                  </label>
                  <input
                    type="url"
                    placeholder="https://..."
                    value={formData.liveUrl}
                    onChange={(e) =>
                      setFormData({ ...formData, liveUrl: e.target.value })
                    }
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="featuredCheck"
                  checked={formData.featured}
                  onChange={(e) =>
                    setFormData({ ...formData, featured: e.target.checked })
                  }
                  className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500 cursor-pointer"
                />
                <label
                  htmlFor="featuredCheck"
                  className="text-xs font-semibold text-slate-700 cursor-pointer"
                >
                  Highlight as Featured Project on Home Page
                </label>
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
                  {submitting
                    ? 'Saving...'
                    : editingProject
                    ? 'Update Project'
                    : 'Create Project'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageProjects;
