import React, { useState } from 'react';
import { UploadCloud, Loader2, Image as ImageIcon, X } from 'lucide-react';
import api from '../../api';
import toast from 'react-hot-toast';

const ImageUploadInput = ({ value, onChange, label = 'Image' }) => {
  const [uploading, setUploading] = useState(false);

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    try {
      setUploading(true);
      const res = await api.post('/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      onChange(res.data.url);
      toast.success('Image uploaded successfully!');
    } catch (err) {
      console.error('Upload failed:', err);
      toast.error(err.response?.data?.message || 'Image upload failed.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-2">
      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
        {label}
      </label>

      <div className="flex flex-col sm:flex-row gap-4 items-start">
        {/* Preview box */}
        <div className="relative w-28 h-28 rounded-xl border-2 border-dashed border-slate-200 bg-slate-50 flex items-center justify-center overflow-hidden shrink-0">
          {value ? (
            <>
              <img
                src={value}
                alt="Upload preview"
                className="w-full h-full object-cover"
              />
              <button
                type="button"
                onClick={() => onChange('')}
                className="absolute top-1 right-1 p-1 rounded-full bg-slate-900/70 text-white hover:bg-rose-600 transition-colors"
                title="Remove image"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </>
          ) : (
            <div className="text-center p-2">
              <ImageIcon className="w-6 h-6 text-slate-300 mx-auto mb-1" />
              <span className="text-[10px] text-slate-400">No Image</span>
            </div>
          )}
        </div>

        {/* Upload controls */}
        <div className="flex-1 w-full space-y-2">
          <div className="flex items-center gap-3">
            <label className="cursor-pointer inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 text-xs font-semibold shadow-xs transition-colors">
              {uploading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-blue-600" />
                  Uploading...
                </>
              ) : (
                <>
                  <UploadCloud className="w-4 h-4 text-blue-600" />
                  Choose File to Upload
                </>
              )}
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                disabled={uploading}
                className="hidden"
              />
            </label>
            <span className="text-xs text-slate-400">or enter image URL below</span>
          </div>

          <input
            type="text"
            placeholder="https://example.com/image.jpg or /uploads/..."
            value={value || ''}
            onChange={(e) => onChange(e.target.value)}
            className="w-full px-3.5 py-2 rounded-xl bg-white border border-slate-200 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
          />
        </div>
      </div>
    </div>
  );
};

export default ImageUploadInput;
