import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, Loader2, Sparkles, MessageSquare } from 'lucide-react';
import api from '../../api';
import toast from 'react-hot-toast';

const ContactSection = ({ contact, personal, profile }) => {
  const contactData = contact || {};
  const personalData = personal || profile || {};

  const email = contactData.email || personalData.email || 'rohithb.dev@gmail.com';
  const phone = contactData.phone || personalData.phone || '';
  const location = contactData.location || personalData.location || 'India';
  const description =
    contactData.description ||
    "Interested in working together or have an opportunity? Drop a message below.";

  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      toast.error('Please fill in required fields.');
      return;
    }
    try {
      setSubmitting(true);
      const res = await api.post('/messages', {
        ...formData,
        subject: formData.subject || 'Portfolio Inquiry',
      });
      toast.success(res.data.message || 'Message transmitted successfully!');
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (err) {
      toast.error(err.response?.data?.message || 'Transmission failed. Try direct email.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 px-6 lg:px-12 relative overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-5xl mx-auto z-10 relative">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/40 border border-cyan-500/30 text-cyan-300 text-xs uppercase tracking-widest font-mono mb-3">
            <MessageSquare className="w-3 h-3 text-cyan-400" />
            <span>08 // Get In Touch</span>
          </div>
          <h2 className="text-4xl sm:text-6xl font-black uppercase tracking-tight text-white">
            Send A <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">Message</span>
          </h2>
          <p className="mt-3 text-slate-400 text-sm sm:text-base">
            {description}
          </p>
        </div>

        {/* Contact Form Card (Dribbble Signature Style) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="rounded-3xl bg-[#0E0E28]/80 backdrop-blur-2xl border border-purple-500/25 p-8 sm:p-12 shadow-[0_12px_40px_rgba(0,0,0,0.6)]"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              
              {/* Name */}
              <div className="space-y-2">
                <label className="text-xs uppercase font-mono tracking-wider text-slate-300">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your Name"
                  required
                  className="w-full px-4 py-3.5 rounded-xl bg-[#0B0B1E]/90 border border-purple-500/25 focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-400 text-white placeholder-slate-500 text-sm transition-all"
                />
              </div>

              {/* Email */}
              <div className="space-y-2">
                <label className="text-xs uppercase font-mono tracking-wider text-slate-300">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Your Email Address"
                  required
                  className="w-full px-4 py-3.5 rounded-xl bg-[#0B0B1E]/90 border border-purple-500/25 focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-400 text-white placeholder-slate-500 text-sm transition-all"
                />
              </div>

            </div>

            {/* Subject */}
            <div className="space-y-2">
              <label className="text-xs uppercase font-mono tracking-wider text-slate-300">
                Subject (Optional)
              </label>
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder="Job Inquiry / Collaboration / Project"
                className="w-full px-4 py-3.5 rounded-xl bg-[#0B0B1E]/90 border border-purple-500/25 focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-400 text-white placeholder-slate-500 text-sm transition-all"
              />
            </div>

            {/* Message */}
            <div className="space-y-2">
              <label className="text-xs uppercase font-mono tracking-wider text-slate-300">
                Message
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Write your message here..."
                rows={5}
                required
                className="w-full px-4 py-3.5 rounded-xl bg-[#0B0B1E]/90 border border-purple-500/25 focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-400 text-white placeholder-slate-500 text-sm transition-all resize-none"
              />
            </div>

            {/* Submit Button (Dribbble Signature Neon Pill) */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={submitting}
                className="w-full py-4 rounded-full font-bold text-sm uppercase tracking-widest text-white bg-gradient-to-r from-purple-600 via-pink-600 to-cyan-500 hover:from-purple-500 hover:to-cyan-400 shadow-[0_0_25px_rgba(155,93,229,0.5)] hover:shadow-[0_0_35px_rgba(6,182,212,0.7)] transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {submitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Transmitting...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Send Message</span>
                  </>
                )}
              </button>
            </div>

            {/* Direct Contact info footer */}
            <div className="pt-6 border-t border-purple-500/20 flex flex-wrap items-center justify-around gap-4 text-xs text-slate-400">
              <a href={`mailto:${email}`} className="flex items-center gap-2 hover:text-cyan-400 transition-colors">
                <Mail className="w-3.5 h-3.5 text-pink-400" />
                <span>{email}</span>
              </a>
              {phone && (
                <a href={`tel:${phone}`} className="flex items-center gap-2 hover:text-cyan-400 transition-colors">
                  <Phone className="w-3.5 h-3.5 text-cyan-400" />
                  <span>{phone}</span>
                </a>
              )}
              <div className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-purple-400" />
                <span>{location}</span>
              </div>
            </div>

          </form>
        </motion.div>

      </div>
    </section>
  );
};

export default ContactSection;
