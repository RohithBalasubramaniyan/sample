import React, { useState, useEffect, useMemo } from 'react';
import api from '../../api';
import toast from 'react-hot-toast';
import { Mail, Search, Trash2, Eye, CheckCircle2, Clock, Loader2, X, RefreshCw } from 'lucide-react';

const ManageMessages = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMessage, setSelectedMessage] = useState(null);

  const fetchMessages = async () => {
    try {
      setLoading(true);
      const res = await api.get('/messages');
      setMessages(res.data);
    } catch (err) {
      console.error('Failed to load messages:', err);
      toast.error('Failed to retrieve contact messages.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const handleToggleRead = async (msg) => {
    try {
      const res = await api.patch(`/messages/${msg._id}/read`, { read: !msg.read });
      setMessages((prev) =>
        prev.map((m) => (m._id === msg._id ? { ...m, read: res.data.read } : m))
      );
    } catch (err) {
      toast.error('Failed to update status.');
    }
  };

  const handleOpenMessage = async (msg) => {
    setSelectedMessage(msg);
    if (!msg.read) {
      handleToggleRead(msg);
    }
  };

  const handleDelete = async (id, name) => {
    if (!window.confirm(`Delete message from "${name}"?`)) return;

    try {
      await api.delete(`/messages/${id}`);
      toast.success('Message deleted.');
      setMessages((prev) => prev.filter((m) => m._id !== id));
      if (selectedMessage?._id === id) {
        setSelectedMessage(null);
      }
    } catch (err) {
      console.error('Error deleting message:', err);
      toast.error('Failed to delete message.');
    }
  };

  const filteredMessages = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return messages;

    return messages.filter(
      (m) =>
        m.name.toLowerCase().includes(q) ||
        m.email.toLowerCase().includes(q) ||
        m.subject.toLowerCase().includes(q) ||
        m.message.toLowerCase().includes(q)
    );
  }, [messages, searchQuery]);

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-3xl border border-slate-200/90 shadow-xs flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-slate-900">Contact Messages</h2>
          <p className="text-xs text-slate-500">
            Messages and project inquiries submitted from the public portfolio contact form.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* Search box */}
          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search sender, subject..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
            />
          </div>

          <button
            onClick={fetchMessages}
            className="p-2 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 transition-colors"
            title="Refresh"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {loading ? (
        <div className="py-20 flex justify-center items-center">
          <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
        </div>
      ) : filteredMessages.length === 0 ? (
        <div className="bg-white p-12 text-center rounded-3xl border border-slate-200 text-slate-500 text-sm">
          {searchQuery ? 'No messages match your search filter.' : 'Your inbox is empty. No messages received yet.'}
        </div>
      ) : (
        <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50/70 text-slate-500 uppercase tracking-wider font-semibold text-[11px]">
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4">Sender</th>
                  <th className="py-3.5 px-4">Subject</th>
                  <th className="py-3.5 px-4">Message Snippet</th>
                  <th className="py-3.5 px-4">Date</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredMessages.map((msg) => (
                  <tr
                    key={msg._id}
                    className={`hover:bg-slate-50/80 transition-colors ${
                      !msg.read ? 'bg-blue-50/30 font-semibold' : ''
                    }`}
                  >
                    <td className="py-3.5 px-4">
                      <button
                        onClick={() => handleToggleRead(msg)}
                        className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold transition-colors ${
                          msg.read
                            ? 'bg-slate-100 text-slate-500 hover:bg-slate-200'
                            : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
                        }`}
                        title="Click to toggle read status"
                      >
                        {msg.read ? 'Read' : 'New'}
                      </button>
                    </td>

                    <td className="py-3.5 px-4">
                      <div className="text-slate-900 font-bold">{msg.name}</div>
                      <a
                        href={`mailto:${msg.email}`}
                        className="text-[11px] text-slate-500 hover:text-blue-600"
                      >
                        {msg.email}
                      </a>
                    </td>

                    <td className="py-3.5 px-4 max-w-xs truncate text-slate-800">
                      {msg.subject}
                    </td>

                    <td className="py-3.5 px-4 max-w-sm truncate text-slate-500">
                      {msg.message}
                    </td>

                    <td className="py-3.5 px-4 text-slate-400 whitespace-nowrap text-[11px]">
                      {new Date(msg.createdAt).toLocaleDateString(undefined, {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </td>

                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={() => handleOpenMessage(msg)}
                          className="p-1.5 text-slate-400 hover:text-blue-600 rounded-lg"
                          title="View Message"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(msg._id, msg.name)}
                          className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg"
                          title="Delete Message"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Message Detail View Modal */}
      {selectedMessage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-5">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-blue-600">
                  Message Details
                </span>
                <h3 className="font-bold text-base text-slate-900 mt-0.5">
                  {selectedMessage.subject}
                </h3>
              </div>
              <button
                onClick={() => setSelectedMessage(null)}
                className="text-slate-400 hover:text-slate-700 p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-between">
                <div>
                  <p className="font-bold text-slate-900 text-xs">{selectedMessage.name}</p>
                  <a
                    href={`mailto:${selectedMessage.email}`}
                    className="text-xs text-blue-600 hover:underline"
                  >
                    {selectedMessage.email}
                  </a>
                </div>
                <span className="text-[11px] text-slate-400">
                  {new Date(selectedMessage.createdAt).toLocaleString()}
                </span>
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                  Message Content
                </label>
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 text-sm text-slate-800 leading-relaxed whitespace-pre-wrap max-h-60 overflow-y-auto">
                  {selectedMessage.message}
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <a
                  href={`mailto:${selectedMessage.email}?subject=Re: ${encodeURIComponent(
                    selectedMessage.subject
                  )}`}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs shadow-xs"
                >
                  <Mail className="w-3.5 h-3.5" />
                  Reply via Email
                </a>

                <button
                  onClick={() => handleDelete(selectedMessage._id, selectedMessage.name)}
                  className="p-2 text-rose-500 hover:text-rose-700 hover:bg-rose-50 rounded-xl text-xs font-semibold flex items-center gap-1"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageMessages;
